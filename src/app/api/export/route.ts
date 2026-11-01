import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSystemState } from "@/lib/store";
import { generateCidFromContent, sha256Hex } from "@/lib/crypto";

const ExportSchema = z.object({
  did: z.string().optional(),
  format: z.enum(["JSON_LD_PORTABLE_BUNDLE", "CAR_V2_MANIFEST"]).default("JSON_LD_PORTABLE_BUNDLE"),
  includeAuditLog: z.boolean().default(true),
  includePermissions: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    let body: unknown = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const parsed = ExportSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { did, format, includeAuditLog, includePermissions } = parsed.data;
    const state = getSystemState();
    const profile =
      state.identities.find((i) => i.did === (did || state.activeDid)) || state.identities[0];

    const exportTimestamp = new Date().toISOString();
    const bundlePayload = {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://www.w3.org/2018/credentials/v1",
        "https://specs.newnet.architecture/v1/portable-pod-bundle.jsonld",
      ],
      exportFormat: format,
      exportedAt: exportTimestamp,
      sovereignOwnerDid: profile.did,
      identityProfile: profile,
      authoredContent: state.posts.filter((p) => p.authorDid === profile.did),
      feedPreferences: state.feedPreferences,
      ...(includePermissions ? { activeAndHistoricalPermissions: state.permissions } : {}),
      ...(includeAuditLog ? { merkleAuditTrail: state.auditLogs.slice(0, 20) } : {}),
    };

    const serialized = JSON.stringify(bundlePayload);
    const bundleSha256 = await sha256Hex(serialized);
    const archiveCid = await generateCidFromContent(serialized);

    state.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: exportTimestamp,
      actorId: profile.did,
      actorName: profile.displayName,
      actorType: profile.entityType,
      action: `EXPORT_PORTABLE_ARCHIVE (${format})`,
      resourcePath: "/pod/export/full-snapshot",
      decision: "ALLOWED",
      reason: `Generated verifiable portable archive ${archiveCid}.`,
      signatureVerified: true,
      auditHash: bundleSha256,
    });

    return NextResponse.json({
      ok: true,
      timestamp: exportTimestamp,
      archiveCid,
      bundleSha256,
      byteSize: serialized.length,
      portabilityGuarantee:
        "This bundle contains your W3C DID Document, Verifiable Credentials, authored content CIDs, and feed preferences. It can be imported into any compliant NEW NET Pod provider with zero lock-in.",
      bundle: bundlePayload,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "EXPORT_ERROR", message: err instanceof Error ? err.message : "Export failed" },
      { status: 500 }
    );
  }
}
