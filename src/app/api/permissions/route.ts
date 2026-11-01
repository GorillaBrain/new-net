import { NextResponse } from "next/server";
import { getSystemState } from "@/lib/store";

export async function GET() {
  const state = getSystemState();
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    adapterMode: state.adapterMode,
    subjectDid: state.activeDid,
    permissions: state.permissions,
    podContainers: [
      {
        path: "/pod/profile/public",
        label: "Public Portable Identity Card",
        encryption: "Signed Public JSON-LD",
        recordCount: 4,
      },
      {
        path: "/pod/social/posts",
        label: "Social Feed & Follower Graph",
        encryption: "AES-256-GCM (Follower Group Keys)",
        recordCount: 128,
      },
      {
        path: "/pod/workspace/papers",
        label: "Research Drafts & CRDT Documents",
        encryption: "AES-256-GCM (Capability Scoped)",
        recordCount: 19,
      },
      {
        path: "/pod/credentials/reputation",
        label: "Verifiable Commerce & Peer Reputation",
        encryption: "ZK-Selective Disclosure",
        recordCount: 7,
      },
      {
        path: "/pod/financial/tax-ledger.json",
        label: "Private Financial & Sovereign Vault",
        encryption: "Hardware-Key Locked (No App Access)",
        recordCount: 12,
      },
    ],
  });
}
