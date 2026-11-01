import React from "react";
import { DEVELOPMENT_ROADMAP } from "@/lib/architecture-data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Map,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  GitBranch,
} from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="border-b border-white/[0.07] pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300">
          <Map className="h-3.5 w-3.5 text-blue-400" />
          <span>MODULE 10 • 7-PHASE RESEARCH &amp; ENGINEERING ROADMAP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Long-Term Engineering Roadmap, Risks &amp; Open Research Questions
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Replacing or augmenting planetary-scale internet protocols is a multi-year
          systems engineering effort. This roadmap outlines the seven sequential phases
          of NEW NET—from foundational specifications and cryptographic identity pods to
          global multi-jurisdiction federation trials—alongside realistic dependencies,
          risks, and unresolved questions.
        </p>
      </div>

      {/* 7 Phases Timeline */}
      <div className="space-y-6">
        {DEVELOPMENT_ROADMAP.map((phase) => (
          <div
            key={phase.phase}
            className="rounded-2xl border border-white/[0.08] bg-[#0e1014] p-6 sm:p-7 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded border border-blue-500/30 bg-blue-500/[0.1] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-blue-300">
                    {phase.phase.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {phase.timeframe}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1.5">
                  {phase.title}
                </h2>
              </div>
              <StatusBadge status={phase.status} />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {phase.summary}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 text-xs">
              {/* Milestones */}
              <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Key Engineering Milestones</span>
                </div>
                <ul className="space-y-1.5 text-zinc-300 leading-relaxed">
                  {phase.milestones.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dependencies */}
              <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-blue-400">
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>Protocol Dependencies</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {phase.dependencies.map((d) => (
                    <span
                      key={d}
                      className="rounded border border-white/[0.09] bg-[#14171d] px-2 py-1 font-mono text-[10px] text-zinc-200"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engineering Risks */}
              <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  <span>Architectural &amp; Adoption Risks</span>
                </div>
                <ul className="space-y-1.5 text-zinc-300 leading-relaxed">
                  {phase.risks.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-400 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unresolved Research Questions */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Unresolved Research Questions</span>
                </div>
                <ul className="space-y-1.5 text-zinc-300 leading-relaxed">
                  {phase.unresolvedQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
