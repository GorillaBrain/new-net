"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SEVEN_LAYERS } from "@/lib/architecture-data";
import { StatusBadge } from "./StatusBadge";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Layers,
  Terminal,
  ChevronRight,
} from "lucide-react";

export function InteractiveSevenLayerStack() {
  const [selectedLayerNum, setSelectedLayerNum] = useState<number>(1);
  const activeLayer =
    SEVEN_LAYERS.find((l) => l.layer === selectedLayerNum) || SEVEN_LAYERS[0];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
      {/* Left Column: Interactive 7-Layer Stack Selector with Connected Spine */}
      <div className="lg:col-span-5 relative space-y-2">
        <div
          className="absolute left-[26px] top-6 bottom-6 w-px bg-gradient-to-b from-blue-500/40 via-white/[0.1] to-blue-500/40 pointer-events-none"
          aria-hidden="true"
        />

        {SEVEN_LAYERS.map((item) => {
          const isSelected = item.layer === selectedLayerNum;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedLayerNum(item.layer)}
              className={`relative w-full flex items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all ${
                isSelected
                  ? "border-blue-500/50 bg-[#131720] shadow-lg ring-1 ring-blue-500/20"
                  : "border-white/[0.07] bg-[#0e1014] hover:border-white/[0.15] hover:bg-[#11141a]"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-semibold transition-colors ${
                    isSelected
                      ? "border-blue-400 bg-blue-600 text-white"
                      : "border-white/[0.1] bg-[#08090a] text-zinc-400"
                  }`}
                >
                  L{item.layer}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isSelected ? "text-white" : "text-zinc-200"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {item.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={item.status} size="xs" />
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isSelected
                      ? "text-blue-400 translate-x-0.5"
                      : "text-zinc-600"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column: Detailed Layer Specification Inspector Panel */}
      <div className="lg:col-span-7 rounded-2xl border border-white/[0.09] bg-[#0e1014] p-6 sm:p-7 space-y-6">
        {/* Layer Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.07] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="rounded border border-blue-500/30 bg-blue-500/[0.1] px-2 py-0.5 font-mono text-[11px] font-semibold text-blue-300">
                LAYER 0{activeLayer.layer} OF 07
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                {activeLayer.id}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
              {activeLayer.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              {activeLayer.tagline}
            </p>
          </div>
          <StatusBadge status={activeLayer.status} />
        </div>

        {/* Inter-Layer Topology Context */}
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-[#08090a] p-3 font-mono text-[11px]">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">
              Lower Foundation
            </span>
            <span className="text-zinc-300 truncate block mt-0.5">
              {activeLayer.layer > 1
                ? `L${activeLayer.layer - 1}: ${
                    SEVEN_LAYERS[activeLayer.layer - 2].name.split(" ")[0]
                  } Layer`
                : "Hardware Enclave / Root Entropy"}
            </span>
          </div>
          <div className="border-x border-white/[0.06] px-3">
            <span className="text-blue-400 block text-[10px] uppercase">
              Active Plane
            </span>
            <span className="text-white font-semibold truncate block mt-0.5">
              L{activeLayer.layer}: {activeLayer.name.replace(" Layer", "")}
            </span>
          </div>
          <div className="pl-1">
            <span className="text-zinc-500 block text-[10px] uppercase">
              Upper Consumer
            </span>
            <span className="text-zinc-300 truncate block mt-0.5">
              {activeLayer.layer < 7
                ? `L${activeLayer.layer + 1}: ${
                    SEVEN_LAYERS[activeLayer.layer].name.split(" ")[0]
                  } Layer`
                : "Human Principal & HITL Gate"}
            </span>
          </div>
        </div>

        {/* Architectural Capabilities */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            Architectural Capabilities ({activeLayer.capabilities.length})
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {activeLayer.capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-start gap-2.5 rounded-lg border border-white/[0.05] bg-[#08090a]/70 p-3 text-xs text-zinc-200 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Protocols & Standards */}
        <div className="space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            Standards &amp; Cryptographic Primitives
          </div>
          <div className="flex flex-wrap gap-2">
            {activeLayer.protocols.map((proto) => (
              <span
                key={proto}
                className="rounded-md border border-white/[0.09] bg-[#14171d] px-2.5 py-1 font-mono text-xs text-zinc-200"
              >
                {proto}
              </span>
            ))}
          </div>
        </div>

        {/* Engineering Caveat Box */}
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.05] p-4 space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Critical Engineering Caveat &amp; Limitation</span>
          </div>
          <p className="text-xs leading-relaxed text-zinc-300">
            {activeLayer.criticalCaveat}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
          <Link
            href="/architecture"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Inspect L{activeLayer.layer} Node Topology in React Flow</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
            <span>Test in Live Playground</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
