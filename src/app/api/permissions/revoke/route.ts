import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSystemState } from "@/lib/store";
import { sha256Hex } from "@/lib/crypto";

const RevokeSchema = z.object({
  permissionId: z.string().min(2),
  reason: z.string().default("User triggered cryptographic capability revocation via Personal Data Pod console."),
});

export async function DELETE(req: NextRequest) {
  try {
    let payload: unknown = {};
    try {
      payload = await req.json();
    } catch {
      const { searchParams } = new URL(req.url);
      payload = {
        permissionId: searchParams.get("permissionId") || "",
        reason: searchParams.get("reason") || undefined,
      };
    }

    const parsed = RevokeSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { permissionId, reason } = parsed.data;
    const state = getSystemState();
    const target = state.permissions.find((p) => p.id === permissionId);

    if (!target) {
      return NextResponse.json(
        { ok: false, error: "NOT_FOUND", message: `Permission ${permissionId} not found.` },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    target.status = "REVOKED";
    target.revokedAt = now;

    const tombstoneHash = await sha256Hex(`TOMBSTONE::${target.id}::${target.cryptographicCapabilityHash}::${now}`);

    state.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: now,
      actorId: target.granteeId,
      actorName: target.granteeName,
      actorType: target.granteeType === "AI_AGENT" ? "DECLARED_AI_AGENT" : "APPLICATION",
      action: `REVOKE_UCAN_CAPABILITY (${target.id})`,
      resourcePath: target.resourcePath,
      decision: "REVOKED_BLOCK",
      reason: `${reason} Tombstone hash: ${tombstoneHash.slice(0, 20)}...`,
      signatureVerified: true,
      auditHash: tombstoneHash,
    });

    return NextResponse.json({
      ok: true,
      timestamp: now,
      revokedPermission: target,
      revocationTombstoneHash: tombstoneHash,
      permissions: state.permissions,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "REVOKE_ERROR", message: err instanceof Error ? err.message : "Failed to revoke" },
      { status: 500 }
    );
  }
}
