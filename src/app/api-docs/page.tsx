"use client";

import React, { useState } from "react";
import {
  FileCode2,
  Play,
  Shield,
  Lock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface ApiEndpointDoc {
  id: string;
  method: "GET" | "POST" | "DELETE";
  path: string;
  layer: string;
  description: string;
  authRequirement: string;
  permissionRequirement: string;
  parameters: { name: string; type: string; required: boolean; desc: string }[];
  defaultBody?: Record<string, unknown>;
  exampleResponse: Record<string, unknown>;
  errorResponses: { code: number; error: string; condition: string }[];
  securityConsiderations: string;
}

const API_ENDPOINTS: ApiEndpointDoc[] = [
  {
    id: "ep-health",
    method: "GET",
    path: "/api/health",
    layer: "Gateway & Telemetry",
    description:
      "Returns gateway operational health, active persistence adapter mode (DEMONSTRATION_ADAPTER vs SUPABASE_POSTGRES_ADAPTER), and live counts across all 7 NEW NET layers.",
    authRequirement: "Public Telemetry Endpoint (None)",
    permissionRequirement: "READ /system/health (Public)",
    parameters: [],
    exampleResponse: {
      ok: true,
      service: "NEW NET Reference Architecture Gateway",
      persistence: { mode: "DEMONSTRATION_ADAPTER" },
    },
    errorResponses: [{ code: 500, error: "INTERNAL_ERROR", condition: "Subsystem probe failure" }],
    securityConsiderations:
      "Never exposes environment secrets or private key material; explicitly discloses whether persistence is running in demonstration or production database mode.",
  },
  {
    id: "ep-id-create",
    method: "POST",
    path: "/api/identity/create",
    layer: "Layer 1: Digital Identity",
    description:
      "Generates a real ECDSA P-256 cryptographic keypair via Web Crypto API, derives a self-certifying W3C did:key identifier, and issues an initial self-signed Verifiable Credential.",
    authRequirement: "Client Keygen Ceremony",
    permissionRequirement: "CREATE /identity/vault/root",
    parameters: [
      { name: "displayName", type: "string", required: true, desc: "Human or agent display name (2–80 chars)" },
      { name: "handle", type: "string", required: true, desc: "Portable network handle" },
      { name: "entityType", type: "'HUMAN' | 'DECLARED_AI_AGENT' | 'ORGANISATION'", required: false, desc: "Declared entity taxonomy" },
      { name: "recoveryMethod", type: "string", required: false, desc: "Shamir 3-of-5, hardware passkey, or vault" },
    ],
    defaultBody: {
      displayName: "Dr. Aris Thorne",
      handle: "aris.commons.net",
      entityType: "HUMAN",
      recoveryMethod: "social-shamir-3-of-5",
    },
    exampleResponse: {
      ok: true,
      identity: {
        did: "did:key:zDnaer...",
        publicKeyFingerprint: "8F4A92C1E7B03D65",
        entityType: "HUMAN",
      },
    },
    errorResponses: [
      { code: 400, error: "VALIDATION_ERROR", condition: "Missing or invalid Zod schema fields" },
    ],
    securityConsiderations:
      "In production clients, private keys remain inside non-extractable WebAuthn/IndexedDB storage handles and never traverse the network.",
  },
  {
    id: "ep-id-profile",
    method: "GET",
    path: "/api/identity/profile",
    layer: "Layer 1: Digital Identity",
    description:
      "Retrieves the active self-sovereign identity profile, selective disclosure attributes, attached Verifiable Credentials, and connected interoperable applications.",
    authRequirement: "DID Resolution (Public / Scoped)",
    permissionRequirement: "READ /pod/profile/public",
    parameters: [
      { name: "did", type: "query string (optional)", required: false, desc: "Target DID to resolve; defaults to active profile" },
    ],
    exampleResponse: {
      ok: true,
      activeProfile: {
        did: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
        handle: "elena.sovereign.net",
      },
    },
    errorResponses: [{ code: 404, error: "NOT_FOUND", condition: "Requested DID not found" }],
    securityConsiderations:
      "Selective disclosure fields marked `disclosedByDefault: false` remain redacted inside the encrypted Personal Data Pod.",
  },
  {
    id: "ep-id-verify",
    method: "POST",
    path: "/api/identity/verify",
    layer: "Layer 1 & 6: Identity & Trust",
    description:
      "Verifies a DID's cryptographic key continuity, challenge nonce digest, and attached Proof-of-Personhood or Declared-AI-Agent Verifiable Credentials.",
    authRequirement: "Signed Challenge Nonce",
    permissionRequirement: "VERIFY /identity/attestations",
    parameters: [
      { name: "did", type: "string", required: true, desc: "DID to verify" },
      { name: "challengeNonce", type: "string", required: false, desc: "Anti-replay cryptographic nonce" },
    ],
    defaultBody: {
      did: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
      challengeNonce: "newnet-verify-challenge-991",
    },
    exampleResponse: {
      ok: true,
      verified: true,
      entityType: "HUMAN",
      cryptographicCheck: { keyContinuityVerified: true, personhoodAttested: true },
    },
    errorResponses: [{ code: 400, error: "VALIDATION_ERROR", condition: "Malformed DID string" }],
    securityConsiderations:
      "Explicitly flags accounts that possess valid cryptographic keys but lack Web-of-Trust human attestations (`SUSPICIOUS_AUTOMATION`).",
  },
  {
    id: "ep-perm-list",
    method: "GET",
    path: "/api/permissions",
    layer: "Layer 2: Personal Data Sovereignty",
    description:
      "Lists all active, rejected, and revoked UCAN capability grants alongside the user's encrypted Personal Data Pod container inventory.",
    authRequirement: "Pod Owner DID Signature",
    permissionRequirement: "READ /pod/permissions/manifest",
    parameters: [],
    exampleResponse: {
      ok: true,
      subjectDid: "did:key:zDnaer...",
      permissions: [{ id: "perm-001", resourcePath: "/pod/social/posts", status: "ACTIVE" }],
    },
    errorResponses: [{ code: 401, error: "UNAUTHORIZED", condition: "Invalid Pod owner signature" }],
    securityConsiderations:
      "Provides complete visibility into every application and AI agent holding capability tokens.",
  },
  {
    id: "ep-perm-grant",
    method: "POST",
    path: "/api/permissions/grant",
    layer: "Layer 2: Personal Data Sovereignty",
    description:
      "Grants or rejects a fine-grained UCAN capability request for a specific Personal Data Pod path and logs the cryptographic receipt to the Merkle Audit Log.",
    authRequirement: "Interactive Human Principal Consent",
    permissionRequirement: "ISSUE /pod/permissions/ucan",
    parameters: [
      { name: "granteeId", type: "string", required: true, desc: "Identifier of requesting app or agent" },
      { name: "granteeName", type: "string", required: true, desc: "Human-readable name of requester" },
      { name: "resourcePath", type: "string", required: true, desc: "Must start with /pod/ (e.g., /pod/workspace/papers)" },
      { name: "scopes", type: "string[]", required: true, desc: "Array of READ, WRITE, APPEND, DECRYPT, SIGN_ON_BEHALF" },
      { name: "purpose", type: "string", required: true, desc: "Declared purpose for audit log" },
      { name: "decision", type: "'GRANT' | 'REJECT'", required: false, desc: "Approve or deny capability" },
    ],
    defaultBody: {
      granteeId: "app-helix-research",
      granteeName: "Helix Peer Review Client",
      granteeType: "APPLICATION",
      resourcePath: "/pod/workspace/papers",
      resourceLabel: "Research Drafts Container",
      scopes: ["READ"],
      purpose: "Verify bibliography citations",
      decision: "GRANT",
      ttlHours: 168,
    },
    exampleResponse: {
      ok: true,
      permission: { id: "perm-901", status: "ACTIVE", cryptographicCapabilityHash: "ucan_sha256_..." },
    },
    errorResponses: [
      { code: 400, error: "VALIDATION_ERROR", condition: "Resource path outside /pod/* or empty scopes" },
    ],
    securityConsiderations:
      "Enforces Principle of Least Privilege: capabilities are path-scoped and time-bounded.",
  },
  {
    id: "ep-perm-revoke",
    method: "DELETE",
    path: "/api/permissions/revoke",
    layer: "Layer 2: Personal Data Sovereignty",
    description:
      "Revokes an active UCAN capability grant immediately, generates a SHA-256 revocation tombstone, and records a REVOKED_BLOCK entry in the audit trail.",
    authRequirement: "Pod Owner DID Signature",
    permissionRequirement: "REVOKE /pod/permissions/ucan",
    parameters: [
      { name: "permissionId", type: "string", required: true, desc: "ID of permission to revoke (e.g., perm-001)" },
      { name: "reason", type: "string", required: false, desc: "Audit log reason" },
    ],
    defaultBody: {
      permissionId: "perm-002",
      reason: "User revoked marketplace access after transaction completion.",
    },
    exampleResponse: {
      ok: true,
      revokedPermission: { id: "perm-002", status: "REVOKED" },
      revocationTombstoneHash: "9f8e7d6c...",
    },
    errorResponses: [{ code: 404, error: "NOT_FOUND", condition: "Permission ID does not exist" }],
    securityConsiderations:
      "Subsequent read attempts using a revoked token are deterministically rejected at the Pod Policy Gate.",
  },
  {
    id: "ep-feed-get",
    method: "GET",
    path: "/api/feed",
    layer: "Layer 5: Information & Discovery",
    description:
      "Returns content-addressed posts ranked transparently according to the user's active discovery lens, including exact mathematical score breakdowns.",
    authRequirement: "Optional (Public Commons Stream)",
    permissionRequirement: "READ /network/commons/feed",
    parameters: [
      { name: "mode", type: "query string (optional)", required: false, desc: "Override ranking mode (CHRONOLOGICAL, RELEVANCE, etc.)" },
    ],
    exampleResponse: {
      ok: true,
      activePreferences: { mode: "RELEVANCE" },
      visiblePosts: 4,
      filteredPostsCount: 1,
    },
    errorResponses: [{ code: 500, error: "INTERNAL_ERROR", condition: "Ranking engine error" }],
    securityConsiderations:
      "Filters out unverified automation and high rage-bait clusters unless explicitly disabled by the user.",
  },
  {
    id: "ep-feed-prefs",
    method: "POST",
    path: "/api/feed/preferences",
    layer: "Layer 5: Information & Discovery",
    description:
      "Updates the user's portable algorithm preferences (mode, 5 mathematical weight sliders, and safety filters) and returns the newly re-ranked feed.",
    authRequirement: "Pod Owner Signature",
    permissionRequirement: "WRITE /pod/preferences/discovery",
    parameters: [
      { name: "mode", type: "enum", required: false, desc: "CHRONOLOGICAL | RELEVANCE | COMMUNITY_CURATED | USER_DEFINED | ENGAGEMENT_SURVEILLANCE_SIMULATION" },
      { name: "weights", type: "object", required: false, desc: "0–100 sliders for recency, citationsAndProvenance, communityTrust, topicAffinity, sensationalismPenalty" },
      { name: "hideUnverifiedAi", type: "boolean", required: false, desc: "Filter unattested bot accounts" },
    ],
    defaultBody: {
      mode: "USER_DEFINED",
      weights: {
        recency: 80,
        citationsAndProvenance: 100,
        communityTrust: 90,
        topicAffinity: 75,
        sensationalismPenalty: 95,
      },
      hideUnverifiedAi: true,
      hideRageBaitClusters: true,
    },
    exampleResponse: {
      ok: true,
      preferences: { mode: "USER_DEFINED" },
    },
    errorResponses: [{ code: 400, error: "VALIDATION_ERROR", condition: "Weight outside 0–100 range" }],
    securityConsiderations:
      "Discovery preferences are stored as portable JSON in the user's Pod so no platform can lock in their feed settings.",
  },
  {
    id: "ep-content-verify",
    method: "POST",
    path: "/api/content/verify",
    layer: "Layer 5 & 6: Provenance & Integrity",
    description:
      "Computes real SHA-256 CIDv1 content identifiers, signs payloads with WebCrypto ECDSA/attestation keys, and verifies byte-level integrity against tampering.",
    authRequirement: "Author DID Key (for signing) / Public (for verification)",
    permissionRequirement: "EXECUTE /provenance/verifier",
    parameters: [
      { name: "action", type: "'SIGN_AND_HASH' | 'VERIFY_INTEGRITY'", required: true, desc: "Sign new content or verify existing payload" },
      { name: "content", type: "string", required: true, desc: "Text or canonical JSON-LD payload" },
      { name: "expectedSha256", type: "string", required: false, desc: "Expected SHA-256 hex digest for tamper check" },
    ],
    defaultBody: {
      action: "SIGN_AND_HASH",
      content: "Verifiable research note: Decentralised identifiers eliminate centralized OAuth single points of failure.",
      aiGenerationDisclosure: "NONE",
    },
    exampleResponse: {
      ok: true,
      cid: "bafybeig...",
      contentSha256: "a1b2c3...",
      epistemicDistinctionNote: "Proves authenticity & integrity, not factual accuracy.",
    },
    errorResponses: [{ code: 400, error: "VALIDATION_ERROR", condition: "Empty content payload" }],
    securityConsiderations:
      "Detects single-byte modifications immediately via SHA-256 digest comparison.",
  },
  {
    id: "ep-content-history",
    method: "GET",
    path: "/api/content/history",
    layer: "Layer 3 & 5: Preservation & Lineage",
    description:
      "Returns the immutable parent-child CID version history DAG and multi-region archival replica status (IPFS, Solid, Arweave, Local Mesh) for published content.",
    authRequirement: "Public Provenance Resolution",
    permissionRequirement: "READ /network/provenance/dag",
    parameters: [
      { name: "postId", type: "query string (optional)", required: false, desc: "Post ID or CID to inspect" },
    ],
    exampleResponse: {
      ok: true,
      postId: "post-001",
      versionHistory: [{ version: 1 }, { version: 2 }],
      replicas: [{ nodeId: "node-zurich-eth-01", status: "PINNED" }],
    },
    errorResponses: [{ code: 404, error: "NOT_FOUND", condition: "Unknown CID" }],
    securityConsiderations:
      "Prevents silent retroactive editing of historical records.",
  },
  {
    id: "ep-export",
    method: "POST",
    path: "/api/export",
    layer: "Layer 2 & 3: Data Portability & Preservation",
    description:
      "Exports a signed, content-addressed JSON-LD or CARv2 portable archive containing the user's DID, credentials, authored posts, permissions, and audit trail.",
    authRequirement: "Pod Owner DID Signature",
    permissionRequirement: "EXPORT /pod/export/full-snapshot",
    parameters: [
      { name: "format", type: "'JSON_LD_PORTABLE_BUNDLE' | 'CAR_V2_MANIFEST'", required: false, desc: "Export serialization format" },
      { name: "includeAuditLog", type: "boolean", required: false, desc: "Include Merkle audit receipts" },
    ],
    defaultBody: {
      format: "JSON_LD_PORTABLE_BUNDLE",
      includeAuditLog: true,
      includePermissions: true,
    },
    exampleResponse: {
      ok: true,
      archiveCid: "bafybeig...",
      byteSize: 14820,
    },
    errorResponses: [{ code: 400, error: "VALIDATION_ERROR", condition: "Invalid export format" }],
    securityConsiderations:
      "Guarantees zero platform lock-in: users can migrate their entire digital life to any compliant Pod host at any time.",
  },
  {
    id: "ep-audit",
    method: "GET",
    path: "/api/audit",
    layer: "Layer 6: Security & Trust",
    description:
      "Retrieves the tamper-evident Merkle Audit Log recording every capability grant, revocation block, unauthorized telemetry probe, and AI agent trap.",
    authRequirement: "Pod Owner / Security Auditor",
    permissionRequirement: "READ /pod/audit/logs",
    parameters: [
      { name: "decision", type: "query string (optional)", required: false, desc: "Filter by ALLOWED, DENIED, REVOKED_BLOCK, or HUMAN_APPROVAL_REQUIRED" },
    ],
    exampleResponse: {
      ok: true,
      totalEntries: 6,
      summary: { allowed: 2, denied: 2, revokedBlocks: 1, humanApprovalRequired: 1 },
    },
    errorResponses: [{ code: 500, error: "INTERNAL_ERROR", condition: "Log store error" }],
    securityConsiderations:
      "Each log entry carries a SHA-256 `auditHash` to prevent silent log tampering.",
  },
  {
    id: "ep-agents-list",
    method: "GET",
    path: "/api/agents",
    layer: "Layer 7: Personal AI",
    description:
      "Lists all registered Personal AI Agents, their delegated Agent DIDs, execution mode (LOCAL_ON_DEVICE vs FEDERATED_ENCLAVE), allowed Pod scopes, and activity logs.",
    authRequirement: "Human Principal DID",
    permissionRequirement: "READ /agents/registry",
    parameters: [],
    exampleResponse: {
      ok: true,
      agents: [{ id: "agent-atlas-synthesizer", status: "ACTIVE", executionMode: "LOCAL_ON_DEVICE" }],
    },
    errorResponses: [{ code: 500, error: "INTERNAL_ERROR", condition: "Agent registry error" }],
    securityConsiderations:
      "Ensures every AI agent operating over user data is explicitly declared and bound to a human principal.",
  },
  {
    id: "ep-agents-perms",
    method: "POST",
    path: "/api/agents/permissions",
    layer: "Layer 7: Personal AI",
    description:
      "Controls Personal AI Agent sandboxes: pause/resume execution, countersign pending human-approval tasks, simulate indirect prompt-injection attacks, or trigger the emergency kill-switch.",
    authRequirement: "Human Principal Hardware Signature",
    permissionRequirement: "CONTROL /agents/*/capabilities",
    parameters: [
      { name: "agentId", type: "string", required: true, desc: "Target agent ID (e.g., agent-atlas-synthesizer)" },
      { name: "action", type: "'PAUSE' | 'RESUME' | 'REVOKE_KILL_SWITCH' | 'APPROVE_PENDING_TASK' | 'SIMULATE_PROMPT_INJECTION'", required: true, desc: "Sandbox control action" },
    ],
    defaultBody: {
      agentId: "agent-atlas-synthesizer",
      action: "SIMULATE_PROMPT_INJECTION",
    },
    exampleResponse: {
      ok: true,
      latestAudit: { decision: "DENIED", reason: "Deterministic UCAN Capability Firewall blocked prompt-injected agent..." },
    },
    errorResponses: [{ code: 404, error: "NOT_FOUND", condition: "Agent ID not found" }],
    securityConsiderations:
      "Enforces capability boundaries deterministically outside the LLM context window.",
  },
];

export default function ApiDocumentationPage() {
  const [selectedId, setSelectedId] = useState<string>(API_ENDPOINTS[0].id);
  const [customBody, setCustomBody] = useState<string>(
    JSON.stringify(API_ENDPOINTS[1].defaultBody || {}, null, 2)
  );
  const [liveResponse, setLiveResponse] = useState<{
    status: number;
    durationMs: number;
    data: unknown;
  } | null>(null);
  const [executing, setExecuting] = useState(false);

  const activeEp =
    API_ENDPOINTS.find((e) => e.id === selectedId) || API_ENDPOINTS[0];

  function handleSelectEndpoint(ep: ApiEndpointDoc) {
    setSelectedId(ep.id);
    setLiveResponse(null);
    if (ep.defaultBody) {
      setCustomBody(JSON.stringify(ep.defaultBody, null, 2));
    } else {
      setCustomBody("");
    }
  }

  async function handleExecuteRequest() {
    setExecuting(true);
    const start = performance.now();
    try {
      const options: RequestInit = {
        method: activeEp.method,
        headers: { "Content-Type": "application/json" },
      };
      if (activeEp.method !== "GET" && customBody.trim()) {
        options.body = customBody;
      }
      const res = await fetch(activeEp.path, options);
      const data = await res.json();
      setLiveResponse({
        status: res.status,
        durationMs: Math.round(performance.now() - start),
        data,
      });
    } catch (err) {
      setLiveResponse({
        status: 500,
        durationMs: Math.round(performance.now() - start),
        data: { error: err instanceof Error ? err.message : "Request failed" },
      });
    } finally {
      setExecuting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
          <FileCode2 className="h-3.5 w-3.5" />
          <span>MODULE 09 • INTERACTIVE API SPECIFICATION &amp; LIVE CONSOLE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          NEW NET Interactive API Documentation (15 Live Endpoints)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
          Inspect HTTP methods, Zod request schemas, authentication &amp; UCAN permission
          boundaries, error codes, and security considerations—and execute live requests
          directly against the running Next.js Route Handlers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sidebar of 15 Endpoints */}
        <div className="lg:col-span-4 space-y-1.5">
          <div className="font-mono text-xs uppercase text-slate-400 mb-2">
            Available Route Handlers ({API_ENDPOINTS.length}):
          </div>
          {API_ENDPOINTS.map((ep) => {
            const active = ep.id === selectedId;
            return (
              <button
                key={ep.id}
                type="button"
                onClick={() => handleSelectEndpoint(ep)}
                className={`w-full flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition ${
                  active
                    ? "border-blue-500 bg-blue-500/15 text-white"
                    : "border-slate-800 bg-[#0b0f19] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                      ep.method === "GET"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : ep.method === "POST"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs truncate">{ep.path}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Endpoint Specification + Live Console */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0b0f19] p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold ${
                    activeEp.method === "GET"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : activeEp.method === "POST"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  }`}
                >
                  {activeEp.method}
                </span>
                <h2 className="font-mono text-lg sm:text-xl font-bold text-white">
                  {activeEp.path}
                </h2>
              </div>
              <span className="font-mono text-xs text-violet-400">
                {activeEp.layer}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeEp.description}
            </p>

            {/* Auth & Permission Requirements */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-lg border border-slate-800 bg-[#07090e] p-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-blue-400 mb-1">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Authentication Boundary</span>
                </div>
                <div className="font-mono text-slate-200">
                  {activeEp.authRequirement}
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#07090e] p-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-emerald-400 mb-1">
                  <Shield className="h-3.5 w-3.5" />
                  <span>UCAN Capability Requirement</span>
                </div>
                <div className="font-mono text-slate-200">
                  {activeEp.permissionRequirement}
                </div>
              </div>
            </div>

            {/* Parameters Table */}
            <div>
              <h3 className="font-mono text-xs uppercase text-slate-400 mb-2">
                Request Parameters ({activeEp.parameters.length})
              </h3>
              {activeEp.parameters.length > 0 ? (
                <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#07090e]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 font-mono text-[10px] text-slate-400">
                        <th className="p-2.5">Parameter</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Required</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {activeEp.parameters.map((p) => (
                        <tr key={p.name}>
                          <td className="p-2.5 font-mono text-blue-300">{p.name}</td>
                          <td className="p-2.5 font-mono text-[11px] text-violet-300">
                            {p.type}
                          </td>
                          <td className="p-2.5 font-mono text-[10px]">
                            {p.required ? (
                              <span className="text-rose-400">REQUIRED</span>
                            ) : (
                              <span className="text-slate-500">OPTIONAL</span>
                            )}
                          </td>
                          <td className="p-2.5 text-slate-300">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-lg border border-slate-800 bg-[#07090e] p-3 font-mono text-xs text-slate-400">
                  No body parameters required for this endpoint.
                </div>
              )}
            </div>

            {/* Error Responses & Security */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs">
              <div className="rounded-lg border border-slate-800 bg-[#07090e] p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-amber-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Error Responses</span>
                </div>
                {activeEp.errorResponses.map((err) => (
                  <div key={err.code} className="font-mono text-[11px] text-slate-300">
                    <span className="text-rose-400 font-bold">HTTP {err.code}</span> (
                    {err.error}): {err.condition}
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Security Considerations</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeEp.securityConsiderations}
                </p>
              </div>
            </div>

            {/* Interactive Live Execution Console */}
            <div className="border-t border-slate-800 pt-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-mono text-xs font-bold uppercase text-blue-300">
                  Interactive Live Execution Console
                </h3>
                <button
                  type="button"
                  onClick={handleExecuteRequest}
                  disabled={executing}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>
                    {executing
                      ? "Executing..."
                      : `Execute ${activeEp.method} ${activeEp.path}`}
                  </span>
                </button>
              </div>

              {activeEp.method !== "GET" && (
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-1">
                    Editable Request JSON Payload:
                  </label>
                  <textarea
                    rows={6}
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#07090e] p-3 font-mono text-xs text-blue-200"
                  />
                </div>
              )}

              {liveResponse ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      className={
                        liveResponse.status < 400
                          ? "text-emerald-400 font-bold"
                          : "text-rose-400 font-bold"
                      }
                    >
                      HTTP {liveResponse.status} • {liveResponse.durationMs}ms
                    </span>
                    <span className="text-slate-500">Live Route Handler Response</span>
                  </div>
                  <pre className="max-h-[340px] overflow-y-auto rounded-lg border border-slate-800 bg-[#07090e] p-3.5 font-mono text-[11px] text-emerald-300">
                    {JSON.stringify(liveResponse.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <div className="font-mono text-[10px] uppercase text-slate-500 mb-1">
                    Example Schema Response Preview (Click Execute above for live response):
                  </div>
                  <pre className="rounded-lg border border-slate-800 bg-[#07090e] p-3.5 font-mono text-[11px] text-slate-400 overflow-x-auto">
                    {JSON.stringify(activeEp.exampleResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
