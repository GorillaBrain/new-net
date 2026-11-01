import React from "react";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { Layers } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
          <Layers className="h-3.5 w-3.5" />
          <span>MODULE 03 • INTERACTIVE REACT FLOW ARCHITECTURE EXPLORER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Interactive Architecture &amp; Protocol Flow Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
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
