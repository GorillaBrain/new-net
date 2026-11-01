import React from "react";
import Link from "next/link";
import { ARCHITECTURAL_COMPARISON } from "@/lib/architecture-data";
import { StatusBadge } from "@/components/StatusBadge";
import { HeroTopology } from "@/components/HeroTopology";
import { FailureModesGrid } from "@/components/FailureModesGrid";
import { InteractiveSevenLayerStack } from "@/components/InteractiveSevenLayerStack";
import { PrinciplesGrid } from "@/components/PrinciplesGrid";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Terminal,
  Server,
  Radio,
  Lock,
  Bot,
  FileCode2,
  Map,
} from "lucide-react";

const SHOWCASE_CARDS = [
  {
    number: "03",
    title: "Architecture Explorer",
    href: "/architecture",
    icon: Layers,
    status: "IMPLEMENTED" as const,
    description:
      "Interactive 9-diagram React Flow topology covering all 7 layers, capability gates, and threat boundaries.",
  },
  {
    number: "04",
    title: "Backend Infrastructure",
    href: "/backend",
    icon: Server,
    status: "IMPLEMENTED" as const,
    description:
      "Modular Next.js route handlers, persistence adapter transparency, and critical evaluation of 7 protocol stacks.",
  },
  {
    number: "05",
    title: "Information Ecosystem",
    href: "/information",
    icon: Radio,
    status: "IMPLEMENTED" as const,
    description:
      "User-selected ranking lenses, C2PA version lineage, CIDv1 preservation, and authenticity vs. truth boundaries.",
  },
  {
    number: "06",
    title: "Security Architecture",
    href: "/security",
    icon: Lock,
    status: "IMPLEMENTED" as const,
    description:
      "Zero-trust cryptographic boundaries and 11 adversarial threat models with prevention, detection, and recovery specs.",
  },
  {
    number: "07",
    title: "AI & Automation",
    href: "/ai",
    icon: Bot,
    status: "IMPLEMENTED" as const,
    description:
      "Fiduciary Personal AI agents operating inside deterministic out-of-context UCAN sandboxes with human approval gates.",
  },
  {
    number: "08",
    title: "Interactive Playground",
    href: "/playground",
    icon: Terminal,
    status: "IMPLEMENTED" as const,
    description:
      "8 live functional labs: generate ECDSA P-256 DIDs, revoke Pod access, tune feed weights, and test tamper detection.",
  },
  {
    number: "09",
    title: "API Documentation",
    href: "/api-docs",
    icon: FileCode2,
    status: "IMPLEMENTED" as const,
    description:
      "Complete schemas, auth boundaries, and live request execution console for all 15 backend endpoints.",
  },
  {
    number: "10",
    title: "Research & Roadmap",
    href: "/roadmap",
    icon: Map,
    status: "RESEARCH REQUIRED" as const,
    description:
      "7-phase systems engineering roadmap with milestones, protocol dependencies, risks, and open research questions.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative border-b border-white/[0.07] bg-hero-glow pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Editorial Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>ARCHITECTURE RESEARCH INITIATIVE • SPEC v0.9.4</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
                The Internet Doesn&apos;t Have to Work This Way.
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                An exploration of a more open, private, secure, interoperable,
                and individually controlled internet. Built around self-sovereign
                identity, encrypted personal data pods, content-addressed
                preservation, and fiduciary personal AI.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors"
                >
                  <Layers className="h-4 w-4" />
                  <span>Explore Architecture</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/playground"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-[#12141a] hover:bg-[#181b22] hover:border-white/[0.2] px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors"
                >
                  <Terminal className="h-4 w-4 text-blue-400" />
                  <span>Launch Interactive Playground</span>
                </Link>
              </div>

              {/* Compact Research & Implementation Status Strip */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>WebCrypto ECDSA / SHA-256: Implemented</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>15 Route Handlers: Live</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  <span>P2P Relay Mesh: Simulated</span>
                </div>
              </div>
            </div>

            {/* Right Column: Subtle Interactive Node Topology Visualization */}
            <div className="lg:col-span-5">
              <HeroTopology />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERNET FAILURE MODES (6-CARD GRID) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
              01 / Diagnostic Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Structural Failure Modes of Today&apos;s Internet
            </h2>
            <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
              Modern internet pathologies are not isolated policy oversights—they
              are direct architectural consequences of centralized identity,
              siloed application databases, mutable location-based links, and
              surveillance-advertising business models.
            </p>
          </div>
          <Link
            href="/vision"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-blue-400 transition-colors shrink-0"
          >
            <span>Read Anti-Decay Specification</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <FailureModesGrid />
      </section>

      {/* 3. INTERACTIVE SEVEN-LAYER ARCHITECTURE EXPLORER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
              02 / Core System Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Interactive Seven-Layer Architecture
            </h2>
            <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
              Decentralisation does not automatically guarantee security,
              privacy, truth, or freedom. Select any layer below to inspect its
              cryptographic guarantees, open standards, implementation status,
              and engineering caveats.
            </p>
          </div>
          <Link
            href="/architecture"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-blue-400 transition-colors shrink-0"
          >
            <span>Open Full 9-Diagram Node Canvas</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <InteractiveSevenLayerStack />
      </section>

      {/* 4. TWELVE ARCHITECTURAL PRINCIPLES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
              03 / Foundational Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Twelve Architectural Principles
            </h2>
            <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
              The individual should own their digital life, not the platforms
              they use. Click any principle card to inspect its underlying
              cryptographic and systems mechanism.
            </p>
          </div>
        </div>

        <PrinciplesGrid />
      </section>

      {/* 5. COMPARATIVE EVALUATION (13 DIMENSIONS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-white/[0.07] pb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
            04 / Comparative Evaluation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Dominant Platform Model vs. NEW NET Architecture
          </h2>
          <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
            Not every existing service suffers from identical weaknesses—tools
            like Signal, Git, and local-first editors already protect specific
            domains. This 13-dimension matrix evaluates how NEW NET integrates
            self-sovereign identity, personal pods, and provenance across the
            entire stack.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0e1014]">
          <table className="w-full min-w-[880px] text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#08090a] font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                <th className="py-3.5 px-4 w-[18%]">Dimension</th>
                <th className="py-3.5 px-4 w-[27%] text-zinc-300">
                  Dominant Platform Paradigm
                </th>
                <th className="py-3.5 px-4 w-[31%] text-blue-300">
                  NEW NET Sovereign Architecture
                </th>
                <th className="py-3.5 px-4 w-[24%] text-zinc-400">
                  Engineering Nuance &amp; Prior Art
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-xs">
              {ARCHITECTURAL_COMPARISON.map((row, idx) => (
                <tr
                  key={row.dimension}
                  className={
                    idx % 2 === 0
                      ? "bg-[#0e1014] hover:bg-white/[0.02]"
                      : "bg-[#0b0d10] hover:bg-white/[0.02]"
                  }
                >
                  <td className="py-4 px-4 font-mono text-xs font-medium text-zinc-100 align-top">
                    {row.dimension}
                  </td>
                  <td className="py-4 px-4 text-zinc-400 leading-relaxed align-top">
                    {row.legacyModel}
                  </td>
                  <td className="py-4 px-4 text-zinc-100 leading-relaxed align-top border-l border-white/[0.04] bg-blue-500/[0.02]">
                    {row.newNetModel}
                  </td>
                  <td className="py-4 px-4 text-zinc-400 leading-relaxed align-top">
                    {row.nuanceNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. TECHNICAL SHOWCASE DIRECTORY (8 MODULES) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 border-b border-white/[0.07] pb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-400">
            05 / Interactive Technical Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Explore Subsystems, Threat Models &amp; Live Labs
          </h2>
          <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
            Every architectural subsystem in NEW NET can be inspected, tested,
            and verified directly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0e1014] p-5 transition-all hover:border-blue-500/40 hover:bg-[#12151c]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-[#14171d] text-blue-400 group-hover:border-blue-500/40">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[11px] text-zinc-500">
                      MODULE {card.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400" />
                  </h3>

                  <p className="text-xs leading-relaxed text-zinc-400">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                  <StatusBadge status={card.status} size="xs" />
                  <span className="font-mono text-[10px] text-zinc-500 group-hover:text-blue-400">
                    Open →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
