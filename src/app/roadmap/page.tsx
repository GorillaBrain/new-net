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
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
          <Map className="h-3.5 w-3.5" />
          <span>MODULE 10 • 7-PHASE RESEARCH &amp; ENGINEERING ROADMAP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Long-Term Engineering Roadmap, Risks &amp; Open Research Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
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
            className="rounded-2xl border border-slate-800 bg-[#0b0f19] p-6 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded bg-blue-500/20 px-2.5 py-1 font-mono text-xs font-bold text-blue-300">
                    {phase.phase.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {phase.timeframe}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1.5">
                  {phase.title}
                </h2>
              </div>
              <StatusBadge status={phase.status} />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {phase.summary}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 text-xs">
              {/* Milestones */}
              <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Key Engineering Milestones</span>
                </div>
                <ul className="space-y-1.5 text-slate-200">
                  {phase.milestones.map((m) => (
                    <li key={m} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dependencies */}
              <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-blue-400">
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>Protocol Dependencies</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {phase.dependencies.map((d) => (
                    <span
                      key={d}
                      className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[10px] text-blue-300"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engineering Risks */}
              <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-rose-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Architectural &amp; Adoption Risks</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {phase.risks.map((r) => (
                    <li key={r} className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unresolved Research Questions */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/15 p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-amber-300">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Unresolved Research Questions</span>
                </div>
                <ul className="space-y-1.5 text-amber-100/90">
                  {phase.unresolvedQuestions.map((q) => (
                    <li key={q} className="leading-relaxed">
                      {q}
                    </li>
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
