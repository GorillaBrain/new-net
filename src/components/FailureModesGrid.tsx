"use client";

import React, { useState } from "react";
import { STRUCTURAL_PROBLEMS } from "@/lib/architecture-data";
import {
  Network,
  Flame,
  Bot,
  EyeOff,
  Archive,
  ShieldAlert,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  Flame,
  Bot,
  EyeOff,
  Archive,
  ShieldAlert,
};

export function FailureModesGrid() {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    centralisation: true,
  });

  function toggleCard(id: string) {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {STRUCTURAL_PROBLEMS.map((prob, index) => {
        const Icon = ICON_MAP[prob.icon] || ShieldAlert;
        const isExpanded = Boolean(expandedIds[prob.id]);

        return (
          <div
            key={prob.id}
            className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0e1014] p-5 transition-colors hover:border-white/[0.14]"
          >
            <div className="space-y-3.5">
              {/* Top Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-[#14171d] text-zinc-200">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">
                    0{index + 1}
                  </span>
                </div>
                <span className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  {prob.severity} VECTOR
                </span>
              </div>

              {/* Heading & Concise Explanation */}
              <div>
                <h3 className="text-base font-semibold text-zinc-100 tracking-tight">
                  {prob.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  {prob.subtitle}
                </p>
              </div>

              {/* Expandable Technical Breakdown Trigger */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => toggleCard(prob.id)}
                  aria-expanded={isExpanded}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-300 hover:text-white transition-colors"
                >
                  <span>
                    {isExpanded
                      ? "Hide structural failure vectors"
                      : `Inspect ${prob.issues.length} structural failure vectors`}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-150 ${
                      isExpanded ? "rotate-180 text-blue-400" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <ul className="mt-3 space-y-2 border-t border-white/[0.06] pt-3 text-xs text-zinc-300">
                    {prob.issues.map((issue) => (
                      <li
                        key={issue}
                        className="flex items-start gap-2 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Corresponding NEW NET Countermeasure */}
            <div className="mt-5 rounded-lg border border-white/[0.06] bg-[#08090a] p-3.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-blue-400 mb-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>NEW NET Architectural Countermeasure</span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-300">
                {prob.newNetCountermeasure}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
