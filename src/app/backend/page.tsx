import React from "react";
import Link from "next/link";
import { TECHNOLOGY_EVALUATIONS } from "@/lib/architecture-data";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Server,
  Database,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  ArrowRight,
  FileCode2,
} from "lucide-react";

const BACKEND_SERVICES = [
  {
    name: "API Gateway & Zod Boundary",
    route: "/api/*",
    status: "IMPLEMENTED" as const,
    role: "Validates every incoming request against strict TypeScript/Zod schemas, enforces structured error responses, and attaches adapter mode metadata.",
  },
  {
    name: "Cryptographic Identity Service",
    route: "/api/identity/create, /profile, /verify",
    status: "IMPLEMENTED" as const,
    role: "Generates real Web Crypto ECDSA P-256 keypairs, derives W3C did:key identifiers, and verifies Verifiable Credential signature proofs.",
  },
  {
    name: "UCAN Permission & Personal Pod Service",
    route: "/api/permissions, /grant, /revoke",
    status: "IMPLEMENTED" as const,
    role: "Issues cryptographically hashed capability tokens for specific Pod containers (/pod/social/*, /pod/workspace/*) and broadcasts revocation tombstones.",
  },
  {
    name: "Algorithm-Independent Discovery Service",
    route: "/api/feed, /api/feed/preferences",
    status: "IMPLEMENTED" as const,
    role: "Executes transparent multi-variable feed ranking across 5 selectable modes with user-defined weight sliders and Sybil/rage-bait filtering.",
  },
  {
    name: "Content Provenance & Integrity Verifier",
    route: "/api/content/verify, /api/content/history",
    status: "IMPLEMENTED" as const,
    role: "Computes SHA-256 CIDv1 digests, signs content payloads, verifies byte-level integrity against tampering, and tracks parent-child version DAGs.",
  },
  {
    name: "Sovereign Portable Archive Exporter",
    route: "/api/export",
    status: "IMPLEMENTED" as const,
    role: "Packages the user's complete DID Document, credentials, authored posts, permissions, and audit log into a portable JSON-LD or CARv2 manifest.",
  },
  {
    name: "Personal AI Sandbox Controller",
    route: "/api/agents, /api/agents/permissions",
    status: "IMPLEMENTED" as const,
    role: "Enforces out-of-context capability sandboxes for local-first AI agents, logs prompt-injection traps, and gates outbound actions on human signatures.",
  },
  {
    name: "Tamper-Evident Merkle Audit Logger",
    route: "/api/audit, /api/health",
    status: "IMPLEMENTED" as const,
    role: "Records every capability grant, revocation block, and agent policy trap with chained SHA-256 audit hashes.",
  },
];

export default function BackendInfrastructurePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
          <Server className="h-3.5 w-3.5" />
          <span>MODULE 04 • MODULAR BACKEND INFRASTRUCTURE &amp; TECH EVALUATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Backend Services, Persistence Honesty &amp; Protocol Stack
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          NEW NET’s backend is built with modular Next.js App Router Route Handlers,
          TypeScript, Zod schema validation, and the native Web Crypto API.
        </p>
      </div>

      {/* Persistence Adapter Honesty Box */}
      <section className="rounded-2xl border border-blue-500/40 bg-blue-950/20 p-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-blue-300">
            <Database className="h-4 w-4 text-blue-400" />
            <span>ARCHITECTURAL HONESTY: PERSISTENCE &amp; NETWORK ADAPTER BOUNDARY</span>
          </div>
          <StatusBadge status="IMPLEMENTED" />
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          <strong>We never pretend a mock or centralized database is decentralised infrastructure.</strong>{" "}
          When deployed on Vercel without external <code className="text-blue-300">SUPABASE_URL</code>{" "}
          credentials, our backend automatically runs in{" "}
          <code className="text-emerald-300">DEMONSTRATION_ADAPTER</code> mode. In this mode:
        </p>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-slate-300 pt-1">
          <li className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>100% Real Cryptography:</strong> ECDSA P-256 key generation, JWK
              exports, SHA-256 content addressing, and digital signature verification
              execute genuinely via Node.js 24 &amp; Browser Web Crypto APIs.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Clearly Labelled Network Simulation:</strong> Multi-region IPFS Kubo,
              Solid Pod, and Arweave replica states are simulated deterministically so
              visitors can test permissions, revocations, and exports safely without
              running a local P2P daemon.
            </span>
          </li>
        </ul>
      </section>

      {/* Modular Services Grid */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase text-blue-400">
              MODULAR SERVICE ARCHITECTURE
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              8 Core Backend Services (15 Active Route Handlers)
            </h2>
          </div>
          <Link
            href="/api-docs"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition"
          >
            <FileCode2 className="h-4 w-4" />
            <span>Execute Live Requests in API Docs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {BACKEND_SERVICES.map((svc) => (
            <div
              key={svc.name}
              className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white">{svc.name}</h3>
                <StatusBadge status={svc.status} size="xs" />
              </div>
              <div className="font-mono text-[11px] text-blue-400">{svc.route}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{svc.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Evaluation */}
      <section className="space-y-6">
        <div>
          <span className="font-mono text-xs uppercase text-violet-400">
            CRITICAL PROTOCOL &amp; TECHNOLOGY EVALUATION
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Evaluating Decentralised &amp; Cryptographic Technologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            No protocol is a silver bullet. Before incorporating Solid, IPFS, ActivityPub,
            libp2p, WebRTC, Web Crypto, DIDs, and MLS, we evaluate their suitability,
            limitations, alternatives, and security implications.
          </p>
        </div>

        <div className="space-y-4">
          {TECHNOLOGY_EVALUATIONS.map((tech) => (
            <div
              key={tech.name}
              className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-[10px] uppercase text-blue-400">
                    {tech.category}
                  </span>
                  <h3 className="text-base font-bold text-white">{tech.name}</h3>
                </div>
                <StatusBadge status={tech.status} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 text-xs">
                <div className="space-y-1">
                  <div className="font-mono text-[10px] uppercase text-slate-400">
                    Purpose &amp; Suitability
                  </div>
                  <p className="text-slate-200 leading-relaxed">{tech.purpose}</p>
                  <p className="text-emerald-400 text-[11px] pt-1">{tech.suitability}</p>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-[10px] uppercase text-amber-400">
                    Architectural Limitations
                  </div>
                  <p className="text-slate-300 leading-relaxed">{tech.limitations}</p>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-[10px] uppercase text-violet-400">
                    Evaluated Alternatives
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {tech.alternatives.map((alt) => (
                      <li key={alt} className="flex items-start gap-1.5">
                        <Cpu className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />
                        <span>{alt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-[10px] uppercase text-emerald-400">
                    Security Implications
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {tech.securityImplications}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
