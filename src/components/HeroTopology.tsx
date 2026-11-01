"use client";

import React, { useState } from "react";
import { ShieldCheck, KeyRound, Database, Radio, Cpu, Lock } from "lucide-react";

const TOPOLOGY_NODES = [
  {
    id: "root-did",
    code: "L1 • W3C DID VAULT",
    title: "Self-Sovereign Identity",
    metric: "did:key:zDnaer8vK... (ECDSA P-256)",
    status: "IMPLEMENTED",
    icon: KeyRound,
    x: 50,
    y: 16,
  },
  {
    id: "pod-store",
    code: "L2 • PERSONAL POD",
    title: "Encrypted Data Vault",
    metric: "AES-256-GCM + UCAN Scoped",
    status: "IMPLEMENTED",
    icon: Database,
    x: 18,
    y: 48,
  },
  {
    id: "provenance-gate",
    code: "L5/L6 • PROVENANCE",
    title: "CIDv1 & C2PA Verifier",
    metric: "SHA-256 Multihash Attested",
    status: "IMPLEMENTED",
    icon: ShieldCheck,
    x: 82,
    y: 48,
  },
  {
    id: "relay-mesh",
    code: "L3 • RELAY MESH",
    title: "Content-Addressed P2P",
    metric: "bafybeig... (3+ Replicas)",
    status: "SIMULATED",
    icon: Radio,
    x: 26,
    y: 82,
  },
  {
    id: "ai-sandbox",
    code: "L7 • PERSONAL AI",
    title: "Fiduciary Agent Sandbox",
    metric: "Local-First + HITL Gate",
    status: "IMPLEMENTED",
    icon: Cpu,
    x: 74,
    y: 82,
  },
];

export function HeroTopology() {
  const [activeNodeId, setActiveNodeId] = useState<string>("root-did");
  const activeNode =
    TOPOLOGY_NODES.find((n) => n.id === activeNodeId) || TOPOLOGY_NODES[0];

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0e12] p-5 sm:p-6 shadow-2xl">
      {/* Top Window Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
            Sovereign Node Topology — Reference Plane
          </span>
        </div>
        <span className="rounded border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
          Zero-Trust Capability Graph
        </span>
      </div>

      {/* SVG Network Diagram Canvas */}
      <div className="relative h-[300px] sm:h-[330px] w-full rounded-xl border border-white/[0.05] bg-[#08090a] overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.45)" />
              <stop offset="100%" stopColor="rgba(148, 163, 184, 0.15)" />
            </linearGradient>
          </defs>

          {/* Architectural Connection Lines */}
          <line x1="50" y1="18" x2="20" y2="48" stroke="url(#lineGrad)" strokeWidth="0.45" />
          <line x1="50" y1="18" x2="80" y2="48" stroke="url(#lineGrad)" strokeWidth="0.45" />
          <line x1="20" y1="48" x2="80" y2="48" stroke="rgba(255,255,255,0.08)" strokeWidth="0.35" strokeDasharray="1.5 1.5" />
          <line x1="20" y1="48" x2="28" y2="80" stroke="url(#lineGrad)" strokeWidth="0.45" />
          <line x1="80" y1="48" x2="72" y2="80" stroke="url(#lineGrad)" strokeWidth="0.45" />
          <line x1="20" y1="48" x2="72" y2="80" stroke="rgba(59, 130, 246, 0.22)" strokeWidth="0.35" />
          <line x1="80" y1="48" x2="28" y2="80" stroke="rgba(59, 130, 246, 0.22)" strokeWidth="0.35" />
          <line x1="28" y1="80" x2="72" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.35" strokeDasharray="1.5 1.5" />
        </svg>

        {/* Interactive Nodes */}
        {TOPOLOGY_NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2.5 py-2 text-left transition-all ${
                isSelected
                  ? "border-blue-500/60 bg-[#131822] shadow-lg ring-1 ring-blue-500/30 z-10"
                  : "border-white/[0.09] bg-[#0e1014]/95 hover:border-white/[0.2]"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border ${
                    isSelected
                      ? "border-blue-500/40 bg-blue-500/15 text-blue-400"
                      : "border-white/[0.08] bg-white/[0.03] text-zinc-400"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                    {node.code}
                  </div>
                  <div className="text-[11px] font-medium text-zinc-100 whitespace-nowrap">
                    {node.title}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Selected Node Telemetry Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#08090a] px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <Lock className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          <div>
            <span className="font-mono text-[11px] font-medium text-zinc-200">
              {activeNode.title}
            </span>
            <span className="mx-2 text-zinc-600">•</span>
            <span className="font-mono text-[11px] text-zinc-400">
              {activeNode.metric}
            </span>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
          [{activeNode.status}]
        </span>
      </div>
    </div>
  );
}
