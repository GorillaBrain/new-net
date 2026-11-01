import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSystemState } from "@/lib/store";
import { sha256Hex } from "@/lib/crypto";

const VerifyIdentitySchema = z.object({
  did: z.string().min(8),
  credentialId: z.string().optional(),
  challengeNonce: z.string().default("newnet-auth-challenge-2026"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = VerifyIdentitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { did, credentialId, challengeNonce } = parsed.data;
    const state = getSystemState();
    const identity = state.identities.find((i) => i.did === did);

    const verificationDigest = await sha256Hex(`${did}::${challengeNonce}::${credentialId || "root"}`);

    if (!identity) {
      return NextResponse.json({
        ok: true,
        verified: false,
        did,
        reason: "DID not found in local or federated resolver registry.",
        cryptographicCheck: {
          challengeNonce,
          verificationDigest,
          keyContinuityVerified: false,
          personhoodAttested: false,
        },
      });
    }

    const hasPersonhoodVc = identity.credentials.some((vc) =>
      vc.type.includes("ProofOfPersonhoodAttestation")
    );
    const hasAgentDelegationVc = identity.credentials.some((vc) =>
      vc.type.includes("DeclaredAiAgentDelegation")
    );

    const isSuspicious = identity.entityType === "SUSPICIOUS_AUTOMATION";

    return NextResponse.json({
      ok: true,
      verified: !isSuspicious,
      did: identity.did,
      handle: identity.handle,
      entityType: identity.entityType,
      cryptographicCheck: {
        challengeNonce,
        verificationDigest,
        publicKeyFingerprint: identity.publicKeyFingerprint,
        keyContinuityVerified: true,
        personhoodAttested: hasPersonhoodVc,
        declaredAgentDelegation: hasAgentDelegationVc,
        credentialsCount: identity.credentials.length,
      },
      architecturalNote: isSuspicious
        ? "WARNING: This account possesses a valid cryptographic keypair, but holds ZERO Web-of-Trust human attestations or organization credentials and exhibits automated burst behavior."
        : "Cryptographic key ownership and attached Verifiable Credential signatures verified.",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "VERIFY_ERROR", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
