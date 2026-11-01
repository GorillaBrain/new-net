import React from "react";
import Link from "next/link";
import {
  STRUCTURAL_PROBLEMS,
  TWELVE_PRINCIPLES,
  ANTI_DECAY_PILLARS,
} from "@/lib/architecture-data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Compass,
  ShieldCheck,
  AlertOctagon,
  Coins,
  Scale,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function VisionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
          <Compass className="h-3.5 w-3.5" />
          <span>MODULE 02 • VISION, PHILOSOPHY &amp; ANTI-DECAY ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          The Individual Should Own Their Digital Life, Not the Platforms They Use.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          NEW NET investigates how a fundamentally different protocol and storage
          architecture can reverse the centralisation, surveillance, synthetic slop,
          and link rot degrading today’s internet—without assuming that
          &ldquo;decentralisation&rdquo; is a magic wand.
        </p>
      </div>

      {/* Anti-Decay Architecture (Pillars A through F) */}
      <section className="space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-violet-400">
            THE ANTI-DECAY ARCHITECTURE (PILLARS A–F)
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Reversing Epistemic, Archival, and Economic Decay
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Every pillar pairs cryptographic mechanisms with strict epistemological honesty
            about what cryptography can and cannot prove.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ANTI_DECAY_PILLARS.map((pillar) => (
            <div
              key={pillar.code}
              className="rounded-xl border border-slate-800 bg-[#0b0f19] p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-blue-500/20 px-2.5 py-1 font-mono text-xs font-bold text-blue-300">
                    PILLAR {pillar.code}
                  </span>
                  <StatusBadge status={pillar.status} />
                </div>
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.summary}
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="font-mono text-[10px] uppercase text-slate-400">
                    Architectural Mechanisms:
                  </div>
                  {pillar.mechanisms.map((m) => (
                    <div key={m} className="flex items-start gap-2 text-xs text-slate-200">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 leading-relaxed">
                {pillar.criticalDistinction}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Dive: Alternative Digital Economy (Pillar F) */}
      <section className="rounded-2xl border border-slate-800 bg-[#0b0f19] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase text-emerald-400 flex items-center gap-1.5">
              <Coins className="h-4 w-4" />
              <span>SUSTAINABLE ECONOMICS WITHOUT SURVEILLANCE</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              How Does NEW NET Fund Infrastructure Without Behavioural Tracking?
            </h2>
          </div>
          <StatusBadge status="RESEARCH REQUIRED" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-2">
            <div className="font-mono text-blue-400 font-bold">01. Direct Portable Patronage</div>
            <p className="text-slate-300 leading-relaxed">
              Subscriptions are bound to the creator’s W3C DID, not a platform silo. If a
              writer or developer switches client apps, 100% of their subscriber
              relationships and recurring patronage move with them automatically.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-2">
            <div className="font-mono text-violet-400 font-bold">02. Cooperative Relay Trusts</div>
            <p className="text-slate-300 leading-relaxed">
              Neighborhoods, universities, and professional guilds pool €1–€3/month member
              dues to operate shared high-availability IPFS/Solid archival nodes with
              subsidized free tiers for students and low-income members.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-2">
            <div className="font-mono text-emerald-400 font-bold">03. Protocol Micropayments</div>
            <p className="text-slate-300 leading-relaxed">
              Low-friction per-article or per-compute settlements (e.g., paying 0.2 cents
              to a remote zero-retention GPU enclave for heavy AI synthesis) without banner
              ads or cross-site telemetry.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-2">
            <div className="font-mono text-amber-400 font-bold">04. Zero-Tracking Sponsorship</div>
            <p className="text-slate-300 leading-relaxed">
              Where advertising exists, it is strictly static and contextual to the topic
              of the publication—never matched to behavioral profiles, location history, or
              personal pod contents.
            </p>
          </div>
        </div>
      </section>

      {/* 12 Principles Complete Specification */}
      <section className="space-y-6">
        <div>
          <span className="font-mono text-xs uppercase text-blue-400">
            FOUNDATIONAL CONSTITUTION
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            The 12 Principles of NEW NET
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TWELVE_PRINCIPLES.map((p) => (
            <div
              key={p.number}
              className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-2"
            >
              <div className="font-mono text-xs font-bold text-blue-400">
                PRINCIPLE {String(p.number).padStart(2, "0")}
              </div>
              <h3 className="text-base font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
              <div className="pt-2 border-t border-slate-800/80 font-mono text-[11px] text-violet-300">
                Implementation: {p.architecturalMechanism}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structural Problem Reference */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase text-rose-400">
              ROOT CAUSE TAXONOMY
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              6 Structural Failure Modes of the Legacy Web
            </h2>
          </div>
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
          >
            <span>Test Solutions in Playground</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {STRUCTURAL_PROBLEMS.map((prob) => (
            <div
              key={prob.id}
              className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{prob.title}</h3>
                <AlertOctagon className="h-4 w-4 text-rose-400" />
              </div>
              <p className="text-xs text-slate-400">{prob.subtitle}</p>
              <div className="pt-2 font-mono text-[11px] text-emerald-400">
                Resolution: {prob.newNetCountermeasure}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
