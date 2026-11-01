/**
 * NEW NET — Core Type Definitions & Implementation Status Taxonomy
 */

export type ImplementationStatus =
  | "IMPLEMENTED"
  | "SIMULATED"
  | "PROPOSED"
  | "RESEARCH REQUIRED";

export type EntityType =
  | "HUMAN"
  | "DECLARED_AI_AGENT"
  | "ORGANISATION"
  | "SUSPICIOUS_AUTOMATION";

export interface VerifiableCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  subjectDid: string;
  claims: Record<string, string | boolean | number>;
  proof: {
    type: string;
    created: string;
    verificationMethod: string;
    signatureHex: string;
  };
  privacyNote: string;
}

export interface IdentityProfile {
  did: string;
  handle: string;
  displayName: string;
  entityType: EntityType;
  publicKeyJwk: JsonWebKey;
  publicKeyFingerprint: string;
  createdAt: string;
  recoveryMethod: "social-shamir-3-of-5" | "hardware-passkey-backup" | "time-locked-vault";
  recoveryGuardians: string[];
  selectiveDisclosureFields: {
    field: string;
    label: string;
    value: string;
    disclosedByDefault: boolean;
  }[];
  credentials: VerifiableCredential[];
  connectedApps: {
    appId: string;
    appName: string;
    protocol: string;
    connectedAt: string;
    scopes: string[];
  }[];
  status: ImplementationStatus;
}

export interface DataPermission {
  id: string;
  subjectDid: string;
  granteeId: string;
  granteeName: string;
  granteeType: "APPLICATION" | "AI_AGENT" | "PEER_NODE";
  resourcePath: string;
  resourceLabel: string;
  scopes: ("READ" | "WRITE" | "APPEND" | "DECRYPT" | "SIGN_ON_BEHALF")[];
  purpose: string;
  status: "ACTIVE" | "REVOKED" | "EXPIRED" | "REJECTED";
  grantedAt: string;
  expiresAt: string;
  revokedAt?: string;
  cryptographicCapabilityHash: string;
}

export interface AccessLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorType: EntityType | "APPLICATION";
  action: string;
  resourcePath: string;
  decision: "ALLOWED" | "DENIED" | "REVOKED_BLOCK" | "HUMAN_APPROVAL_REQUIRED";
  reason: string;
  signatureVerified: boolean;
  auditHash: string;
}

export interface ContentVersion {
  version: number;
  cid: string;
  timestamp: string;
  summary: string;
  contentHash: string;
  signatureHex: string;
}

export interface FeedPost {
  id: string;
  cid: string;
  authorDid: string;
  authorName: string;
  authorHandle: string;
  authorEntityType: EntityType;
  createdAt: string;
  title: string;
  body: string;
  topicTags: string[];
  provenance: {
    contentSha256: string;
    signatureHex: string;
    signerPublicKeyFingerprint: string;
    aiGenerationDisclosure: "NONE" | "AI_ASSISTED" | "AUTONOMOUS_AI";
    originalSourceUrl?: string;
    c2paManifestId: string;
    authenticityVerified: boolean;
    factualAccuracyNote: string;
  };
  metrics: {
    chronologicalScore: number;
    relevanceScore: number;
    communityCuratedScore: number;
    engagementRageScore: number;
    citationCount: number;
    outrageTriggerWeight: number;
    verificationDepth: number;
  };
  versionHistory: ContentVersion[];
  replicas: {
    nodeId: string;
    region: string;
    protocol: "IPFS_KUBO" | "SOLID_POD" | "ARWEAVE_PERMAWEB" | "LOCAL_MESH";
    status: "PINNED" | "SYNCING" | "VERIFIED";
  }[];
}

export interface FeedPreferences {
  mode:
    | "CHRONOLOGICAL"
    | "RELEVANCE"
    | "COMMUNITY_CURATED"
    | "USER_DEFINED"
    | "ENGAGEMENT_SURVEILLANCE_SIMULATION";
  weights: {
    recency: number;
    citationsAndProvenance: number;
    communityTrust: number;
    topicAffinity: number;
    sensationalismPenalty: number;
  };
  hideUnverifiedAi: boolean;
  hideRageBaitClusters: boolean;
  preferredTopics: string[];
}

export interface PersonalAiAgent {
  id: string;
  agentDid: string;
  ownerDid: string;
  name: string;
  role: string;
  executionMode: "LOCAL_ON_DEVICE" | "FEDERATED_ENCLAVE" | "EXTERNAL_API_GATED";
  modelRuntime: string;
  allowedScopes: string[];
  requiresHumanApprovalFor: string[];
  status: "ACTIVE" | "PAUSED" | "REVOKED";
  lastActiveAt: string;
  recentActions: {
    id: string;
    timestamp: string;
    task: string;
    dataAccessed: string;
    humanApproved: boolean;
    status: "COMPLETED" | "BLOCKED_BY_POLICY" | "AWAITING_HUMAN_SIGNATURE";
  }[];
}

export interface ThreatModel {
  id: string;
  title: string;
  category: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  status: ImplementationStatus;
  description: string;
  attackScenario: string;
  potentialImpact: string;
  prevention: string[];
  detection: string[];
  recovery: string[];
  remainingLimitations: string;
}

export interface ArchitectureNodeSpec {
  id: string;
  label: string;
  layer: string;
  status: ImplementationStatus;
  summary: string;
  purpose: string;
  technicalImplementation: string;
  dependencies: string[];
  securityConsiderations: string[];
  limitations: string[];
  communications: string[];
  protocols: string[];
}
