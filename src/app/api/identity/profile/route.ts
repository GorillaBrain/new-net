import { NextRequest, NextResponse } from "next/server";
import { getSystemState } from "@/lib/store";

export async function GET(req: NextRequest) {
  const state = getSystemState();
  const { searchParams } = new URL(req.url);
  const requestedDid = searchParams.get("did");

  const profile = requestedDid
    ? state.identities.find((i) => i.did === requestedDid) || state.identities[0]
    : state.identities.find((i) => i.did === state.activeDid) || state.identities[0];

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    adapterMode: state.adapterMode,
    activeProfile: profile,
    allProfiles: state.identities,
  });
}
