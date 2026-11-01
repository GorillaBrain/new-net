"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  IdentityProfile,
  DataPermission,
  AccessLogEntry,
  FeedPost,
  FeedPreferences,
  PersonalAiAgent,
} from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import {
  KeyRound,
  Database,
  Sliders,
  Bot,
  FileCheck2,
  ShieldAlert,
  Archive,
  AppWindow,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle,
  Download,
  Lock,
  Unlock,
  Send,
  Sparkles,
} from "lucide-react";

type LabId =
  | "lab-1-identity"
  | "lab-2-data"
  | "lab-3-algorithms"
  | "lab-4-entities"
  | "lab-5-provenance"
  | "lab-6-agents"
  | "lab-7-preservation"
  | "lab-8-interoperability";

const LAB_TABS: {
  id: LabId;
  number: string;
  title: string;
  layer: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "lab-1-identity", number: "01", title: "Digital Identity", layer: "Layer 1", icon: KeyRound },
  { id: "lab-2-data", number: "02", title: "Personal Data Ownership", layer: "Layer 2", icon: Database },
  { id: "lab-3-algorithms", number: "03", title: "Algorithm Independence", layer: "Layer 5", icon: Sliders },
  { id: "lab-4-entities", number: "04", title: "Bot & AI Transparency", layer: "Layer 1/6", icon: Bot },
  { id: "lab-5-provenance", number: "05", title: "Content Provenance", layer: "Layer 5/6", icon: FileCheck2 },
  { id: "lab-6-agents", number: "06", title: "AI-Agent Permissions", layer: "Layer 7", icon: ShieldAlert },
  { id: "lab-7-preservation", number: "07", title: "Digital Preservation", layer: "Layer 3/5", icon: Archive },
  { id: "lab-8-interoperability", number: "08", title: "App Interoperability", layer: "Layer 4", icon: AppWindow },
];

interface RankedFeedItem extends FeedPost {
  computedScore: number;
  rankingExplanation: string;
  filteredOut: boolean;
  filterReason?: string;
}

export function PlaygroundSuite() {
  const [activeLab, setActiveLab] = useState<LabId>("lab-1-identity");
  const [loading, setLoading] = useState<boolean>(false);

  // Shared backend state
  const [profiles, setProfiles] = useState<IdentityProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<IdentityProfile | null>(null);
  const [permissions, setPermissions] = useState<DataPermission[]>([]);
  const [auditLogs, setAuditLogs] = useState<AccessLogEntry[]>([]);
  const [feed, setFeed] = useState<RankedFeedItem[]>([]);
  const [feedPrefs, setFeedPrefs] = useState<FeedPreferences>({
    mode: "RELEVANCE",
    weights: {
      recency: 70,
      citationsAndProvenance: 95,
      communityTrust: 85,
      topicAffinity: 80,
      sensationalismPenalty: 90,
    },
    hideUnverifiedAi: true,
    hideRageBaitClusters: true,
    preferredTopics: ["distributed-systems", "cryptography"],
  });
  const [agents, setAgents] = useState<PersonalAiAgent[]>([]);

  // Lab 1 state
  const [newDisplayName, setNewDisplayName] = useState("Sora Takahashi");
  const [newHandle, setNewHandle] = useState("sora.mesh.jp");
  const [newEntityType, setNewEntityType] = useState<"HUMAN" | "DECLARED_AI_AGENT" | "ORGANISATION">("HUMAN");
  const [newRecovery, setNewRecovery] = useState<"social-shamir-3-of-5" | "hardware-passkey-backup" | "time-locked-vault">("social-shamir-3-of-5");
  const [identityFeedback, setIdentityFeedback] = useState<string>("");

  // Lab 2 state
  const [reqGranteeName, setReqGranteeName] = useState("Pulse Health Analytics");
  const [reqResourcePath, setReqResourcePath] = useState("/pod/workspace/papers");
  const [reqPurpose, setReqPurpose] = useState("Index research bibliography for citation graph");
  const [reqScope, setReqScope] = useState<"READ" | "WRITE" | "APPEND" | "DECRYPT">("READ");

  // Lab 4 state
  const [verifyResult, setVerifyResult] = useState<Record<string, unknown> | null>(null);

  // Lab 5 state
  const [sampleText, setSampleText] = useState(
    "NEW NET Protocol Note #42: Content addressing via SHA-256 CIDs combined with author ECDSA signatures prevents silent server-side history alteration."
  );
  const [signedArtifact, setSignedArtifact] = useState<{
    cid: string;
    contentSha256: string;
    signatureHex: string;
    signerDid: string;
    originalContent: string;
  } | null>(null);
  const [tamperedText, setTamperedText] = useState("");
  const [integrityCheckResult, setIntegrityCheckResult] = useState<{
    valid: boolean;
    computedSha256: string;
    hashMatches: boolean;
    signatureMatches: boolean;
    reason: string;
  } | null>(null);

  // Lab 7 state
  const [exportResult, setExportResult] = useState<{
    archiveCid: string;
    bundleSha256: string;
    byteSize: number;
    exportedAt: string;
    bundlePreview: string;
  } | null>(null);

  // Lab 8 state
  const [activeInteropApp, setActiveInteropApp] = useState<
    "agora" | "commons" | "guild"
  >("agora");
  const [portableStatusNote, setPortableStatusNote] = useState(
    "Conducting p99 latency benchmarks on federated UCAN revocation across 48 nodes."
  );

  const loadAllState = useCallback(async () => {
    setLoading(true);
    try {
      const [idRes, permRes, auditRes, feedRes, agentRes] = await Promise.all([
        fetch("/api/identity/profile").then((r) => r.json()),
        fetch("/api/permissions").then((r) => r.json()),
        fetch("/api/audit").then((r) => r.json()),
        fetch("/api/feed").then((r) => r.json()),
        fetch("/api/agents").then((r) => r.json()),
      ]);

      if (idRes.ok) {
        setActiveProfile(idRes.activeProfile);
        setProfiles(idRes.allProfiles || []);
      }
      if (permRes.ok) setPermissions(permRes.permissions || []);
      if (auditRes.ok) setAuditLogs(auditRes.logs || []);
      if (feedRes.ok) {
        setFeed(feedRes.feed || []);
        if (feedRes.activePreferences) setFeedPrefs(feedRes.activePreferences);
      }
      if (agentRes.ok) setAgents(agentRes.agents || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllState();
  }, [loadAllState]);

  // Lab 1 Handler: Create Real WebCrypto Identity
  async function handleCreateIdentity(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setIdentityFeedback("");
    try {
      const res = await fetch("/api/identity/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: newDisplayName,
          handle: newHandle,
          entityType: newEntityType,
          recoveryMethod: newRecovery,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setActiveProfile(data.identity);
        setProfiles((prev) => [data.identity, ...prev]);
        setIdentityFeedback(
          `Generated real WebCrypto ECDSA P-256 keypair & W3C DID: ${data.identity.did}`
        );
        const auditRes = await fetch("/api/audit").then((r) => r.json());
        if (auditRes.ok) setAuditLogs(auditRes.logs);
      }
    } finally {
      setLoading(false);
    }
  }

  // Lab 2 Handlers: Grant / Reject / Revoke
  async function handlePermissionDecision(decision: "GRANT" | "REJECT") {
    setLoading(true);
    try {
      const res = await fetch("/api/permissions/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          granteeId: `app-${reqGranteeName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          granteeName: reqGranteeName,
          granteeType: "APPLICATION",
          resourcePath: reqResourcePath,
          resourceLabel: `Pod Container (${reqResourcePath})`,
          scopes: [reqScope],
          purpose: reqPurpose,
          decision,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setPermissions(data.permissions);
        const auditRes = await fetch("/api/audit").then((r) => r.json());
        if (auditRes.ok) setAuditLogs(auditRes.logs);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRevokePermission(permissionId: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/permissions/revoke", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissionId }),
      });
      const data = await res.json();
      if (data.ok) {
        setPermissions(data.permissions);
        const auditRes = await fetch("/api/audit").then((r) => r.json());
        if (auditRes.ok) setAuditLogs(auditRes.logs);
      }
    } finally {
      setLoading(false);
    }
  }

  // Lab 3 Handler: Update Feed Ranking Preferences
  async function handleUpdateFeedPrefs(updated: Partial<FeedPreferences>) {
    const merged: FeedPreferences = {
      ...feedPrefs,
      ...updated,
      weights: {
        ...feedPrefs.weights,
        ...(updated.weights || {}),
      },
    };
    setFeedPrefs(merged);
    const res = await fetch("/api/feed/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(merged),
    });
    const data = await res.json();
    if (data.ok) {
      setFeed(data.feed);
    }
  }

  // Lab 4 Handler: Cryptographic Entity Verification
  async function handleVerifyEntity(did: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/identity/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          did,
          challengeNonce: `nonce-${Date.now()}`,
        }),
      });
      const data = await res.json();
      setVerifyResult(data);
    } finally {
      setLoading(false);
    }
  }

  // Lab 5 Handlers: Sign & Verify Content Provenance
  async function handleSignContent() {
    setLoading(true);
    try {
      const res = await fetch("/api/content/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SIGN_AND_HASH",
          content: sampleText,
          signerDid: activeProfile?.did,
          aiGenerationDisclosure: "NONE",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSignedArtifact({
          cid: data.cid,
          contentSha256: data.contentSha256,
          signatureHex: data.signatureHex,
          signerDid: data.signerDid,
          originalContent: sampleText,
        });
        setTamperedText(sampleText);
        setIntegrityCheckResult({
          valid: true,
          computedSha256: data.contentSha256,
          hashMatches: true,
          signatureMatches: true,
          reason: "Initial cryptographic signature & SHA-256 CID manifest created.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyTamper(contentToVerify: string) {
    if (!signedArtifact) return;
    setLoading(true);
    try {
      const res = await fetch("/api/content/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_INTEGRITY",
          content: contentToVerify,
          expectedSha256: signedArtifact.contentSha256,
          signatureHex: signedArtifact.signatureHex,
          signerDid: signedArtifact.signerDid,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setIntegrityCheckResult(data.verification);
      }
    } finally {
      setLoading(false);
    }
  }

  // Lab 6 Handler: Personal AI Agent Controls
  async function handleAgentAction(
    agentId: string,
    action: "PAUSE" | "RESUME" | "REVOKE_KILL_SWITCH" | "APPROVE_PENDING_TASK" | "SIMULATE_PROMPT_INJECTION"
  ) {
    setLoading(true);
    try {
      const res = await fetch("/api/agents/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, action }),
      });
      const data = await res.json();
      if (data.ok) {
        setAgents(data.agents);
        const auditRes = await fetch("/api/audit").then((r) => r.json());
        if (auditRes.ok) setAuditLogs(auditRes.logs);
      }
    } finally {
      setLoading(false);
    }
  }

  // Lab 7 Handler: Export Portable Archive
  async function handleExportArchive(format: "JSON_LD_PORTABLE_BUNDLE" | "CAR_V2_MANIFEST") {
    setLoading(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          did: activeProfile?.did,
          format,
          includeAuditLog: true,
          includePermissions: true,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setExportResult({
          archiveCid: data.archiveCid,
          bundleSha256: data.bundleSha256,
          byteSize: data.byteSize,
          exportedAt: data.timestamp,
          bundlePreview: JSON.stringify(data.bundle, null, 2),
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* 8-Lab Navigation Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {LAB_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = tab.id === activeLab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveLab(tab.id)}
              className={`flex flex-col justify-between rounded-xl border p-3 text-left transition ${
                active
                  ? "border-blue-500 bg-blue-500/15 text-white shadow-lg shadow-blue-950/30"
                  : "border-slate-800 bg-[#0b0f19] text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-mono text-[10px] font-bold text-blue-400">
                  LAB {tab.number}
                </span>
                <Icon className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <div className="text-xs font-semibold leading-snug">{tab.title}</div>
                <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                  {tab.layer}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* LAB 1: DIGITAL IDENTITY */}
      {activeLab === "lab-1-identity" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-blue-400">
                  LAB 01 • LAYER 1 DIGITAL IDENTITY
                </span>
                <h3 className="text-base font-bold text-white">
                  Generate Self-Sovereign W3C DID
                </h3>
              </div>
              <StatusBadge status="IMPLEMENTED" size="xs" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Creates a real ECDSA P-256 cryptographic keypair via the Web Crypto API,
              derives a self-certifying <code className="text-blue-300">did:key</code> identifier,
              and issues a signed key-continuity Verifiable Credential.
            </p>

            <form onSubmit={handleCreateIdentity} className="space-y-3">
              <div>
                <label className="block font-mono text-[11px] text-slate-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-slate-300 mb-1">
                  Portable Handle
                </label>
                <input
                  type="text"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-3 py-2 font-mono text-xs text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 mb-1">
                    Declared Entity Type
                  </label>
                  <select
                    value={newEntityType}
                    onChange={(e) =>
                      setNewEntityType(
                        e.target.value as "HUMAN" | "DECLARED_AI_AGENT" | "ORGANISATION"
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-2.5 py-2 text-xs text-white"
                  >
                    <option value="HUMAN">HUMAN (Individual)</option>
                    <option value="DECLARED_AI_AGENT">DECLARED_AI_AGENT</option>
                    <option value="ORGANISATION">ORGANISATION</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 mb-1">
                    Key Recovery Protocol
                  </label>
                  <select
                    value={newRecovery}
                    onChange={(e) =>
                      setNewRecovery(
                        e.target.value as
                          | "social-shamir-3-of-5"
                          | "hardware-passkey-backup"
                          | "time-locked-vault"
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-2.5 py-2 text-xs text-white"
                  >
                    <option value="social-shamir-3-of-5">Shamir 3-of-5 Social Guardians</option>
                    <option value="hardware-passkey-backup">Hardware Passkey Enclave</option>
                    <option value="time-locked-vault">Time-Locked Rotation Vault</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition disabled:opacity-50"
              >
                <KeyRound className="h-4 w-4" />
                <span>Generate Live WebCrypto Identity (POST /api/identity/create)</span>
              </button>
            </form>

            {identityFeedback && (
              <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 font-mono text-[11px] text-emerald-300 break-all">
                {identityFeedback}
              </div>
            )}

            <div className="border-t border-slate-800 pt-3">
              <div className="font-mono text-[10px] uppercase text-slate-400 mb-2">
                Switch Active Identity Profile ({profiles.length} loaded):
              </div>
              <div className="space-y-1.5">
                {profiles.map((p) => (
                  <button
                    key={p.did}
                    type="button"
                    onClick={() => setActiveProfile(p)}
                    className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs transition ${
                      activeProfile?.did === p.did
                        ? "border-blue-500/60 bg-blue-500/15 text-white"
                        : "border-slate-800 bg-[#07090e] text-slate-400 hover:text-white"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="font-semibold text-slate-200">{p.displayName}</span>{" "}
                      <span className="font-mono text-[10px] text-slate-500">@{p.handle}</span>
                    </div>
                    <span className="shrink-0 rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-blue-300">
                      {p.entityType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Identity Inspector */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-5">
            {activeProfile ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white">
                        {activeProfile.displayName}
                      </h4>
                      <span className="rounded border border-blue-500/40 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-300">
                        {activeProfile.entityType}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-slate-400 mt-0.5">
                      @{activeProfile.handle} • Key Fingerprint:{" "}
                      <span className="text-emerald-400">
                        {activeProfile.publicKeyFingerprint}
                      </span>
                    </p>
                    <p className="font-mono text-[11px] text-blue-400 mt-1 break-all">
                      {activeProfile.did}
                    </p>
                  </div>
                  <div className="text-right font-mono text-[11px] text-slate-400">
                    <div>Recovery: {activeProfile.recoveryMethod}</div>
                    <div>Guardians: {activeProfile.recoveryGuardians.length} configured</div>
                  </div>
                </div>

                {/* Selective Disclosure Matrix */}
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                    Selective Disclosure &amp; Zero-Knowledge Attribute Matrix
                  </h5>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {activeProfile.selectiveDisclosureFields.map((f) => (
                      <div
                        key={f.field}
                        className="rounded-lg border border-slate-800 bg-[#07090e] p-3"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className="text-slate-400">{f.label}</span>
                          {f.disclosedByDefault ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <Unlock className="h-3 w-3" /> Disclosed
                            </span>
                          ) : (
                            <span className="text-amber-400 flex items-center gap-1">
                              <Lock className="h-3 w-3" /> Private Pod Only
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-xs text-slate-200 break-all">
                          {f.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verifiable Credentials */}
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                    Attached Verifiable Credentials ({activeProfile.credentials.length})
                  </h5>
                  <div className="space-y-2.5">
                    {activeProfile.credentials.map((vc) => (
                      <div
                        key={vc.id}
                        className="rounded-lg border border-slate-800 bg-[#07090e] p-3.5 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-violet-300">
                            {vc.type.join(" / ")}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400">
                            Issuer: {vc.issuer}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-300 bg-slate-900/90 rounded p-2 overflow-x-auto">
                          {JSON.stringify(vc.claims)}
                        </div>
                        <p className="text-[11px] text-slate-400 italic">
                          {vc.privacyNote}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Interoperable Applications */}
                <div>
                  <h5 className="font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                    Connected Interoperable Applications ({activeProfile.connectedApps.length})
                  </h5>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {activeProfile.connectedApps.map((app) => (
                      <div
                        key={app.appId}
                        className="rounded-lg border border-slate-800 bg-[#07090e] p-3"
                      >
                        <div className="font-semibold text-xs text-white">
                          {app.appName}
                        </div>
                        <div className="font-mono text-[10px] text-blue-400 mt-0.5">
                          {app.protocol}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {app.scopes.map((s) => (
                            <span
                              key={s}
                              className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[9px] text-slate-300"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* LAB 2: PERSONAL DATA OWNERSHIP */}
      {activeLab === "lab-2-data" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-violet-400">
                  LAB 02 • LAYER 2 PERSONAL DATA SOVEREIGNTY
                </span>
                <h3 className="text-base font-bold text-white">
                  Simulate Incoming Pod Access Request
                </h3>
              </div>
              <StatusBadge status="IMPLEMENTED" size="xs" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              In NEW NET, applications never store your raw data on their own servers by
              default. They request a cryptographically scoped UCAN capability to a
              specific container in your Personal Data Pod. You can grant, reject, or
              revoke permissions at any second.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block font-mono text-[11px] text-slate-300 mb-1">
                  Requesting Application / Service
                </label>
                <input
                  type="text"
                  value={reqGranteeName}
                  onChange={(e) => setReqGranteeName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 mb-1">
                    Pod Resource Container
                  </label>
                  <select
                    value={reqResourcePath}
                    onChange={(e) => setReqResourcePath(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-2.5 py-2 font-mono text-xs text-white"
                  >
                    <option value="/pod/workspace/papers">/pod/workspace/papers</option>
                    <option value="/pod/social/posts">/pod/social/posts</option>
                    <option value="/pod/credentials/reputation">/pod/credentials/reputation</option>
                    <option value="/pod/health/biometrics">/pod/health/biometrics</option>
                    <option value="/pod/financial/tax-ledger.json">/pod/financial/tax-ledger.json</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-300 mb-1">
                    Capability Scope
                  </label>
                  <select
                    value={reqScope}
                    onChange={(e) =>
                      setReqScope(
                        e.target.value as "READ" | "WRITE" | "APPEND" | "DECRYPT"
                      )
                    }
                    className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-2.5 py-2 font-mono text-xs text-white"
                  >
                    <option value="READ">READ Only</option>
                    <option value="APPEND">APPEND Only</option>
                    <option value="WRITE">READ + WRITE</option>
                    <option value="DECRYPT">DECRYPT Ciphertext</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-mono text-[11px] text-slate-300 mb-1">
                  Declared Purpose
                </label>
                <input
                  type="text"
                  value={reqPurpose}
                  onChange={(e) => setReqPurpose(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#07090e] px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handlePermissionDecision("GRANT")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-2.5 text-xs font-semibold text-white transition"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Grant Capability</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handlePermissionDecision("REJECT")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-500/50 bg-rose-500/15 hover:bg-rose-500/25 px-3 py-2.5 text-xs font-semibold text-rose-300 transition"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject Request</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {/* Active & Historical Permissions Table */}
            <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-3">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                Personal Data Pod Capability Registry ({permissions.length} Grants)
              </h4>
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                {permissions.map((perm) => (
                  <div
                    key={perm.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#07090e] p-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white">
                          {perm.granteeName}
                        </span>
                        <span className="font-mono text-[10px] text-blue-400">
                          {perm.resourcePath}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                            perm.status === "ACTIVE"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {perm.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{perm.purpose}</p>
                      <div className="font-mono text-[10px] text-slate-500">
                        Scopes: {perm.scopes.join(", ")} • Token:{" "}
                        {perm.cryptographicCapabilityHash.slice(0, 26)}...
                      </div>
                    </div>

                    {perm.status === "ACTIVE" && (
                      <button
                        type="button"
                        onClick={() => handleRevokePermission(perm.id)}
                        className="rounded-md border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1.5 font-mono text-[11px] text-rose-300 transition"
                      >
                        Revoke Access
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tamper-Evident Access History Log */}
            <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-3">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                Tamper-Evident Merkle Access Audit Log (/api/audit)
              </h4>
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {auditLogs.slice(0, 8).map((log) => (
                  <div
                    key={log.id}
                    className="rounded-lg border border-slate-800/90 bg-[#07090e] p-2.5 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-slate-200">
                        {log.action}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                          log.decision === "ALLOWED"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : log.decision === "HUMAN_APPROVAL_REQUIRED"
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-rose-500/15 text-rose-400"
                        }`}
                      >
                        {log.decision}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{log.reason}</p>
                    <div className="font-mono text-[10px] text-slate-500 mt-1">
                      Actor: {log.actorName} • Audit SHA-256: {log.auditHash.slice(0, 24)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 3: ALGORITHM INDEPENDENCE */}
      {activeLab === "lab-3-algorithms" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-amber-400">
                  LAB 03 • LAYER 5 ALGORITHM INDEPENDENCE
                </span>
                <h3 className="text-base font-bold text-white">
                  Discovery Lens &amp; Ranking Controls
                </h3>
              </div>
              <StatusBadge status="IMPLEMENTED" size="xs" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare how the exact same pool of network posts is ranked under 5
              different algorithmic lenses—including a simulation of legacy
              surveillance rage-bait ranking.
            </p>

            <div className="space-y-1.5">
              {(
                [
                  {
                    mode: "CHRONOLOGICAL",
                    label: "1. Pure Chronological",
                    desc: "Strict timestamp order. Zero algorithmic scoring.",
                  },
                  {
                    mode: "RELEVANCE",
                    label: "2. Citation & Provenance Relevance",
                    desc: "Prioritizes verified depth, peer citations & low outrage.",
                  },
                  {
                    mode: "COMMUNITY_CURATED",
                    label: "3. Community Web-of-Trust",
                    desc: "Weighted by domain stewards & cooperative archives.",
                  },
                  {
                    mode: "USER_DEFINED",
                    label: "4. Custom User Sliders (Tunable)",
                    desc: "Adjust exact mathematical weights below.",
                  },
                  {
                    mode: "ENGAGEMENT_SURVEILLANCE_SIMULATION",
                    label: "5. Legacy Attention-Economy (Contrast)",
                    desc: "Simulates rage-bait amplification & disables bot filters.",
                  },
                ] as const
              ).map((item) => (
                <button
                  key={item.mode}
                  type="button"
                  onClick={() => handleUpdateFeedPrefs({ mode: item.mode })}
                  className={`w-full rounded-lg border p-2.5 text-left transition ${
                    feedPrefs.mode === item.mode
                      ? "border-blue-500 bg-blue-500/15 text-white"
                      : "border-slate-800 bg-[#07090e] text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>

            {/* User-Defined Weight Sliders */}
            <div className="space-y-2.5 border-t border-slate-800 pt-3">
              <div className="font-mono text-[10px] uppercase text-blue-400">
                User-Controlled Weight Sliders
              </div>
              {(
                [
                  { key: "citationsAndProvenance", label: "Provenance & Citations" },
                  { key: "communityTrust", label: "Community Trust Graph" },
                  { key: "recency", label: "Chronological Recency" },
                  { key: "sensationalismPenalty", label: "Rage-Bait Penalty" },
                ] as const
              ).map((slider) => (
                <div key={slider.key} className="space-y-1">
                  <div className="flex justify-between font-mono text-[11px] text-slate-300">
                    <span>{slider.label}</span>
                    <span className="text-blue-400">{feedPrefs.weights[slider.key]}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={feedPrefs.weights[slider.key]}
                    onChange={(e) =>
                      handleUpdateFeedPrefs({
                        mode: "USER_DEFINED",
                        weights: {
                          ...feedPrefs.weights,
                          [slider.key]: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Safety Toggles */}
            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <label className="flex items-center justify-between gap-2 cursor-pointer">
                <span className="text-slate-300">Filter Unverified Automation / Sybils</span>
                <input
                  type="checkbox"
                  checked={feedPrefs.hideUnverifiedAi}
                  onChange={(e) =>
                    handleUpdateFeedPrefs({ hideUnverifiedAi: e.target.checked })
                  }
                  className="accent-blue-500 h-4 w-4"
                />
              </label>
              <label className="flex items-center justify-between gap-2 cursor-pointer">
                <span className="text-slate-300">Suppress Outrage-Farming Clusters</span>
                <input
                  type="checkbox"
                  checked={feedPrefs.hideRageBaitClusters}
                  onChange={(e) =>
                    handleUpdateFeedPrefs({ hideRageBaitClusters: e.target.checked })
                  }
                  className="accent-blue-500 h-4 w-4"
                />
              </label>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {feed.map((post, idx) => (
              <div
                key={post.id}
                className={`rounded-xl border p-4 transition ${
                  post.filteredOut
                    ? "border-slate-800/50 bg-[#07090e]/50 opacity-60"
                    : post.authorEntityType === "SUSPICIOUS_AUTOMATION"
                    ? "border-rose-500/40 bg-rose-950/10"
                    : "border-slate-800 bg-[#0b0f19]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-xs font-bold text-blue-300">
                      #{idx + 1} • Score: {post.computedScore}
                    </span>
                    <span className="font-semibold text-xs text-white">
                      {post.authorName}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        post.authorEntityType === "HUMAN"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : post.authorEntityType === "DECLARED_AI_AGENT"
                          ? "bg-violet-500/15 text-violet-300"
                          : post.authorEntityType === "ORGANISATION"
                          ? "bg-blue-500/15 text-blue-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {post.authorEntityType}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    UTC • Citations: {post.metrics.citationCount}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{post.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {post.body}
                </p>

                <div className="rounded-lg border border-slate-800 bg-[#07090e] p-2.5 font-mono text-[11px] text-slate-400">
                  <span className="text-blue-400 font-semibold">
                    Transparent Lens Formula:{" "}
                  </span>
                  {post.rankingExplanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LAB 4: BOT AND AI-AGENT TRANSPARENCY */}
      {activeLab === "lab-4-entities" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-cyan-400">
                  LAB 04 • ANTI-DECAY PILLAR A
                </span>
                <h3 className="text-base font-bold text-white">
                  Human, Declared AI Agent, Organisation &amp; Sybil Classifier
                </h3>
              </div>
              <StatusBadge status="IMPLEMENTED" size="xs" />
            </div>

            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
              <strong>Architectural Honesty Principle:</strong> A cryptographic keypair
              alone does NOT prove someone is a biological human—a bot can generate an
              ECDSA keypair in under 1 millisecond. NEW NET distinguishes entities via
              multi-issuer Web-of-Trust personhood credentials, mandatory human-principal
              delegation chains for AI agents, and behavioral burst telemetry.
            </div>

            <div className="space-y-3">
              {profiles.map((entity) => (
                <div
                  key={entity.did}
                  className="rounded-xl border border-slate-800 bg-[#07090e] p-4 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">
                        {entity.displayName}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold ${
                          entity.entityType === "HUMAN"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : entity.entityType === "DECLARED_AI_AGENT"
                            ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                            : entity.entityType === "ORGANISATION"
                            ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        }`}
                      >
                        {entity.entityType}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-400 break-all">
                      DID: {entity.did}
                    </div>
                    <div className="text-xs text-slate-400">
                      Credentials Attached: {entity.credentials.length} • Guardians:{" "}
                      {entity.recoveryGuardians.length}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleVerifyEntity(entity.did)}
                    className="rounded-lg bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 px-3 py-2 font-mono text-xs text-blue-300 transition"
                  >
                    Run Attestation Check
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              Live Verification Output (POST /api/identity/verify)
            </h4>
            {verifyResult ? (
              <div className="space-y-3">
                <div
                  className={`rounded-lg border p-3 ${
                    verifyResult.verified
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-300"
                  }`}
                >
                  <div className="font-mono text-xs font-bold">
                    Verification Status:{" "}
                    {verifyResult.verified
                      ? "VERIFIED ATTESTED ENTITY"
                      : "UNATTESTED / SUSPICIOUS AUTOMATION"}
                  </div>
                  <p className="text-xs mt-1">{String(verifyResult.architecturalNote)}</p>
                </div>
                <pre className="rounded-lg border border-slate-800 bg-[#07090e] p-3 font-mono text-[11px] text-slate-300 overflow-x-auto">
                  {JSON.stringify(verifyResult, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="rounded-lg border border-slate-800 bg-[#07090e] p-6 text-center text-xs text-slate-400">
                Click &ldquo;Run Attestation Check&rdquo; on any account on the left to inspect its
                cryptographic personhood or AI-delegation proof.
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB 5: CONTENT PROVENANCE */}
      {activeLab === "lab-5-provenance" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-emerald-400">
                  LAB 05 • ANTI-DECAY PILLAR B
                </span>
                <h3 className="text-base font-bold text-white">
                  Cryptographic Signing &amp; Tamper Detection Lab
                </h3>
              </div>
              <StatusBadge status="IMPLEMENTED" size="xs" />
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-200">
              <strong>Epistemic Clarity:</strong> Provenance proves <em>authenticity and
              byte-level integrity</em> (who signed it and that zero bytes were altered).
              It does <strong>not</strong> automatically prove factual truth.
            </div>

            <div>
              <label className="block font-mono text-[11px] text-slate-300 mb-1">
                Step 1: Author Content Payload to Sign &amp; Content-Address
              </label>
              <textarea
                rows={3}
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-[#07090e] p-3 text-xs text-white"
              />
            </div>

            <button
              type="button"
              onClick={handleSignContent}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white transition"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>Compute SHA-256 CIDv1 &amp; Sign Payload (POST /api/content/verify)</span>
            </button>

            {signedArtifact && (
              <div className="rounded-lg border border-slate-800 bg-[#07090e] p-3.5 space-y-1.5 font-mono text-[11px]">
                <div className="text-emerald-400 font-semibold">
                  Signed Manifest Created:
                </div>
                <div className="text-slate-300 break-all">
                  <span className="text-slate-500">CIDv1:</span> {signedArtifact.cid}
                </div>
                <div className="text-slate-300 break-all">
                  <span className="text-slate-500">SHA-256:</span>{" "}
                  {signedArtifact.contentSha256}
                </div>
                <div className="text-slate-300 break-all">
                  <span className="text-slate-500">Signature:</span>{" "}
                  {signedArtifact.signatureHex.slice(0, 64)}...
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              Step 2: Simulate Man-in-the-Middle Relay Tampering
            </h4>
            <p className="text-xs text-slate-400">
              After signing on the left, try modifying even a single character or punctuation
              mark below and re-run verification to see how SHA-256 content addressing
              catches tampering immediately.
            </p>

            <textarea
              rows={3}
              value={tamperedText}
              onChange={(e) => setTamperedText(e.target.value)}
              placeholder="Sign content on the left first..."
              className="w-full rounded-lg border border-slate-700 bg-[#07090e] p-3 text-xs text-white"
            />

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!signedArtifact || loading}
                onClick={() => handleVerifyTamper(tamperedText)}
                className="flex-1 rounded-lg bg-violet-600 hover:bg-violet-500 px-3 py-2 text-xs font-semibold text-white transition disabled:opacity-40"
              >
                Verify Payload Against Signed Manifest
              </button>
              <button
                type="button"
                disabled={!signedArtifact || loading}
                onClick={() => {
                  const injected = `${tamperedText} [Relay Injected Ad/Modification]`;
                  setTamperedText(injected);
                  handleVerifyTamper(injected);
                }}
                className="rounded-lg border border-rose-500/40 bg-rose-500/15 hover:bg-rose-500/25 px-3 py-2 text-xs font-semibold text-rose-300 transition disabled:opacity-40"
              >
                Simulate 1-Byte Tamper Attack
              </button>
            </div>

            {integrityCheckResult && (
              <div
                className={`rounded-lg border p-3.5 space-y-1.5 ${
                  integrityCheckResult.valid
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-500/50 bg-rose-500/15 text-rose-200"
                }`}
              >
                <div className="font-mono text-xs font-bold flex items-center gap-1.5">
                  {integrityCheckResult.valid ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>CRYPTOGRAPHIC INTEGRITY VERIFIED</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-rose-400" />
                      <span>TAMPERING DETECTED — HASH MISMATCH</span>
                    </>
                  )}
                </div>
                <p className="text-xs">{integrityCheckResult.reason}</p>
                <div className="font-mono text-[10px] pt-1 break-all opacity-90">
                  Computed SHA-256: {integrityCheckResult.computedSha256}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB 6: AI-AGENT PERMISSIONS */}
      {activeLab === "lab-6-agents" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-fuchsia-400">
                  LAB 06 • LAYER 7 PERSONAL AI &amp; SOVEREIGN AUTOMATION
                </span>
                <h3 className="text-base font-bold text-white">
                  Sovereign AI Agent Sandbox, Prompt-Injection Firewall &amp; Kill-Switch
                </h3>
              </div>
              <StatusBadge status="IMPLEMENTED" size="xs" />
            </div>
            <p className="text-xs text-slate-400 max-w-4xl">
              Personal AI agents hold delegated DIDs and execute locally where possible.
              Crucially, their capability permissions are enforced deterministically{" "}
              <em>outside</em> the LLM context window—meaning even if an agent reads a
              malicious prompt-injection post, the Pod Gateway blocks unauthorized file reads.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{agent.name}</h4>
                      <p className="text-xs text-slate-400">{agent.role}</p>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                        agent.status === "ACTIVE"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : agent.status === "PAUSED"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-[#07090e] p-2.5 font-mono text-[10px] space-y-1">
                    <div className="text-blue-400">Mode: {agent.executionMode}</div>
                    <div className="text-slate-400 truncate">
                      Runtime: {agent.modelRuntime}
                    </div>
                    <div className="text-slate-500 truncate">DID: {agent.agentDid}</div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] uppercase text-slate-400 mb-1">
                      Allowed Pod Scopes:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.allowedScopes.length > 0 ? (
                        agent.allowedScopes.map((s) => (
                          <span
                            key={s}
                            className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="font-mono text-[10px] text-rose-400">
                          ALL SCOPES REVOKED
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] uppercase text-slate-400 mb-1">
                      Recent Sandbox Activity Log:
                    </div>
                    <div className="space-y-1.5">
                      {agent.recentActions.slice(0, 3).map((act) => (
                        <div
                          key={act.id}
                          className="rounded border border-slate-800 bg-[#07090e] p-2 text-[11px]"
                        >
                          <div className="flex items-center justify-between font-mono text-[10px]">
                            <span
                              className={
                                act.status === "COMPLETED"
                                  ? "text-emerald-400"
                                  : act.status === "AWAITING_HUMAN_SIGNATURE"
                                  ? "text-amber-400"
                                  : "text-rose-400"
                              }
                            >
                              {act.status}
                            </span>
                            <span className="text-slate-500">{act.dataAccessed}</span>
                          </div>
                          <div className="text-slate-300 mt-0.5">{act.task}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() =>
                      handleAgentAction(
                        agent.id,
                        agent.status === "ACTIVE" ? "PAUSE" : "RESUME"
                      )
                    }
                    className="rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 font-mono text-[11px] text-slate-200"
                  >
                    {agent.status === "ACTIVE" ? "Pause Agent" : "Resume Agent"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleAgentAction(agent.id, "APPROVE_PENDING_TASK")
                    }
                    className="rounded-lg border border-blue-500/40 bg-blue-500/15 hover:bg-blue-500/25 px-2.5 py-1.5 font-mono text-[11px] text-blue-300"
                  >
                    Sign Human Gate
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleAgentAction(agent.id, "SIMULATE_PROMPT_INJECTION")
                    }
                    className="rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1.5 font-mono text-[11px] text-amber-300"
                  >
                    Test Injection Trap
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleAgentAction(agent.id, "REVOKE_KILL_SWITCH")
                    }
                    className="rounded-lg border border-rose-500/50 bg-rose-500/15 hover:bg-rose-500/25 px-2.5 py-1.5 font-mono text-[11px] text-rose-300"
                  >
                    Kill-Switch Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LAB 7: DIGITAL PRESERVATION */}
      {activeLab === "lab-7-preservation" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-cyan-400">
                  LAB 07 • ANTI-DECAY PILLAR D
                </span>
                <h3 className="text-base font-bold text-white">
                  Content-Addressed Archives &amp; Replica Pinning
                </h3>
              </div>
              <StatusBadge status="SIMULATED" size="xs" />
            </div>
            <p className="text-xs text-slate-400">
              Instead of fragile HTTP links that rot when domains expire, NEW NET
              addresses artifacts by their SHA-256 Content Identifier (CIDv1) and tracks
              multi-node replication across cooperative archives.
            </p>

            <div className="space-y-3">
              {feed.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-800 bg-[#07090e] p-3.5 space-y-2"
                >
                  <div className="text-xs font-bold text-white">{item.title}</div>
                  <div className="font-mono text-[10px] text-blue-400 break-all">
                    CIDv1: {item.cid}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.replicas.map((rep) => (
                      <span
                        key={rep.nodeId}
                        className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300"
                      >
                        {rep.region} ({rep.protocol}: {rep.status})
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 space-y-4">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
              One-Click Sovereign Pod Export (POST /api/export)
            </h4>
            <p className="text-xs text-slate-400">
              Generate a cryptographically signed, content-addressed archive of your
              entire identity, credentials, authored content, permissions, and audit history.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleExportArchive("JSON_LD_PORTABLE_BUNDLE")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-2.5 text-xs font-semibold text-white transition"
              >
                <Download className="h-4 w-4" />
                <span>Export JSON-LD Bundle</span>
              </button>
              <button
                type="button"
                onClick={() => handleExportArchive("CAR_V2_MANIFEST")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/15 hover:bg-violet-500/25 px-3 py-2.5 text-xs font-semibold text-violet-300 transition"
              >
                <Archive className="h-4 w-4" />
                <span>Generate CARv2 Manifest</span>
              </button>
            </div>

            {exportResult && (
              <div className="space-y-2.5">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 font-mono text-[11px] space-y-1">
                  <div className="text-emerald-300 font-bold">
                    Portable Archive Generated ({exportResult.byteSize} bytes)
                  </div>
                  <div className="text-slate-300 break-all">
                    Archive CID: {exportResult.archiveCid}
                  </div>
                  <div className="text-slate-400 break-all">
                    SHA-256: {exportResult.bundleSha256}
                  </div>
                </div>
                <pre className="max-h-[240px] overflow-y-auto rounded-lg border border-slate-800 bg-[#07090e] p-3 font-mono text-[10px] text-slate-300">
                  {exportResult.bundlePreview}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB 8: APPLICATION INTEROPERABILITY */}
      {activeLab === "lab-8-interoperability" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <span className="font-mono text-[10px] uppercase text-emerald-400">
                  LAB 08 • LAYER 4 APPLICATION INTEROPERABILITY
                </span>
                <h3 className="text-base font-bold text-white">
                  Zero-Lock-In Cross-Application State Portability
                </h3>
              </div>
              <StatusBadge status="IMPLEMENTED" size="xs" />
            </div>
            <p className="text-xs text-slate-400 max-w-4xl">
              Update your portable status or inspect your identity across three distinct
              applications (<strong>Agora Social</strong>, <strong>Commons Market</strong>,
              and <strong>Guild Workspace</strong>). Because all three read from your
              Personal Data Pod via open JSON-LD lexicons, switching applications requires
              zero account recreation and zero follower/reputation loss.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={portableStatusNote}
                onChange={(e) => setPortableStatusNote(e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-[#07090e] px-3 py-2 text-xs text-white"
              />
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-mono text-[11px] text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Live Pod Sync Active Across All 3 Clients
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {(
              [
                {
                  id: "agora",
                  name: "Agora Social",
                  protocol: "ActivityStreams 2.0 + UCAN",
                  scopeUsed: "READ/WRITE /pod/social/posts",
                  accent: "border-blue-500/40",
                  badge: "Social Discourse Client",
                  view: `Public Broadcast Feed: "${portableStatusNote}" — Signed by ${
                    activeProfile?.handle || "elena.sovereign.net"
                  } (Verified Human VC attached).`,
                },
                {
                  id: "commons",
                  name: "Commons Co-op Marketplace",
                  protocol: "JSON-LD Commerce Lexicon",
                  scopeUsed: "READ /pod/credentials/reputation",
                  accent: "border-emerald-500/40",
                  badge: "Peer-to-Peer Commerce",
                  view: `Seller Profile Verified via Root DID (${
                    activeProfile?.publicKeyFingerprint || "8F4A92C1"
                  }). Portable Reputation: 100% Positive across 7 cooperative guilds. Current Note: "${portableStatusNote}"`,
                },
                {
                  id: "guild",
                  name: "Guild Research Workspace",
                  protocol: "Automerge CRDT + Solid Pod",
                  scopeUsed: "READ/WRITE /pod/workspace/papers",
                  accent: "border-violet-500/40",
                  badge: "Collaborative Knowledge Base",
                  view: `Co-Author Session Active for ${
                    activeProfile?.displayName || "Dr. Elena Rostova"
                  }. Institutional Researcher VC verified. Workspace Status: "${portableStatusNote}"`,
                },
              ] as const
            ).map((app) => (
              <div
                key={app.id}
                onClick={() => setActiveInteropApp(app.id)}
                className={`cursor-pointer rounded-xl border p-5 transition ${
                  activeInteropApp === app.id
                    ? `${app.accent} bg-[#101729] ring-1 ring-blue-500/30`
                    : "border-slate-800 bg-[#0b0f19]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase text-blue-400">
                    {app.badge}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    {app.protocol}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{app.name}</h4>
                <div className="rounded-lg border border-slate-800 bg-[#07090e] p-3 text-xs text-slate-300 leading-relaxed mb-3">
                  {app.view}
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  Authorized Pod Scope: <span className="text-slate-300">{app.scopeUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
