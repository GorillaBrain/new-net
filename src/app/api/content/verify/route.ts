import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  generateCidFromContent,
  sha256Hex,
  signPayloadWithJwk,
  verifyContentIntegrity,
} from "@/lib/crypto";
import { getSystemState } from "@/lib/store";

const ContentVerifySchema = z.object({
  action: z.enum(["SIGN_AND_HASH", "VERIFY_INTEGRITY"]).default("VERIFY_INTEGRITY"),
  content: z.string().min(1),
  expectedSha256: z.string().optional(),
  signatureHex: z.string().optional(),
  signerDid: z.string().optional(),
  aiGenerationDisclosure: z
    .enum(["NONE", "AI_ASSISTED", "AUTONOMOUS_AI"])
    .default("NONE"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContentVerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { action, content, expectedSha256, signatureHex, signerDid, aiGenerationDisclosure } =
      parsed.data;
    const state = getSystemState();
    const activeAuthor = signerDid || state.activeDid;
    const cid = await generateCidFromContent(content);

    if (action === "SIGN_AND_HASH") {
      const signed = await signPayloadWithJwk(content, undefined, activeAuthor);
      return NextResponse.json({
        ok: true,
        action: "SIGN_AND_HASH",
        timestamp: new Date().toISOString(),
        cid,
        signerDid: activeAuthor,
        aiGenerationDisclosure,
        contentSha256: signed.contentSha256,
        signatureHex: signed.signatureHex,
        algorithm: signed.algorithm,
        epistemicDistinctionNote:
          "This cryptographic signature proves that the holder of signerDid signed these exact bytes (Authenticity & Integrity). It does NOT automatically verify whether the claims inside the text are factually accurate.",
      });
    }

    const baselineHash = expectedSha256 || (await sha256Hex(content));
    const baselineSig =
      signatureHex ||
      (await signPayloadWithJwk(content, undefined, activeAuthor)).signatureHex;

    const result = await verifyContentIntegrity({
      content,
      expectedSha256: baselineHash,
      signatureHex: baselineSig,
      signerDid: activeAuthor,
    });

    return NextResponse.json({
      ok: true,
      action: "VERIFY_INTEGRITY",
      cid,
      signerDid: activeAuthor,
      aiGenerationDisclosure,
      verification: result,
      epistemicDistinctionNote:
        "Integrity check verifies byte-level immutability against expectedSha256 and author signature. Factual verification requires cross-referencing cited sources and community review.",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "CONTENT_VERIFY_ERROR", message: err instanceof Error ? err.message : "Failed to verify content" },
      { status: 500 }
    );
  }
}
