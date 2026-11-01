import { NextRequest, NextResponse } from "next/server";
import { getSystemState } from "@/lib/store";

export async function GET(req: NextRequest) {
  const state = getSystemState();
  const { searchParams } = new URL(req.url);
  const decisionFilter = searchParams.get("decision");

  const logs = decisionFilter
    ? state.auditLogs.filter((l) => l.decision === decisionFilter)
    : state.auditLogs;

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    adapterMode: state.adapterMode,
    totalEntries: logs.length,
    summary: {
      allowed: state.auditLogs.filter((l) => l.decision === "ALLOWED").length,
      denied: state.auditLogs.filter((l) => l.decision === "DENIED").length,
      revokedBlocks: state.auditLogs.filter((l) => l.decision === "REVOKED_BLOCK").length,
      humanApprovalRequired: state.auditLogs.filter((l) => l.decision === "HUMAN_APPROVAL_REQUIRED").length,
    },
    logs,
  });
}
