import React from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Bot,
  Cpu,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function AiAndAutomationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 font-mono text-xs text-fuchsia-300">
          <Bot className="h-3.5 w-3.5" />
          <span>MODULE 07 • LAYER 7 SOVEREIGN PERSONAL AI &amp; AUTOMATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          User-Controlled Personal AI Agents &amp; Out-of-Context Capability Sandboxes
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          On today’s internet, AI assistants are operated by centralized platforms that
          ingest your personal documents into opaque cloud training pipelines while
          undeclared AI bots flood public feeds. NEW NET establishes a sovereign Layer 7
          architecture where AI agents serve the individual under cryptographic capability
          constraints.
        </p>
      </div>

      {/* Seven Pillars of Layer 7 Personal AI */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "1. Fiduciary Personal AI Agents",
            status: "IMPLEMENTED" as const,
            desc: "Personal agents act exclusively on behalf of their human principal—synthesizing research, auditing pod permissions, and triaging messages without reporting behavioral telemetry to an ad network.",
          },
          {
            title: "2. Local-First Inference Priority",
            status: "SIMULATED" as const,
            desc: "Sensitive personal pod data (health, finances, private drafts) is processed locally on-device via WebGPU / ONNX / local weights (4B–14B models) so raw plaintext never leaves user hardware.",
          },
          {
            title: "3. Permission-Controlled Pod Access",
            status: "IMPLEMENTED" as const,
            desc: "Each agent receives a strictly scoped UCAN capability token (e.g., READ /pod/workspace/papers). It has zero ambient access to other containers in the user's Personal Data Pod.",
          },
          {
            title: "4. Privacy-Proxied External AI Gateways",
            status: "PROPOSED" as const,
            desc: "When frontier-scale reasoning is required beyond local GPU capacity, prompts are stripped of PII locally and routed through zero-retention confidential compute enclaves.",
          },
          {
            title: "5. Cryptographic Agent Identity (Agent DIDs)",
            status: "IMPLEMENTED" as const,
            desc: "Every legitimate agent holds its own delegated DID (did:key:zDnaerAgent...) linked via a DeclaredAiAgentDelegation Verifiable Credential to its accountable human principal.",
          },
          {
            title: "6. Mandatory Human Approval Gates (HITL)",
            status: "IMPLEMENTED" as const,
            desc: "High-impact actions—publishing to public relays, spending funds, or granting sub-permissions—pause in AWAITING_HUMAN_SIGNATURE state until the human principal countersigns.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <Cpu className="h-4 w-4 text-fuchsia-400" />
              <StatusBadge status={card.status} size="xs" />
            </div>
            <h3 className="text-base font-bold text-white">{card.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* Indirect Prompt Injection Defense Architecture */}
      <section className="rounded-2xl border border-violet-500/40 bg-violet-950/15 p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-violet-300">
            <ShieldCheck className="h-4 w-4 text-violet-400" />
            <span>DEFENDING AGAINST INDIRECT PROMPT INJECTION</span>
          </div>
          <StatusBadge status="IMPLEMENTED" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Why Deterministic Capability Enforcement Must Sit Outside the LLM
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          Any AI agent that reads untrusted network posts or emails is vulnerable to
          indirect prompt injection (e.g., hidden text instructing the model to read
          private keys or financial files and exfiltrate them). System prompts alone
          cannot solve this. In NEW NET, the Personal Pod Policy Gate verifies the agent’s
          cryptographic UCAN scope <strong>deterministically outside the LLM runtime</strong>.
          If a Literature Synthesis Agent only holds a token for{" "}
          <code className="text-emerald-300">/pod/workspace/papers</code>, any attempt to
          read <code className="text-rose-300">/pod/financial/tax-ledger.json</code> is
          cryptographically rejected at the storage boundary and logged to the Merkle Audit
          Trail.
        </p>

        <div className="pt-2">
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-semibold text-white transition"
          >
            <span>Trigger Live Prompt-Injection Firewall Test in Playground Lab 06</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
