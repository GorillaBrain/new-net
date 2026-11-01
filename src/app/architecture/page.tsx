import React from "react";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { Layers } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-white/[0.07] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300">
          <Layers className="h-3.5 w-3.5 text-blue-400" />
          <span>MODULE 03 • INTERACTIVE REACT FLOW ARCHITECTURE EXPLORER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Interactive Architecture &amp; Protocol Flow Explorer
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Switch across 9 interactive architectural diagrams covering the high-level
          7-layer stack, modular backend services, identity creation, personal-data
          permission flows, application interoperability, discovery ranking, content
          verification, AI-agent sandboxing, and zero-trust threat boundaries. Click any
          node to inspect its purpose, implementation, dependencies, security model, and
          limitations.
        </p>
      </div>

      <ArchitectureExplorer />
    </div>
  );
}
