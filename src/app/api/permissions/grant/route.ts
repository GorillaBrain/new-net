import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSystemState } from "@/lib/store";
import { sha256Hex } from "@/lib/crypto";
import { DataPermission } from "@/lib/types";

const GrantPermissionSchema = z.object({
  granteeId: z.string().min(2),
  granteeName: z.string().min(2),
  granteeType: z.enum(["APPLICATION", "AI_AGENT", "PEER_NODE"]).default("APPLICATION"),
  resourcePath: z.string().startsWith("/pod/"),
  resourceLabel: z.string().min(2),
  scopes: z.array(z.enum(["READ", "WRITE", "APPEND", "DECRYPT", "SIGN_ON_BEHALF"])).min(1),
  purpose: z.string().min(4),
  decision: z.enum(["GRANT", "REJECT"]).default("GRANT"),
  ttlHours: z.number().min(1).max(8760).default(720),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = GrantPermissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const state = getSystemState();
    const now = new Date();
    const expires = new Date(now.getTime() + data.ttlHours * 3600 * 1000);

    const capDigest = await sha256Hex(
      `${state.activeDid}::${data.granteeId}::${data.resourcePath}::${data.scopes.join(",")}::${now.toISOString()}`
    );

    const newPermission: DataPermission = {
      id: `perm-${Date.now().toString().slice(-6)}`,
      subjectDid: state.activeDid,
      granteeId: data.granteeId,
      granteeName: data.granteeName,
      granteeType: data.granteeType,
      resourcePath: data.resourcePath,
      resourceLabel: data.resourceLabel,
      scopes: data.scopes,
      purpose: data.purpose,
      status: data.decision === "GRANT" ? "ACTIVE" : "REJECTED",
      grantedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      revokedAt: data.decision === "REJECT" ? now.toISOString() : undefined,
      cryptographicCapabilityHash:
        data.decision === "GRANT"
          ? `ucan_sha256_${capDigest.slice(0, 32)}`
          : `ucan_denied_${capDigest.slice(0, 32)}`,
    };

    state.permissions.unshift(newPermission);

    const auditHash = await sha256Hex(
      `${now.toISOString()}::${data.decision}::${newPermission.id}::${capDigest}`
    );

    state.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: now.toISOString(),
      actorId: data.granteeId,
      actorName: data.granteeName,
      actorType: data.granteeType === "AI_AGENT" ? "DECLARED_AI_AGENT" : "APPLICATION",
      action: `${data.decision === "GRANT" ? "GRANT_UCAN_CAPABILITY" : "REJECT_ACCESS_REQUEST"} (${data.scopes.join(",")})`,
      resourcePath: data.resourcePath,
      decision: data.decision === "GRANT" ? "ALLOWED" : "DENIED",
      reason:
        data.decision === "GRANT"
          ? `User issued signed UCAN capability token (${newPermission.cryptographicCapabilityHash}).`
          : `User explicitly rejected access request for ${data.resourcePath}.`,
      signatureVerified: true,
      auditHash,
    });

    return NextResponse.json({
      ok: true,
      timestamp: now.toISOString(),
      permission: newPermission,
      permissions: state.permissions,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "GRANT_ERROR", message: err instanceof Error ? err.message : "Failed to process permission" },
      { status: 500 }
    );
  }
}
