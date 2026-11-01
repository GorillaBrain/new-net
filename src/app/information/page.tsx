import React from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Radio,
  Sliders,
  FileCheck2,
  Archive,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function InformationEcosystemPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-300">
          <Radio className="h-3.5 w-3.5" />
          <span>MODULE 05 • INFORMATION ECOSYSTEM, PROVENANCE &amp; PRESERVATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Information Discovery, Cryptographic Provenance &amp; Digital Preservation
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Today’s information crisis stems from coupling content hosting to proprietary
          engagement-maximizing algorithms and mutable URLs. NEW NET separates transport,
          provenance verification, discovery ranking, and archival custody into independent,
          user-auditable layers.
        </p>
      </div>

      {/* Critical Epistemological Distinction Banner */}
      <section className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-300">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span>FUNDAMENTAL EPISTEMIC RULE: AUTHENTICITY ≠ FACTUAL ACCURACY</span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 text-xs sm:text-sm">
          <div className="rounded-xl border border-emerald-500/30 bg-[#07090e] p-4 space-y-2">
            <div className="font-mono text-xs font-bold text-emerald-400">
              What Cryptographic Provenance PROVES (Authenticity &amp; Integrity)
            </div>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                • <strong>Origin:</strong> The holder of private key X (bound to DID X)
                cryptographically signed this exact payload.
              </li>
              <li>
                • <strong>Immutability:</strong> Zero bytes have been altered since signing
                (verified via SHA-256 CIDv1 digest).
              </li>
              <li>
                • <strong>Lineage:</strong> Full version history DAG linking every edit to
                its parent CID and C2PA media capture manifest.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-[#07090e] p-4 space-y-2">
            <div className="font-mono text-xs font-bold text-rose-400">
              What Cryptographic Provenance DOES NOT PROVE (Factual Truth)
            </div>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>
                • A verified human or institution can still sign an honest mistake, a
                biased opinion, or a deliberate falsehood.
              </li>
              <li>
                • Assessing factual accuracy requires <strong>pluralistic citation graphs</strong>,{" "}
                <strong>reproducible datasets</strong>, and{" "}
                <strong>community peer-review notes</strong>—never a single &ldquo;Ministry of
                Truth&rdquo; key.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Four Pillars of the Information Layer */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-blue-400 flex items-center gap-1.5">
              <Sliders className="h-4 w-4" />
              <span>01. USER-CONTROLLED DISCOVERY LENSES</span>
            </span>
            <StatusBadge status="IMPLEMENTED" size="xs" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Bring Your Own Algorithm (Or Choose Chronological)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In NEW NET, relays are dumb pipes for signed CID objects. Users subscribe to
            independent ranking providers or tune their own local mathematical weights
            (`recency`, `citationsAndProvenance`, `communityTrust`, `topicAffinity`, and
            `sensationalismPenalty`). Preferences are stored in the user’s Pod and travel
            across every compatible client app.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
              <FileCheck2 className="h-4 w-4" />
              <span>02. C2PA &amp; MERKLE VERSION LINEAGE</span>
            </span>
            <StatusBadge status="IMPLEMENTED" size="xs" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Immutable Edit Histories &amp; AI Involvement Labels
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every post or media artifact carries an explicit AI disclosure tag
            (`NONE`, `AI_ASSISTED`, or `AUTONOMOUS_AI`) and a version DAG array. When an
            author updates an article, the new CID points cryptographically to the prior
            CID—eliminating stealth edits and historical gaslighting.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-cyan-400 flex items-center gap-1.5">
              <Archive className="h-4 w-4" />
              <span>03. CONTENT-ADDRESSED PRESERVATION</span>
            </span>
            <StatusBadge status="SIMULATED" size="xs" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Ending Link Rot via CIDv1 &amp; Cooperative Pinning
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            HTTP links break when a single company stops paying for a domain. Content
            Identifiers (`cid://bafybeig...`) reference the cryptographic hash of the
            bytes themselves. Even if the original publisher’s server vanishes, any library,
            university, or peer pod pinning that CID can serve the verified artifact.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-violet-400 flex items-center gap-1.5">
              <Scale className="h-4 w-4" />
              <span>04. COMPOSABLE COMMUNITY GOVERNANCE</span>
            </span>
            <StatusBadge status="PROPOSED" size="xs" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Auditable Moderation Receipts &amp; Portable Blocklists
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instead of unchecked billionaire ownership or unmoderated spam swamps,
            communities operate composable Labeling Services. Every moderation decision
            emits a signed receipt citing the community rule and opening a cryptographic
            appeals channel.
          </p>
        </div>
      </section>

      <div className="flex justify-center pt-4">
        <Link
          href="/playground"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transition"
        >
          <span>Test Live Algorithm Sliders &amp; Tamper Detection in the Playground</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
