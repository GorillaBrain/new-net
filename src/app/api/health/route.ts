import { NextResponse } from "next/server";
import { getSystemState } from "@/lib/store";

export async function GET() {
  const state = getSystemState();

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    service: "NEW NET Reference Architecture Gateway",
    version: "0.9.4-research",
    persistence: {
      mode: state.adapterMode,
      honestyDisclosure:
        state.adapterMode === "DEMONSTRATION_ADAPTER"
          ? "Running with Demonstration Persistence Adapter (no external SUPABASE_URL configured). Web Crypto ECDSA P-256 and SHA-256 CID hashing execute genuinely; network federation is simulated."
          : "Connected to configured PostgreSQL/Supabase persistence store.",
    },
    subsystems: {
      layer1_identityVault: { status: "IMPLEMENTED", activeIdentities: state.identities.length },
      layer2_personalDataPods: { status: "IMPLEMENTED", activePermissions: state.permissions.filter((p) => p.status === "ACTIVE").length },
      layer3_decentralisedMesh: { status: "SIMULATED", pinnedCids: state.posts.length },
      layer4_interoperableApps: { status: "IMPLEMENTED", connectedClientApps: 3 },
      layer5_discoveryLenses: { status: "IMPLEMENTED", activeMode: state.feedPreferences.mode },
      layer6_securityAuditLog: { status: "IMPLEMENTED", auditEntries: state.auditLogs.length },
      layer7_personalAiSandbox: { status: "IMPLEMENTED", registeredAgents: state.agents.length },
    },
  });
}
