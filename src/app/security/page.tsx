"use client";

import React, { useState } from "react";
import { THREAT_MODELS } from "@/lib/architecture-data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Shield,
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 space-y-14">
      {/* Header */}
      <div className="border-b border-white/[0.07] pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300">
          <Shield className="h-3.5 w-3.5 text-blue-400" />
          <span>MODULE 06 • SECURITY &amp; TRUST CENTRE (11 THREAT MODELS)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Zero-Trust Security Architecture &amp; 11 Adversarial Threat Models
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Decentralisation introduces its own severe threat vectors: malicious relay nodes,
          lost or compromised cryptographic keys, Sybil floods, and prompt-injected AI
          agents. Every NEW NET threat model documents its attack scenario, impact,
          prevention, detection, recovery, and remaining limitations.
        </p>
      </div>

      {/* Interactive Threat Selector & Inspector */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* 11 Threat Models List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Select Threat Vector ({THREAT_MODELS.length} Documented)
          </div>
          {THREAT_MODELS.map((tm) => {
            const active = tm.id === selectedId;
            return (
              <button
                key={tm.id}
                type="button"
                onClick={() => setSelectedId(tm.id)}
                className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                  active
                    ? "border-blue-500/50 bg-[#131720] text-white shadow-md"
                    : "border-white/[0.07] bg-[#0e1014] text-zinc-400 hover:border-white/[0.15] hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] text-blue-400">
                    {tm.category}
                  </span>
                  <span
                    className={`rounded border px-1.5 py-0.5 font-mono text-[9px] font-semibold ${
                      tm.severity === "CRITICAL"
                        ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                        : tm.severity === "HIGH"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                        : "border-white/[0.1] bg-white/[0.04] text-zinc-300"
                    }`}
                  >
                    {tm.severity}
                  </span>
                </div>
                <div className="text-xs font-semibold text-zinc-100">{tm.title}</div>
              </button>
            );
          })}
        </div>

        {/* 7-Part Threat Specification View */}
        <div className="lg:col-span-8 rounded-2xl border border-white/[0.09] bg-[#0e1014] p-6 sm:p-7 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.07] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-blue-400">
                  {activeThreat.category}
                </span>
                <span className="rounded border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] font-semibold text-zinc-300">
                  SEVERITY: {activeThreat.severity}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1.5">
                {activeThreat.title}
              </h2>
            </div>
            <StatusBadge status={activeThreat.status} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-xs">
            <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-1.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                1. Threat Description
              </div>
              <p className="text-zinc-200 leading-relaxed">
                {activeThreat.description}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-1.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-blue-400">
                2. Adversarial Attack Scenario
              </div>
              <p className="text-zinc-200 leading-relaxed">
                {activeThreat.attackScenario}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[#08090a] p-4 space-y-1.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-amber-400">
                3. Potential Systemic Impact
              </div>
              <p className="text-zinc-200 leading-relaxed">
                {activeThreat.potentialImpact}
              </p>
            </div>
          </div>

          {/* 4. Prevention, 5. Detection, 6. Recovery */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-xs">
            <div className="rounded-xl border border-white/[0.07] bg-[#08090a] p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>4. Cryptographic Prevention</span>
              </div>
              <ul className="space-y-2 text-zinc-300 leading-relaxed">
                {activeThreat.prevention.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Lock className="h-3 w-3 text-emerald-400 shrink-0 mt-1" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-[#08090a] p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-blue-400">
                <Radar className="h-4 w-4" />
                <span>5. Telemetry &amp; Detection</span>
              </div>
              <ul className="space-y-2 text-zinc-300 leading-relaxed">
                {activeThreat.detection.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-400 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-[#08090a] p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-zinc-200">
                <RotateCcw className="h-4 w-4 text-blue-400" />
                <span>6. Containment &amp; Recovery</span>
              </div>
              <ul className="space-y-2 text-zinc-300 leading-relaxed">
                {activeThreat.recovery.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-400 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 7. Remaining Limitations */}
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.05] p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <span>7. Remaining Architectural Limitations &amp; Residual Risk</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeThreat.remainingLimitations}
            </p>
          </div>
        </div>
      </div>

      {/* Full Summary Table of All 11 Threat Models */}
      <section className="space-y-4">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Complete Threat Matrix Overview (All 11 Vectors)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0e1014]">
          <table className="w-full min-w-[780px] text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#08090a] font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                <th className="py-3.5 px-4">Threat Vector</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">Primary Defense</th>
                <th className="py-3.5 px-4">Residual Limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {THREAT_MODELS.map((tm) => (
                <tr
                  key={tm.id}
                  onClick={() => setSelectedId(tm.id)}
                  className="cursor-pointer hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3.5 px-4 font-semibold text-zinc-100">{tm.title}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-300">
                    {tm.severity}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300">{tm.prevention[0]}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{tm.remainingLimitations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
