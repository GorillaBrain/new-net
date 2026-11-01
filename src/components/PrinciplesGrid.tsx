"use client";

import React, { useState } from "react";
import { TWELVE_PRINCIPLES } from "@/lib/architecture-data";
import { ChevronDown, Cpu } from "lucide-react";

export function PrinciplesGrid() {
  const [expandedNum, setExpandedNum] = useState<number | null>(1);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TWELVE_PRINCIPLES.map((p) => {
        const isExpanded = expandedNum === p.number;
        return (
          <div
            key={p.number}
            onClick={() => setExpandedNum(isExpanded ? null : p.number)}
            className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between ${
              isExpanded
                ? "border-blue-500/40 bg-[#12151c]"
                : "border-white/[0.07] bg-[#0e1014] hover:border-white/[0.14]"
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-blue-400">
                  {String(p.number).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  aria-label={`Toggle details for ${p.title}`}
                  className="text-zinc-500 hover:text-zinc-200"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-150 ${
                      isExpanded ? "rotate-180 text-blue-400" : ""
                    }`}
                  />
                </button>
              </div>

              <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
                {p.title}
              </h3>

              <p className="text-xs leading-relaxed text-zinc-400">
                {p.description}
              </p>
            </div>

            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                <Cpu className="h-3 w-3 text-blue-400 shrink-0" />
                <span>Technical Mechanism</span>
              </div>
              <p
                className={`mt-1 font-mono text-[11px] leading-relaxed ${
                  isExpanded
                    ? "text-zinc-200"
                    : "text-zinc-400 line-clamp-1"
                }`}
              >
                {p.architecturalMechanism}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
