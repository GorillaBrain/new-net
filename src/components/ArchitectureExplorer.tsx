"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
  Handle,
  Position,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ARCHITECTURE_NODES } from "@/lib/architecture-data";
import { ArchitectureNodeSpec, ImplementationStatus } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import {
  Layers,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Link2,
  Lock,
  ArrowRight,
  Info,
  Maximize2,
  Minimize2,
} from "lucide-react";

type DiagramModeId =
  | "high-level"
  | "backend-detailed"
  | "identity-auth"
  | "data-permission"
  | "app-interop"
  | "discovery-flow"
  | "content-verification"
  | "ai-agent-flow"
  | "security-boundary";

interface DiagramMode {
  id: DiagramModeId;
  number: string;
  title: string;
  subtitle: string;
  nodes: Node[];
  edges: Edge[];
}

function CustomArchNode({ data, selected }: NodeProps) {
  const specId = (data.specId as string) || "node-did-vault";
  const spec = ARCHITECTURE_NODES[specId] || ARCHITECTURE_NODES["node-did-vault"];
  const status = (data.status as ImplementationStatus) || spec.status;
  const stepBadge = data.stepBadge as string | undefined;

  return (
    <div
      className={`w-[270px] rounded-xl border p-3.5 transition-all shadow-xl ${
        selected
          ? "border-blue-400 bg-[#131c31] ring-2 ring-blue-500/40"
          : "border-slate-800 bg-[#0d111a]/95 hover:border-slate-600"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-400 !w-2.5 !h-2.5 !border-slate-900"
      />
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 truncate">
          {stepBadge || (data.layerLabel as string) || spec.layer}
        </span>
        <StatusBadge status={status} size="xs" />
      </div>
      <div className="font-semibold text-xs text-white leading-snug mb-1">
        {(data.title as string) || spec.label}
      </div>
      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
        {(data.subtitle as string) || spec.summary}
      </p>
      <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] font-mono text-slate-400">
        <span className="truncate max-w-[175px]">
          {spec.protocols[0] || "W3C / Open Spec"}
        </span>
        <span className="text-blue-400 flex items-center gap-0.5">
          Inspect <ArrowRight className="h-2.5 w-2.5" />
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-violet-400 !w-2.5 !h-2.5 !border-slate-900"
      />
    </div>
  );
}

const nodeTypes = {
  archNode: CustomArchNode,
};

const edgeDefault = {
  type: "smoothstep",
  animated: true,
  style: { stroke: "#3b82f6", strokeWidth: 1.8 },
  labelStyle: { fill: "#cbd5e1", fontSize: 10, fontFamily: "monospace" },
  labelBgStyle: { fill: "#0b0f19", fillOpacity: 0.9, stroke: "#1e293b" },
  labelBgPadding: [6, 3] as [number, number],
  labelBgBorderRadius: 4,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#3b82f6",
  },
};

const DIAGRAM_MODES: DiagramMode[] = [
  {
    id: "high-level",
    number: "01",
    title: "High-Level 7-Layer Architecture",
    subtitle:
      "Complete vertical topology from Layer 1 Self-Sovereign Identity to Layer 7 Personal AI & Layer 6 Zero-Trust Auditing.",
    nodes: [
      {
        id: "hl-1",
        type: "archNode",
        position: { x: 60, y: 30 },
        data: { specId: "node-did-vault", stepBadge: "LAYER 1 • IDENTITY" },
      },
      {
        id: "hl-2",
        type: "archNode",
        position: { x: 400, y: 30 },
        data: { specId: "node-vc-verifier", stepBadge: "LAYER 1 • CREDENTIALS" },
      },
      {
        id: "hl-3",
        type: "archNode",
        position: { x: 60, y: 200 },
        data: { specId: "node-personal-pod", stepBadge: "LAYER 2 • DATA SOVEREIGNTY" },
      },
      {
        id: "hl-4",
        type: "archNode",
        position: { x: 400, y: 200 },
        data: { specId: "node-ucan-engine", stepBadge: "LAYER 2 • CAPABILITY GATE" },
      },
      {
        id: "hl-5",
        type: "archNode",
        position: { x: 230, y: 370 },
        data: { specId: "node-p2p-mesh", stepBadge: "LAYER 3 • DECENTRALISED NETWORK" },
      },
      {
        id: "hl-6",
        type: "archNode",
        position: { x: 60, y: 540 },
        data: { specId: "node-interop-apps", stepBadge: "LAYER 4 • ECOSYSTEM APPS" },
      },
      {
        id: "hl-7",
        type: "archNode",
        position: { x: 400, y: 540 },
        data: { specId: "node-discovery-lens", stepBadge: "LAYER 5 • DISCOVERY LENS" },
      },
      {
        id: "hl-8",
        type: "archNode",
        position: { x: 740, y: 200 },
        data: { specId: "node-security-monitor", stepBadge: "LAYER 6 • SECURITY & AUDIT" },
      },
      {
        id: "hl-9",
        type: "archNode",
        position: { x: 740, y: 370 },
        data: { specId: "node-provenance-engine", stepBadge: "LAYER 5/6 • PROVENANCE" },
      },
      {
        id: "hl-10",
        type: "archNode",
        position: { x: 740, y: 540 },
        data: { specId: "node-personal-ai", stepBadge: "LAYER 7 • PERSONAL AI" },
      },
    ],
    edges: [
      { id: "e1", source: "hl-1", target: "hl-2", label: "W3C DID Auth", ...edgeDefault },
      { id: "e2", source: "hl-1", target: "hl-3", label: "Root Key Custody", ...edgeDefault },
      { id: "e3", source: "hl-1", target: "hl-4", label: "Signs UCANs", ...edgeDefault },
      { id: "e4", source: "hl-4", target: "hl-3", label: "Zero-Trust Policy Gate", ...edgeDefault },
      { id: "e5", source: "hl-3", target: "hl-5", label: "AES-256 + CID Blocks", ...edgeDefault },
      { id: "e6", source: "hl-5", target: "hl-6", label: "Open Lexicon Sync", ...edgeDefault },
      { id: "e7", source: "hl-5", target: "hl-7", label: "Public Signed Stream", ...edgeDefault },
      { id: "e8", source: "hl-9", target: "hl-7", label: "SHA-256 + C2PA Check", ...edgeDefault },
      { id: "e9", source: "hl-4", target: "hl-8", label: "Append Audit Hash", ...edgeDefault },
      { id: "e10", source: "hl-4", target: "hl-10", label: "Scoped Agent Token", ...edgeDefault },
    ],
  },
  {
    id: "backend-detailed",
    number: "02",
    title: "Detailed Backend Service Architecture",
    subtitle:
      "Next.js API Gateway routing through Zod schema validators, WebCrypto engines, UCAN policy guards, and persistence adapters.",
    nodes: [
      {
        id: "be-1",
        type: "archNode",
        position: { x: 350, y: 20 },
        data: {
          specId: "node-ucan-engine",
          stepBadge: "API GATEWAY + ZOD",
          title: "Next.js App Router API Gateway (15 Endpoints)",
          subtitle: "Strict Zod payload validation, authentication boundary, and structured JSON telemetry.",
        },
      },
      {
        id: "be-2",
        type: "archNode",
        position: { x: 40, y: 200 },
        data: {
          specId: "node-did-vault",
          stepBadge: "/api/identity/*",
          title: "Identity & WebCrypto Key Service",
          subtitle: "Generates ECDSA P-256 keypairs, derives did:key, and verifies VC proofs.",
        },
      },
      {
        id: "be-3",
        type: "archNode",
        position: { x: 350, y: 200 },
        data: {
          specId: "node-personal-pod",
          stepBadge: "/api/permissions/* & /api/export",
          title: "Personal Pod & UCAN Permission Service",
          subtitle: "Manages active grants, tombstones revocations, and builds portable JSON-LD/CAR bundles.",
        },
      },
      {
        id: "be-4",
        type: "archNode",
        position: { x: 660, y: 200 },
        data: {
          specId: "node-discovery-lens",
          stepBadge: "/api/feed & /api/content/*",
          title: "Discovery Ranking & Provenance Verifier",
          subtitle: "Scores feeds across 5 transparent modes and verifies SHA-256 content integrity.",
        },
      },
      {
        id: "be-5",
        type: "archNode",
        position: { x: 190, y: 400 },
        data: {
          specId: "node-personal-ai",
          stepBadge: "/api/agents/*",
          title: "Sovereign AI Sandbox Controller",
          subtitle: "Enforces local-first scopes, human-in-the-loop gates, and prompt-injection traps.",
        },
      },
      {
        id: "be-6",
        type: "archNode",
        position: { x: 520, y: 400 },
        data: {
          specId: "node-security-monitor",
          stepBadge: "/api/audit & ADAPTER",
          title: "Merkle Audit Logger & State Adapter",
          subtitle: "Chained SHA-256 audit log + clearly labelled Demonstration / PostgreSQL Adapter.",
        },
      },
    ],
    edges: [
      { id: "be-e1", source: "be-1", target: "be-2", label: "POST /identity/*", ...edgeDefault },
      { id: "be-e2", source: "be-1", target: "be-3", label: "GET/POST/DELETE /permissions", ...edgeDefault },
      { id: "be-e3", source: "be-1", target: "be-4", label: "GET /feed • POST /content/verify", ...edgeDefault },
      { id: "be-e4", source: "be-1", target: "be-5", label: "GET/POST /agents/*", ...edgeDefault },
      { id: "be-e5", source: "be-2", target: "be-6", label: "Audit Identity Event", ...edgeDefault },
      { id: "be-e6", source: "be-3", target: "be-6", label: "Audit Grant/Revoke", ...edgeDefault },
      { id: "be-e7", source: "be-5", target: "be-6", label: "Audit Agent Trap", ...edgeDefault },
    ],
  },
  {
    id: "identity-auth",
    number: "03",
    title: "Identity Creation & Authentication Flow",
    subtitle:
      "Passwordless cryptographic DID creation, selective disclosure Verifiable Credentials, and 3-of-5 Shamir social recovery.",
    nodes: [
      {
        id: "id-1",
        type: "archNode",
        position: { x: 60, y: 50 },
        data: {
          specId: "node-did-vault",
          stepBadge: "STEP 1 • KEYGEN",
          title: "WebCrypto ECDSA P-256 Key Generation",
          subtitle: "Browser/Device Secure Enclave generates non-extractable keypair locally.",
        },
      },
      {
        id: "id-2",
        type: "archNode",
        position: { x: 400, y: 50 },
        data: {
          specId: "node-did-vault",
          stepBadge: "STEP 2 • DID DOCUMENT",
          title: "W3C DID Derivation (did:key / did:plc)",
          subtitle: "Public JWK is hashed via SHA-256 into a self-certifying decentralized identifier.",
        },
      },
      {
        id: "id-3",
        type: "archNode",
        position: { x: 740, y: 50 },
        data: {
          specId: "node-vc-verifier",
          stepBadge: "STEP 3 • ATTESTATION",
          title: "Multi-Issuer Verifiable Credentials",
          subtitle: "Attach Proof-of-Personhood or Institutional VCs without exposing raw legal ID.",
        },
      },
      {
        id: "id-4",
        type: "archNode",
        position: { x: 230, y: 260 },
        data: {
          specId: "node-interop-apps",
          stepBadge: "STEP 4 • CHALLENGE AUTH",
          title: "Zero-Password Challenge-Response Login",
          subtitle: "Client signs a one-time cryptographic nonce; app verifies against DID public key.",
        },
      },
      {
        id: "id-5",
        type: "archNode",
        position: { x: 580, y: 260 },
        data: {
          specId: "node-security-monitor",
          stepBadge: "STEP 5 • RECOVERY QUORUM",
          title: "3-of-5 Social Shamir Guardian Recovery",
          subtitle: "If device is lost, 3 trusted guardians co-sign a time-locked key rotation certificate.",
        },
      },
    ],
    edges: [
      { id: "id-e1", source: "id-1", target: "id-2", label: "Public JWK Export", ...edgeDefault },
      { id: "id-e2", source: "id-2", target: "id-3", label: "Bind Subject DID", ...edgeDefault },
      { id: "id-e3", source: "id-2", target: "id-4", label: "Sign Challenge Nonce", ...edgeDefault },
      { id: "id-e4", source: "id-3", target: "id-4", label: "Selective Disclosure Proof", ...edgeDefault },
      { id: "id-e5", source: "id-2", target: "id-5", label: "Split Root Rotation Shards", ...edgeDefault },
    ],
  },
  {
    id: "data-permission",
    number: "04",
    title: "Personal-Data Permission & Revocation Flow",
    subtitle:
      "How applications request scoped UCAN capabilities, read encrypted Pod containers, and get blocked immediately upon revocation.",
    nodes: [
      {
        id: "dp-1",
        type: "archNode",
        position: { x: 50, y: 60 },
        data: {
          specId: "node-interop-apps",
          stepBadge: "STEP 1 • REQUEST",
          title: "Application Requests Scoped Access",
          subtitle: "e.g., Agora Social requests READ/WRITE on /pod/social/posts for 30 days.",
        },
      },
      {
        id: "dp-2",
        type: "archNode",
        position: { x: 380, y: 60 },
        data: {
          specId: "node-did-vault",
          stepBadge: "STEP 2 • USER CONSENT",
          title: "Sovereign Consent & UCAN Signing",
          subtitle: "User inspects exact path & purpose; signs capability token or rejects request.",
        },
      },
      {
        id: "dp-3",
        type: "archNode",
        position: { x: 710, y: 60 },
        data: {
          specId: "node-ucan-engine",
          stepBadge: "STEP 3 • POLICY GATE",
          title: "UCAN Capability Verification Gate",
          subtitle: "Verifies signature, scope match, TTL expiry, and checks revocation tombstone list.",
        },
      },
      {
        id: "dp-4",
        type: "archNode",
        position: { x: 220, y: 270 },
        data: {
          specId: "node-personal-pod",
          stepBadge: "STEP 4 • POD STORAGE",
          title: "Encrypted Personal Data Pod Slice",
          subtitle: "Decrypts only the permitted container (/pod/social/posts); financial/health stay locked.",
        },
      },
      {
        id: "dp-5",
        type: "archNode",
        position: { x: 560, y: 270 },
        data: {
          specId: "node-security-monitor",
          stepBadge: "STEP 5 • REVOCATION & AUDIT",
          title: "Instant Tombstone & Merkle Audit Trail",
          subtitle: "Revoking a grant broadcasts a cryptographic tombstone and logs REVOKED_BLOCK.",
        },
      },
    ],
    edges: [
      { id: "dp-e1", source: "dp-1", target: "dp-2", label: "Scope Manifest", ...edgeDefault },
      { id: "dp-e2", source: "dp-2", target: "dp-3", label: "Signed UCAN Token", ...edgeDefault },
      { id: "dp-e3", source: "dp-3", target: "dp-4", label: "Authorized Read/Write", ...edgeDefault },
      { id: "dp-e4", source: "dp-3", target: "dp-5", label: "Append Access Receipt", ...edgeDefault },
      { id: "dp-e5", source: "dp-2", target: "dp-5", label: "DELETE /permissions/revoke", ...edgeDefault },
    ],
  },
  {
    id: "app-interop",
    number: "05",
    title: "Application Interoperability Flow",
    subtitle:
      "Three independent applications operating over one user's portable identity and Personal Data Pod without platform lock-in.",
    nodes: [
      {
        id: "ai-1",
        type: "archNode",
        position: { x: 370, y: 20 },
        data: {
          specId: "node-personal-pod",
          stepBadge: "USER-OWNED CORE",
          title: "Unified Personal Data Pod + Root DID",
          subtitle: "Single source of identity, social graph, reputation credentials, and documents.",
        },
      },
      {
        id: "ai-2",
        type: "archNode",
        position: { x: 40, y: 240 },
        data: {
          specId: "node-interop-apps",
          stepBadge: "CLIENT APP A • SOCIAL",
          title: "Agora Social (ActivityStreams 2.0)",
          subtitle: "Reads/writes /pod/social/posts. Zero lock-in: followers belong to your DID.",
        },
      },
      {
        id: "ai-3",
        type: "archNode",
        position: { x: 370, y: 240 },
        data: {
          specId: "node-interop-apps",
          stepBadge: "CLIENT APP B • COMMERCE",
          title: "Commons Co-op Marketplace",
          subtitle: "Verifies peer reputation VCs from /pod/credentials/reputation without middleman fees.",
        },
      },
      {
        id: "ai-4",
        type: "archNode",
        position: { x: 700, y: 240 },
        data: {
          specId: "node-interop-apps",
          stepBadge: "CLIENT APP C • WORKSPACE",
          title: "Guild Collaborative Workspace",
          subtitle: "Co-edits research papers in /pod/workspace/papers via Automerge CRDTs.",
        },
      },
    ],
    edges: [
      { id: "ai-e1", source: "ai-1", target: "ai-2", label: "UCAN: /pod/social/*", ...edgeDefault },
      { id: "ai-e2", source: "ai-1", target: "ai-3", label: "UCAN: /pod/credentials/*", ...edgeDefault },
      { id: "ai-e3", source: "ai-1", target: "ai-4", label: "UCAN: /pod/workspace/*", ...edgeDefault },
    ],
  },
  {
    id: "discovery-flow",
    number: "06",
    title: "Information Discovery & Anti-Rage-Bait Flow",
    subtitle:
      "How NEW NET decouples relay storage from algorithmic ranking so users control their own discovery lens.",
    nodes: [
      {
        id: "df-1",
        type: "archNode",
        position: { x: 50, y: 70 },
        data: {
          specId: "node-p2p-mesh",
          stepBadge: "STAGE 1 • RELAY INGRESS",
          title: "Signed Content Stream (Unranked)",
          subtitle: "Community relays store and forward signed CID objects without opaque boosting.",
        },
      },
      {
        id: "df-2",
        type: "archNode",
        position: { x: 380, y: 70 },
        data: {
          specId: "node-vc-verifier",
          stepBadge: "STAGE 2 • ENTITY FILTER",
          title: "Entity & Sybil Transparency Gate",
          subtitle: "Classifies HUMAN, DECLARED_AI_AGENT, ORGANISATION, or filters SUSPICIOUS_AUTOMATION.",
        },
      },
      {
        id: "df-3",
        type: "archNode",
        position: { x: 710, y: 70 },
        data: {
          specId: "node-discovery-lens",
          stepBadge: "STAGE 3 • USER RANKING LENS",
          title: "User-Selected Ranking Engine",
          subtitle: "Switch live between Chronological, Citation Relevance, Community Trust, or Custom Sliders.",
        },
      },
      {
        id: "df-4",
        type: "archNode",
        position: { x: 380, y: 270 },
        data: {
          specId: "node-interop-apps",
          stepBadge: "STAGE 4 • TRANSPARENT UI",
          title: "Explainable Feed Presentation",
          subtitle: "Every post displays its exact ranking formula breakdown and provenance badge.",
        },
      },
    ],
    edges: [
      { id: "df-e1", source: "df-1", target: "df-2", label: "Raw Signed Posts", ...edgeDefault },
      { id: "df-e2", source: "df-2", target: "df-3", label: "Attested Candidates", ...edgeDefault },
      { id: "df-e3", source: "df-3", target: "df-4", label: "Transparent Score + Breakdown", ...edgeDefault },
    ],
  },
  {
    id: "content-verification",
    number: "07",
    title: "Content Provenance & Integrity Verification Flow",
    subtitle:
      "End-to-end cryptographic verification from author signing and CIDv1 hashing to client tamper detection.",
    nodes: [
      {
        id: "cv-1",
        type: "archNode",
        position: { x: 50, y: 60 },
        data: {
          specId: "node-did-vault",
          stepBadge: "STEP 1 • AUTHOR SIGNING",
          title: "Author Canonicalizes & Signs Payload",
          subtitle: "Computes SHA-256 digest and signs with ECDSA P-256 private key + AI disclosure tag.",
        },
      },
      {
        id: "cv-2",
        type: "archNode",
        position: { x: 380, y: 60 },
        data: {
          specId: "node-p2p-mesh",
          stepBadge: "STEP 2 • CID ADDRESSING",
          title: "Content-Addressed DAG Version (CIDv1)",
          subtitle: "Derives immutable bafybeig... CID and links parent version CID for edit lineage.",
        },
      },
      {
        id: "cv-3",
        type: "archNode",
        position: { x: 710, y: 60 },
        data: {
          specId: "node-provenance-engine",
          stepBadge: "STEP 3 • CLIENT VERIFIER",
          title: "Client Re-Hashes & Verifies Signature",
          subtitle: "If a single byte is modified in transit, SHA-256 mismatch triggers Tamper Alert.",
        },
      },
      {
        id: "cv-4",
        type: "archNode",
        position: { x: 380, y: 260 },
        data: {
          specId: "node-discovery-lens",
          stepBadge: "STEP 4 • EPISTEMIC BOUNDARY",
          title: "Authenticity vs. Factual Accuracy Separation",
          subtitle: "UI confirms 'Authentic Signature from Author X' while showing community context notes.",
        },
      },
    ],
    edges: [
      { id: "cv-e1", source: "cv-1", target: "cv-2", label: "Payload + ECDSA Sig", ...edgeDefault },
      { id: "cv-e2", source: "cv-2", target: "cv-3", label: "CID Block Transfer", ...edgeDefault },
      { id: "cv-e3", source: "cv-3", target: "cv-4", label: "Verified Provenance", ...edgeDefault },
    ],
  },
  {
    id: "ai-agent-flow",
    number: "08",
    title: "Personal AI-Agent Permission & Firewall Flow",
    subtitle:
      "How sovereign Personal AI agents execute locally under UCAN capability sandboxes and human-in-the-loop approval gates.",
    nodes: [
      {
        id: "ag-1",
        type: "archNode",
        position: { x: 50, y: 60 },
        data: {
          specId: "node-did-vault",
          stepBadge: "STEP 1 • DELEGATION",
          title: "Human Principal Delegates Agent DID",
          subtitle: "Issues DeclaredAiAgentDelegation VC binding the agent to its human owner.",
        },
      },
      {
        id: "ag-2",
        type: "archNode",
        position: { x: 380, y: 60 },
        data: {
          specId: "node-personal-ai",
          stepBadge: "STEP 2 • LOCAL INFERENCE",
          title: "Local-First Personal AI Runtime",
          subtitle: "Runs on-device (WebGPU / local weights) so sensitive Pod data never leaves user hardware.",
        },
      },
      {
        id: "ag-3",
        type: "archNode",
        position: { x: 710, y: 60 },
        data: {
          specId: "node-ucan-engine",
          stepBadge: "STEP 3 • OUT-OF-CONTEXT FIREWALL",
          title: "Deterministic Capability Sandbox",
          subtitle: "Blocks prompt-injected attempts to read ungranted paths (e.g., /pod/financial/*).",
        },
      },
      {
        id: "ag-4",
        type: "archNode",
        position: { x: 380, y: 260 },
        data: {
          specId: "node-security-monitor",
          stepBadge: "STEP 4 • HUMAN APPROVAL GATE",
          title: "Mandatory Human Counter-Signature & Kill-Switch",
          subtitle: "Outbound broadcasts pause for human signature; one-click kill-switch revokes agent.",
        },
      },
    ],
    edges: [
      { id: "ag-e1", source: "ag-1", target: "ag-2", label: "Scoped Agent UCAN", ...edgeDefault },
      { id: "ag-e2", source: "ag-2", target: "ag-3", label: "Pod Read/Append Request", ...edgeDefault },
      { id: "ag-e3", source: "ag-3", target: "ag-4", label: "High-Impact Action Trap", ...edgeDefault },
    ],
  },
  {
    id: "security-boundary",
    number: "09",
    title: "Security & Threat-Boundary Diagram",
    subtitle:
      "Zero-trust cryptographic boundaries separating the trusted client enclave from untrusted relays and third-party apps.",
    nodes: [
      {
        id: "sb-1",
        type: "archNode",
        position: { x: 50, y: 50 },
        data: {
          specId: "node-did-vault",
          stepBadge: "TRUST ZONE A • HARDWARE ENCLAVE",
          title: "Trusted User Device & Key Vault",
          subtitle: "Plaintext private keys and decryption keys exist ONLY inside this boundary.",
        },
      },
      {
        id: "sb-2",
        type: "archNode",
        position: { x: 380, y: 50 },
        data: {
          specId: "node-ucan-engine",
          stepBadge: "BOUNDARY GATE • ZERO TRUST",
          title: "Cryptographic Policy & Envelope Encryption",
          subtitle: "Encrypts Pod blocks (AES-256-GCM) and verifies every incoming UCAN signature.",
        },
      },
      {
        id: "sb-3",
        type: "archNode",
        position: { x: 710, y: 50 },
        data: {
          specId: "node-p2p-mesh",
          stepBadge: "UNTRUSTED ZONE • PUBLIC MESH",
          title: "Untrusted Relay & Archival Nodes",
          subtitle: "Relays only transport signed CIDs and encrypted blobs; tampering is immediately detected.",
        },
      },
      {
        id: "sb-4",
        type: "archNode",
        position: { x: 220, y: 260 },
        data: {
          specId: "node-interop-apps",
          stepBadge: "SANDBOXED ZONE • 3RD-PARTY APPS",
          title: "Sandboxed Client Applications",
          subtitle: "Isolated to specific Pod slices; cannot escalate privileges or read root keys.",
        },
      },
      {
        id: "sb-5",
        type: "archNode",
        position: { x: 560, y: 260 },
        data: {
          specId: "node-security-monitor",
          stepBadge: "AUDIT ZONE • MERKLE LOG",
          title: "Tamper-Evident Security Monitor",
          subtitle: "Records every boundary crossing, Sybil anomaly, and blocked capability violation.",
        },
      },
    ],
    edges: [
      { id: "sb-e1", source: "sb-1", target: "sb-2", label: "Signed Capabilities + DEKs", ...edgeDefault },
      { id: "sb-e2", source: "sb-2", target: "sb-3", label: "Ciphertext + Signed CIDs Only", ...edgeDefault },
      { id: "sb-e3", source: "sb-2", target: "sb-4", label: "Least-Privilege Slice", ...edgeDefault },
      { id: "sb-e4", source: "sb-2", target: "sb-5", label: "Hash-Chained Telemetry", ...edgeDefault },
    ],
  },
];

export function ArchitectureExplorer({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [activeModeId, setActiveModeId] = useState<DiagramModeId>("high-level");
  const [selectedSpecId, setSelectedSpecId] = useState<string>("node-did-vault");
  const [expandedCanvas, setExpandedCanvas] = useState<boolean>(false);

  const activeDiagram = useMemo(
    () => DIAGRAM_MODES.find((d) => d.id === activeModeId) || DIAGRAM_MODES[0],
    [activeModeId]
  );

  const selectedSpec: ArchitectureNodeSpec =
    ARCHITECTURE_NODES[selectedSpecId] || ARCHITECTURE_NODES["node-did-vault"];

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const specId = (node.data?.specId as string) || "node-did-vault";
    setSelectedSpecId(specId);
  }, []);

  const nodesWithSelection = useMemo(
    () =>
      activeDiagram.nodes.map((n) => ({
        ...n,
        selected: n.data.specId === selectedSpecId,
      })),
    [activeDiagram, selectedSpecId]
  );

  return (
    <div className="space-y-6">
      {/* Diagram Selector Bar */}
      <div className="rounded-xl border border-slate-800 bg-[#0b0f19]/90 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              Select Interactive Architecture Flow ({DIAGRAM_MODES.length} Diagrams)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setExpandedCanvas(!expandedCanvas)}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-mono text-slate-300 hover:border-blue-500/50 hover:text-white"
          >
            {expandedCanvas ? (
              <>
                <Minimize2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Standard Height</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Expand Canvas</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {DIAGRAM_MODES.map((mode) => {
            const active = mode.id === activeModeId;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveModeId(mode.id);
                  const firstSpec = mode.nodes[0]?.data?.specId as string | undefined;
                  if (firstSpec) setSelectedSpecId(firstSpec);
                }}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition ${
                  active
                    ? "border-blue-500/60 bg-blue-500/15 text-white shadow-sm"
                    : "border-slate-800/80 bg-[#07090e]/70 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="font-mono text-[11px] font-bold text-blue-400">
                  {mode.number}
                </span>
                <span className="text-xs font-medium truncate">{mode.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas + Deep Component Inspector Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* React Flow Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col rounded-xl border border-slate-800 bg-[#070a12] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#0b0f19] px-4 py-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-300">
                  DIAGRAM {activeDiagram.number}
                </span>
                <h3 className="text-sm font-semibold text-white">
                  {activeDiagram.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{activeDiagram.subtitle}</p>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              Click any node to inspect specs • Drag/Zoom enabled
            </span>
          </div>

          <div
            className={`w-full ${
              expandedCanvas
                ? "h-[740px]"
                : compact
                ? "h-[520px]"
                : "h-[620px]"
            }`}
          >
            <ReactFlow
              key={activeDiagram.id}
              nodes={nodesWithSelection}
              edges={activeDiagram.edges}
              nodeTypes={nodeTypes}
              onNodeClick={onNodeClick}
              fitView
              fitViewOptions={{ padding: 0.18 }}
              minZoom={0.35}
              maxZoom={1.6}
              proOptions={{ hideAttribution: false }}
            >
              <Background color="#1e293b" gap={24} size={1} />
              <Controls position="bottom-right" />
              <MiniMap
                position="bottom-left"
                nodeColor={() => "#3b82f6"}
                maskColor="rgba(7, 9, 14, 0.75)"
                style={{
                  backgroundColor: "#0b0f19",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                }}
              />
            </ReactFlow>
          </div>

          {/* Quick Node Switcher Pills */}
          <div className="border-t border-slate-800 bg-[#0b0f19] px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
            <span className="font-mono text-[10px] uppercase text-slate-400 shrink-0">
              Quick Inspect:
            </span>
            {Object.values(ARCHITECTURE_NODES).map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedSpecId(node.id)}
                className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[10px] transition ${
                  selectedSpecId === node.id
                    ? "border-blue-400 bg-blue-500/20 text-blue-200"
                    : "border-slate-800 bg-slate-900/70 text-slate-400 hover:text-white"
                }`}
              >
                {node.label.split("(")[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Component Specification Inspector Panel */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-blue-400">
                  {selectedSpec.layer}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {selectedSpec.label}
                </h3>
              </div>
              <StatusBadge status={selectedSpec.status} />
            </div>

            {/* 1. Purpose */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-200">
                <Info className="h-3.5 w-3.5 text-blue-400" />
                <span>1. Architectural Purpose</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {selectedSpec.purpose}
              </p>
            </div>

            {/* 2. Technical Implementation */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-200">
                <Cpu className="h-3.5 w-3.5 text-violet-400" />
                <span>2. Technical Implementation</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                {selectedSpec.technicalImplementation}
              </p>
            </div>

            {/* 3. Dependencies & Protocols */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-800/90 bg-[#07090e] p-2.5">
                <div className="font-mono text-[10px] uppercase text-slate-400 mb-1.5">
                  3. Dependencies
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {selectedSpec.dependencies.map((dep) => (
                    <li key={dep} className="flex items-start gap-1.5">
                      <span className="text-blue-400">•</span>
                      <span>{dep}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-slate-800/90 bg-[#07090e] p-2.5">
                <div className="font-mono text-[10px] uppercase text-slate-400 mb-1.5">
                  Open Protocols
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedSpec.protocols.map((proto) => (
                    <span
                      key={proto}
                      className="rounded border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 font-mono text-[10px] text-blue-300"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Security Considerations */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>4. Security Considerations</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedSpec.securityConsiderations.map((sec) => (
                  <li key={sec} className="flex items-start gap-1.5">
                    <Lock className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Known Limitations */}
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-300">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>5. Architectural Limitations &amp; Trade-Offs</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedSpec.limitations.map((lim) => (
                  <li key={lim} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. Inter-Component Communications */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-200">
                <Link2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>6. Component Communication Channels</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedSpec.communications.map((comm) => (
                  <li key={comm} className="flex items-start gap-1.5">
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{comm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
