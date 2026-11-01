"use client";

import React, { useState } from "react";
import { THREAT_MODELS } from "@/lib/architecture-data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Shield,
  AlertOctagon,
  ShieldCheck,
  Radar,
  RotateCcw,
  AlertTriangle,
  Lock,
} from "lucide-react";

export default function SecurityArchitecturePage() {
  const [selectedId, setSelectedId] = useState<string>(THREAT_MODELS[0].id);
  const activeThreat =
    THREAT_MODELS.find((t) => t.id === selectedId) || THREAT_MODELS[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-xs text-rose-300">
          <Shield className="h-3.5 w-3.5" />
          <span>MODULE 06 • SECURITY &amp; TRUST CENTRE (11 THREAT MODELS)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Zero-Trust Security Architecture &amp; 11 Adversarial Threat Models
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Decentralisation introduces its own severe threat vectors: malicious relay nodes,
          lost or compromised cryptographic keys, Sybil floods, and prompt-injected AI
          agents. Every NEW NET threat model documents its attack scenario, impact,
          prevention, detection, recovery, and remaining limitations.
        </p>
      </div>

      {/* Interactive Threat Selector & Inspector */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 11 Threat Models List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="font-mono text-xs uppercase text-slate-400 mb-2">
            Select Threat Vector ({THREAT_MODELS.length} Documented):
          </div>
          {THREAT_MODELS.map((tm) => {
            const active = tm.id === selectedId;
            return (
              <button
                key={tm.id}
                type="button"
                onClick={() => setSelectedId(tm.id)}
                className={`w-full rounded-xl border p-3.5 text-left transition ${
                  active
                    ? "border-blue-500 bg-blue-500/15 text-white shadow-md"
                    : "border-slate-800 bg-[#0b0f19] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] text-blue-400">
                    {tm.category}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                      tm.severity === "CRITICAL"
                        ? "bg-rose-500/20 text-rose-300"
                        : tm.severity === "HIGH"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {tm.severity}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-100">{tm.title}</div>
              </button>
            );
          })}
        </div>

        {/* 7-Part Threat Specification View */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-[#0b0f19] p-6 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-blue-400">
                  {activeThreat.category}
                </span>
                <span className="rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-300">
                  SEVERITY: {activeThreat.severity}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {activeThreat.title}
              </h2>
            </div>
            <StatusBadge status={activeThreat.status} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-xs">
            <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-1.5">
              <div className="font-mono text-[10px] uppercase text-slate-400">
                1. Threat Description
              </div>
              <p className="text-slate-200 leading-relaxed">
                {activeThreat.description}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-1.5">
              <div className="font-mono text-[10px] uppercase text-rose-400">
                2. Adversarial Attack Scenario
              </div>
              <p className="text-slate-200 leading-relaxed">
                {activeThreat.attackScenario}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#07090e] p-4 space-y-1.5">
              <div className="font-mono text-[10px] uppercase text-amber-400">
                3. Potential Systemic Impact
              </div>
              <p className="text-slate-200 leading-relaxed">
                {activeThreat.potentialImpact}
              </p>
            </div>
          </div>

          {/* 4. Prevention, 5. Detection, 6. Recovery */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-xs">
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>4. Cryptographic Prevention</span>
              </div>
              <ul className="space-y-1.5 text-slate-200">
                {activeThreat.prevention.map((p) => (
                  <li key={p} className="flex items-start gap-1.5">
                    <Lock className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-blue-500/25 bg-blue-500/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-blue-300">
                <Radar className="h-4 w-4" />
                <span>5. Telemetry &amp; Detection</span>
              </div>
              <ul className="space-y-1.5 text-slate-200">
                {activeThreat.detection.map((d) => (
                  <li key={d} className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-violet-500/25 bg-violet-500/5 p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-violet-300">
                <RotateCcw className="h-4 w-4" />
                <span>6. Containment &amp; Recovery</span>
              </div>
              <ul className="space-y-1.5 text-slate-200">
                {activeThreat.recovery.map((r) => (
                  <li key={r} className="flex items-start gap-1.5">
                    <span className="text-violet-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 7. Remaining Limitations */}
          <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-300">
              <AlertTriangle className="h-4 w-4" />
              <span>7. Remaining Architectural Limitations &amp; Residual Risk</span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              {activeThreat.remainingLimitations}
            </p>
          </div>
        </div>
      </div>

      {/* Full Summary Table of All 11 Threat Models */}
      <section className="space-y-4">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
          Complete Threat Matrix Overview (All 11 Vectors)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0b0f19]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-[#07090e] font-mono text-[10px] uppercase text-slate-400">
                <th className="p-3">Threat Vector</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Primary Defense</th>
                <th className="p-3">Residual Limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {THREAT_MODELS.map((tm) => (
                <tr
                  key={tm.id}
                  onClick={() => setSelectedId(tm.id)}
                  className="cursor-pointer hover:bg-slate-900/60"
                >
                  <td className="p-3 font-semibold text-white">{tm.title}</td>
                  <td className="p-3 font-mono text-[11px] text-rose-300">
                    {tm.severity}
                  </td>
                  <td className="p-3 text-slate-300">{tm.prevention[0]}</td>
                  <td className="p-3 text-slate-400">{tm.remainingLimitations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
