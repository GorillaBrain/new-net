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
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export default function VisionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 space-y-20">
      {/* Editorial Header */}
      <div className="border-b border-white/[0.07] pb-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300">
          <Compass className="h-3.5 w-3.5 text-blue-400" />
          <span>MODULE 02 • VISION, PHILOSOPHY &amp; ANTI-DECAY ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.12]">
          The Individual Should Own Their Digital Life, Not the Platforms They Use.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          NEW NET investigates how a fundamentally different protocol and storage
          architecture can reverse the centralisation, surveillance, synthetic slop,
          and link rot degrading today’s internet—without assuming that
          &ldquo;decentralisation&rdquo; is a magic wand.
        </p>
      </div>

      {/* Anti-Decay Architecture (Pillars A through F) */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
            01 / The Anti-Decay Architecture (Pillars A–F)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Reversing Epistemic, Archival, and Economic Decay
          </h2>
          <p className="text-sm text-zinc-400 max-w-3xl">
            Every pillar pairs cryptographic mechanisms with strict epistemological honesty
            about what cryptography can and cannot prove.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {ANTI_DECAY_PILLARS.map((pillar) => (
            <div
              key={pillar.code}
              className="rounded-xl border border-white/[0.08] bg-[#0e1014] p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded border border-blue-500/30 bg-blue-500/[0.1] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-blue-300">
                    PILLAR {pillar.code}
                  </span>
                  <StatusBadge status={pillar.status} />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Architectural Mechanisms
                  </div>
                  {pillar.mechanisms.map((m) => (
                    <div key={m} className="flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-3.5 text-xs text-zinc-300 leading-relaxed">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-300 mb-1">
                  <AlertTriangle className="h-3 w-3 text-amber-400" />
                  <span>Architectural Boundary</span>
                </div>
                {pillar.criticalDistinction}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Dive: Alternative Digital Economy (Pillar F) */}
      <section className="rounded-2xl border border-white/[0.08] bg-[#0e1014] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-5">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Coins className="h-3.5 w-3.5" />
              <span>02 / Sustainable Economics Without Surveillance</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Funding Infrastructure Without Behavioural Tracking
            </h2>
          </div>
          <StatusBadge status="RESEARCH REQUIRED" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-2">
            <div className="font-mono text-blue-400 font-semibold">01 / Direct Portable Patronage</div>
            <p className="text-zinc-300 leading-relaxed">
              Subscriptions are bound to the creator’s W3C DID, not a platform silo. If a
              writer or developer switches client apps, 100% of their subscriber
              relationships and recurring patronage move with them automatically.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-2">
            <div className="font-mono text-zinc-200 font-semibold">02 / Cooperative Relay Trusts</div>
            <p className="text-zinc-300 leading-relaxed">
              Neighborhoods, universities, and professional guilds pool €1–€3/month member
              dues to operate shared high-availability IPFS/Solid archival nodes with
              subsidized free tiers for students and low-income members.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-2">
            <div className="font-mono text-zinc-200 font-semibold">03 / Protocol Micropayments</div>
            <p className="text-zinc-300 leading-relaxed">
              Low-friction per-article or per-compute settlements (e.g., paying 0.2 cents
              to a remote zero-retention GPU enclave for heavy AI synthesis) without banner
              ads or cross-site telemetry.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-2">
            <div className="font-mono text-zinc-200 font-semibold">04 / Zero-Tracking Sponsorship</div>
            <p className="text-zinc-300 leading-relaxed">
              Where advertising exists, it is strictly static and contextual to the topic
              of the publication—never matched to behavioral profiles, location history, or
              personal pod contents.
            </p>
          </div>
        </div>
      </section>

      {/* 12 Principles Complete Specification */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
            03 / Foundational Constitution
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            The 12 Principles of NEW NET
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TWELVE_PRINCIPLES.map((p) => (
            <div
              key={p.number}
              className="rounded-xl border border-white/[0.08] bg-[#0e1014] p-5 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="font-mono text-xs font-semibold text-blue-400">
                  PRINCIPLE {String(p.number).padStart(2, "0")}
                </div>
                <h3 className="text-base font-semibold text-zinc-100">{p.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{p.description}</p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-zinc-300">
                <span className="text-zinc-500">Mechanism: </span>
                {p.architecturalMechanism}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structural Problem Reference */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
              04 / Root Cause Taxonomy
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              6 Structural Failure Modes of the Legacy Web
            </h2>
          </div>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-medium text-white transition-colors"
          >
            <span>Test Solutions in Playground</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {STRUCTURAL_PROBLEMS.map((prob) => (
            <div
              key={prob.id}
              className="rounded-xl border border-white/[0.08] bg-[#0e1014] p-5 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-100">{prob.title}</h3>
                <AlertOctagon className="h-4 w-4 text-zinc-500" />
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{prob.subtitle}</p>
              <div className="pt-2 border-t border-white/[0.06] font-mono text-[11px] text-blue-300">
                Countermeasure: {prob.newNetCountermeasure}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
