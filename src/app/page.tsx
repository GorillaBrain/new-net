import React from "react";
import Link from "next/link";
import {
  STRUCTURAL_PROBLEMS,
  SEVEN_LAYERS,
  ARCHITECTURAL_COMPARISON,
  TWELVE_PRINCIPLES,
} from "@/lib/architecture-data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  ArrowRight,
  Layers,
  Terminal,
  Shield,
  FileCode2,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Server,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative border-b border-slate-800/80 bg-gradient-to-b from-[#0b1020] via-[#07090e] to-[#07090e] pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono text-blue-300 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>PROPOSED NEXT-GENERATION INTERNET ARCHITECTURE UNDER R&amp;D</span>
          </div>

          <h1 className="max-w-4xl font-mono text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            THE INTERNET DOESN’T HAVE TO WORK THIS WAY.
          </h1>

          <p className="mt-6 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
            An exploration of a more open, private, secure, interoperable, and
            individually controlled internet.
          </p>

          <p className="mt-4 max-w-3xl text-xs sm:text-sm text-slate-400 leading-relaxed">
            <strong>Foundational Principle:</strong> The individual should own their
            digital life, not the platforms they use. NEW NET is not another social
            media platform, browser, or SaaS web app—it is a seven-layer architectural
            blueprint and interactive reference implementation built around self-sovereign
            identity, personal data pods, content-addressed preservation, user-selected
            discovery algorithms, cryptographic provenance, and fiduciary personal AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-950/50 transition"
            >
              <Layers className="h-4 w-4" />
              <span>Launch Interactive Architecture Explorer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/15 hover:bg-violet-500/25 px-5 py-3 text-xs sm:text-sm font-semibold text-violet-200 transition"
            >
              <Terminal className="h-4 w-4" />
              <span>Run 8 Live Cryptographic &amp; Pod Labs</span>
            </Link>
            <Link
              href="/api-docs"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 px-4 py-3 text-xs sm:text-sm font-mono text-slate-200 transition"
            >
              <FileCode2 className="h-4 w-4 text-blue-400" />
              <span>Inspect 15 Live API Endpoints</span>
            </Link>
          </div>

          {/* Implementation Status Honesty Banner */}
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-[#0b0f19]/90 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400">STATUS TAXONOMY 01</span>
                <StatusBadge status="IMPLEMENTED" size="xs" />
              </div>
              <p className="text-xs text-slate-300">
                Real Web Crypto ECDSA P-256 key generation, SHA-256 CID hashing, 15 Zod-validated Next.js API routes, and interactive React Flow &amp; Playground labs.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0b0f19]/90 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400">STATUS TAXONOMY 02</span>
                <StatusBadge status="SIMULATED" size="xs" />
              </div>
              <p className="text-xs text-slate-300">
                Multi-region IPFS/Solid/Arweave replica pinning and Sybil burst telemetry demonstrated via our clearly labelled Demonstration Persistence Adapter.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0b0f19]/90 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400">STATUS TAXONOMY 03</span>
                <StatusBadge status="PROPOSED" size="xs" />
              </div>
              <p className="text-xs text-slate-300">
                IETF MLS (RFC 9420) group key ratcheting, raw libp2p QUIC hole-punching, and composable multi-community moderation arbitration protocols.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0b0f19]/90 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400">STATUS TAXONOMY 04</span>
                <StatusBadge status="RESEARCH REQUIRED" size="xs" />
              </div>
              <p className="text-xs text-slate-300">
                Post-quantum zero-knowledge BBS+ credentials, state-level partition healing, and sustainable non-surveillance cooperative economics at global scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE STRUCTURAL PROBLEMS OF TODAY'S INTERNET */}
      <section className="mx-auto max-w-7xl px-4 space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-rose-400">
              01 • DIAGNOSTIC ANALYSIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Why Do We Need a New Internet Architecture?
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Today’s internet problems are not merely policy or moderation mistakes—they
              are direct structural consequences of centralized identity, siloed databases,
              location-based links, and surveillance-advertising incentives.
            </p>
          </div>
          <Link
            href="/vision"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 shrink-0"
          >
            <span>Read Full Vision &amp; Anti-Decay Spec</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STRUCTURAL_PROBLEMS.map((prob) => (
            <div
              key={prob.id}
              className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-rose-300">
                    {prob.severity} FAILURE MODE
                  </span>
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                </div>
                <h3 className="text-base font-bold text-white">{prob.title}</h3>
                <p className="text-xs text-slate-400">{prob.subtitle}</p>
                <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                  {prob.issues.map((iss) => (
                    <li key={iss} className="flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span>{iss}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-blue-500/25 bg-blue-500/5 p-3">
                <div className="font-mono text-[10px] uppercase text-blue-400 mb-1">
                  NEW NET Architectural Countermeasure
                </div>
                <p className="text-xs text-slate-200">{prob.newNetCountermeasure}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: THE 7-LAYER ARCHITECTURE STACK */}
      <section className="mx-auto max-w-7xl px-4 space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
              02 • THE SEVEN INTERCONNECTED LAYERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              The NEW NET 7-Layer Stack
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Decentralisation does not automatically guarantee security, privacy, truth,
              or freedom. Each layer enforces explicit cryptographic guarantees while
              documenting its real-world limitations.
            </p>
          </div>
          <Link
            href="/architecture"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 shrink-0"
          >
            <span>Open Interactive 9-Diagram React Flow Explorer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {SEVEN_LAYERS.map((layer) => (
            <div
              key={layer.id}
              className={`rounded-xl border ${layer.borderColor} bg-gradient-to-r ${layer.color} p-5`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-[#07090e] font-mono text-xs font-bold text-white">
                    L{layer.layer}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{layer.name}</h3>
                    <p className="text-xs text-slate-300">{layer.tagline}</p>
                  </div>
                </div>
                <StatusBadge status={layer.status} />
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 pt-2">
                <div className="lg:col-span-7">
                  <div className="font-mono text-[10px] uppercase text-slate-400 mb-1.5">
                    Core Architectural Capabilities
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-xs text-slate-200">
                    {layer.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between space-y-3 rounded-lg border border-slate-800/80 bg-[#07090e]/90 p-3.5">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-slate-400 mb-1">
                      Protocols &amp; Standards
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.protocols.map((p) => (
                        <span
                          key={p}
                          className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-blue-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-2 text-[11px] text-amber-300/90">
                    <strong className="font-mono uppercase text-[10px]">
                      Engineering Caveat:{" "}
                    </strong>
                    {layer.criticalCaveat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: 12 CORE PRINCIPLES */}
      <section className="mx-auto max-w-7xl px-4 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-violet-400">
            03 • CORE PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Twelve Architectural Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TWELVE_PRINCIPLES.map((p) => (
            <div
              key={p.number}
              className="rounded-xl border border-slate-800 bg-[#0b0f19] p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-400">
                  PRINCIPLE #{String(p.number).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {p.description}
              </p>
              <div className="pt-1 font-mono text-[10px] text-violet-300">
                Mechanism: {p.architecturalMechanism}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: ARCHITECTURAL COMPARISON MATRIX (13 DIMENSIONS) */}
      <section className="mx-auto max-w-7xl px-4 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
            04 • COMPARATIVE EVALUATION (13 DIMENSIONS)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Dominant Platform Internet vs. NEW NET Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Not every existing service suffers from identical weaknesses (e.g., Signal
            and local-first tools already excel in specific areas). This matrix compares
            the dominant ad-funded platform paradigm with NEW NET’s integrated stack.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0b0f19]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#07090e] font-mono text-[11px] uppercase text-slate-400">
                <th className="p-3.5">Architectural Dimension</th>
                <th className="p-3.5 text-rose-300">Dominant Platform Model</th>
                <th className="p-3.5 text-emerald-300">NEW NET Sovereign Architecture</th>
                <th className="p-3.5 text-blue-300">Engineering Nuance &amp; Prior Art</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {ARCHITECTURAL_COMPARISON.map((row) => (
                <tr key={row.dimension} className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-semibold text-white whitespace-nowrap">
                    {row.dimension}
                  </td>
                  <td className="p-3.5 text-slate-400 leading-relaxed">
                    {row.legacyModel}
                  </td>
                  <td className="p-3.5 text-slate-200 leading-relaxed">
                    {row.newNetModel}
                  </td>
                  <td className="p-3.5 text-slate-400 italic leading-relaxed">
                    {row.nuanceNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: COMPLETE 10-MODULE NAVIGATION DIRECTORY */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/30 via-[#0b0f19] to-violet-950/30 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-2 max-w-2xl">
              <span className="font-mono text-xs uppercase text-blue-400">
                CONTINUE EXPLORING THE TECHNICAL SHOWCASE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Inspect Every Layer, Threat Model, Live API &amp; Playground Lab
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Every module in NEW NET is interactive: test real WebCrypto signatures,
                revoke Pod permissions, tune feed algorithms, inspect 11 threat models,
                or execute live requests against our 15 API endpoints.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/vision"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <Compass className="h-4 w-4 text-blue-400" />
                <span>02. Vision &amp; Anti-Decay</span>
              </Link>
              <Link
                href="/architecture"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <Layers className="h-4 w-4 text-violet-400" />
                <span>03. Architecture Explorer</span>
              </Link>
              <Link
                href="/backend"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <Server className="h-4 w-4 text-cyan-400" />
                <span>04. Backend Infrastructure</span>
              </Link>
              <Link
                href="/security"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>06. 11 Threat Models</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
