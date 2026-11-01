import { NextResponse } from "next/server";
import { getSystemState } from "@/lib/store";

export async function GET() {
  const state = getSystemState();
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    adapterMode: state.adapterMode,
    ownerDid: state.activeDid,
    agents: state.agents,
    policySummary: {
      defaultExecutionMode: "LOCAL_ON_DEVICE",
      externalApiTelemetry: "STRIPPED_BY_DEFAULT",
      outboundWriteGate: "MANDATORY_HUMAN_SIGNATURE",
    },
  });
}
