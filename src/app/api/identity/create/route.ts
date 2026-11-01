import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSystemState } from "@/lib/store";
import { generateCryptographicIdentity, sha256Hex } from "@/lib/crypto";
import { IdentityProfile } from "@/lib/types";

const CreateIdentitySchema = z.object({
  displayName: z.string().min(2).max(80),
  handle: z.string().min(3).max(60),
  entityType: z.enum(["HUMAN", "DECLARED_AI_AGENT", "ORGANISATION"]).default("HUMAN"),
  recoveryMethod: z
    .enum(["social-shamir-3-of-5", "hardware-passkey-backup", "time-locked-vault"])
    .default("social-shamir-3-of-5"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateIdentitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { displayName, handle, entityType, recoveryMethod } = parsed.data;
    const cryptoIdentity = await generateCryptographicIdentity(handle);
    const now = new Date().toISOString();

    const newProfile: IdentityProfile = {
      did: cryptoIdentity.did,
      handle: handle.includes(".") ? handle : `${handle}.sovereign.net`,
      displayName,
      entityType,
      publicKeyJwk: cryptoIdentity.publicKeyJwk,
      publicKeyFingerprint: cryptoIdentity.fingerprint,
      createdAt: now,
      recoveryMethod,
      recoveryGuardians: [
        "did:key:zGuardianPeerAlpha",
        "did:key:zGuardianPeerBeta",
        "did:key:zGuardianHardwarePasskey",
      ],
      selectiveDisclosureFields: [
        {
          field: "entity_classification",
          label: "Cryptographic Entity Classification",
          value: entityType,
          disclosedByDefault: true,
        },
        {
          field: "self_sovereign_key_continuity",
          label: "Root Key Continuity Proof",
          value: `ECDSA P-256 (${cryptoIdentity.fingerprint})`,
          disclosedByDefault: true,
        },
        {
          field: "private_contact_recovery",
          label: "Guardian Recovery Shard Map",
          value: "[ENCRYPTED IN PERSONAL POD]",
          disclosedByDefault: false,
        },
      ],
      credentials: [
        {
          id: `urn:uuid:vc-self-${cryptoIdentity.fingerprint.toLowerCase()}`,
          type: ["VerifiableCredential", "SelfSovereignKeyAttestation"],
          issuer: cryptoIdentity.did,
          issuanceDate: now,
          subjectDid: cryptoIdentity.did,
          claims: {
            handle,
            entityType,
            keyAlgorithm: "ECDSA-P256-SHA256",
            fingerprint: cryptoIdentity.fingerprint,
          },
          proof: {
            type: "WebCryptoEcdsaSecp256r1",
            created: now,
            verificationMethod: `${cryptoIdentity.did}#key-1`,
            signatureHex: cryptoIdentity.signatureSample,
          },
          privacyNote:
            "Cryptographic self-attestation proves possession of the private key corresponding to this DID. Does not by itself prove biological humanity without external Web-of-Trust credentials.",
        },
      ],
      connectedApps: [
        {
          appId: "app-agora-social",
          appName: "Agora Social (Discourse Client)",
          protocol: "ActivityStreams 2.0 + UCAN",
          connectedAt: now,
          scopes: ["READ /pod/profile/public", "WRITE /pod/social/posts"],
        },
      ],
      status: "IMPLEMENTED",
    };

    const state = getSystemState();
    state.identities.unshift(newProfile);
    state.activeDid = newProfile.did;

    const auditHash = await sha256Hex(`${now}::CREATE_IDENTITY::${newProfile.did}`);
    state.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: now,
      actorId: newProfile.did,
      actorName: newProfile.displayName,
      actorType: newProfile.entityType,
      action: "CREATE_SELF_SOVEREIGN_DID",
      resourcePath: "/identity/vault/root",
      decision: "ALLOWED",
      reason: `Generated WebCrypto ECDSA P-256 keypair and W3C DID (${newProfile.publicKeyFingerprint}).`,
      signatureVerified: true,
      auditHash,
    });

    return NextResponse.json({
      ok: true,
      timestamp: now,
      adapterMode: state.adapterMode,
      identity: newProfile,
      privateKeyExportWarning:
        "In production NEW NET clients, the private key remains inside non-extractable WebAuthn/IndexedDB storage. Returned here for educational inspection only.",
      privateKeyPreviewJwk: {
        kty: cryptoIdentity.privateKeyJwk.kty,
        crv: cryptoIdentity.privateKeyJwk.crv,
        d_redacted_preview: `${(cryptoIdentity.privateKeyJwk.d || "").slice(0, 10)}...[NON_EXTRACTABLE_BOUNDARY]`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
        message: err instanceof Error ? err.message : "Failed to generate identity",
      },
      { status: 500 }
    );
  }
}
