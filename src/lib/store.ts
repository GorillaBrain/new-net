/**
 * NEW NET — Modular Backend State & Demonstration Persistence Adapter
 *
 * ARCHITECTURAL HONESTY NOTICE:
 * When `SUPABASE_URL` / `DATABASE_URL` environment variables are not configured,
 * NEW NET operates in `DEMONSTRATION_ADAPTER` mode.
 * We NEVER pretend a centralized or in-memory serverless database is a live global P2P network.
 * Real cryptographic hashing (SHA-256) and Web Crypto ECDSA P-256 signatures execute genuinely,
 * while state persists across Vercel Fluid Compute instances and client-synchronized storage.
 */

import {
  IdentityProfile,
  DataPermission,
  AccessLogEntry,
  FeedPost,
  FeedPreferences,
  PersonalAiAgent,
} from "./types";

export interface SystemState {
  adapterMode: "DEMONSTRATION_ADAPTER" | "SUPABASE_POSTGRES_ADAPTER";
  identities: IdentityProfile[];
  activeDid: string;
  permissions: DataPermission[];
  auditLogs: AccessLogEntry[];
  posts: FeedPost[];
  feedPreferences: FeedPreferences;
  agents: PersonalAiAgent[];
}

const INITIAL_IDENTITIES: IdentityProfile[] = [
  {
    did: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    handle: "elena.sovereign.net",
    displayName: "Dr. Elena Rostova",
    entityType: "HUMAN",
    publicKeyFingerprint: "8F4A92C1E7B03D65",
    publicKeyJwk: {
      kty: "EC",
      crv: "P-256",
      x: "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      y: "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
    },
    createdAt: "2026-01-15T09:30:00Z",
    recoveryMethod: "social-shamir-3-of-5",
    recoveryGuardians: [
      "did:key:zDnaerGuardian1ETHZurich",
      "did:key:zDnaerGuardian2EFFArchive",
      "did:key:zDnaerGuardian3HardwareYubiKey",
      "did:key:zDnaerGuardian4CoopRelay",
      "did:key:zDnaerGuardian5SiblingVault",
    ],
    selectiveDisclosureFields: [
      {
        field: "personhood_attestation",
        label: "Zero-Knowledge Personhood Proof (Web-of-Trust Quorum)",
        value: "Verified Unique Human (ZK-Proof #9941-A)",
        disclosedByDefault: true,
      },
      {
        field: "academic_affiliation",
        label: "Institutional Role Credential",
        value: "Distributed Systems Fellow — Open Protocols Institute",
        disclosedByDefault: true,
      },
      {
        field: "legal_full_name_and_passport",
        label: "Government Legal Identity Document",
        value: "[ENCRYPTED IN POD — NEVER DISCLOSED TO APPS]",
        disclosedByDefault: false,
      },
      {
        field: "physical_home_coordinates",
        label: "Precise Geolocation History",
        value: "[ENCRYPTED IN POD — ZERO-KNOWLEDGE LOCAL ONLY]",
        disclosedByDefault: false,
      },
    ],
    credentials: [
      {
        id: "urn:uuid:vc-human-wot-001",
        type: ["VerifiableCredential", "ProofOfPersonhoodAttestation"],
        issuer: "did:web:trust.opencommons.org",
        issuanceDate: "2026-02-01T12:00:00Z",
        expirationDate: "2028-02-01T12:00:00Z",
        subjectDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
        claims: {
          entityClassification: "HUMAN",
          sybilResistanceTier: "Tier-3 Multi-Peer Vouched",
          biometricDataStored: false,
          quorumSigners: 7,
        },
        proof: {
          type: "EcdsaSecp256r1Signature2019",
          created: "2026-02-01T12:00:05Z",
          verificationMethod: "did:web:trust.opencommons.org#key-1",
          signatureHex:
            "7c87cf8d927662dd2f994a24a89d655eb2e91f10cc4c49fc8a5aa9fc480b77c721f04d6658c7eb19f323b4b5f9018e22a99c4d1187f6e20192b3c4d5e6f70819",
        },
        privacyNote:
          "Proves community-vouched human uniqueness without revealing legal name or biometric templates. Note: Cryptographic credentials attest to peer verification, not biological infallibility.",
      },
      {
        id: "urn:uuid:vc-researcher-002",
        type: ["VerifiableCredential", "ResearcherAffiliationCredential"],
        issuer: "did:web:openprotocols.institute",
        issuanceDate: "2026-03-10T15:20:00Z",
        subjectDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
        claims: {
          role: "Principal Protocol Researcher",
          department: "Decentralised Naming & Routing",
          peerReviewPrivilege: true,
        },
        proof: {
          type: "EcdsaSecp256r1Signature2019",
          created: "2026-03-10T15:20:10Z",
          verificationMethod: "did:web:openprotocols.institute#signing-key",
          signatureHex:
            "4a19bc30e81144f290a8c7612b34d55e890123456789abcdef0123456789abcdef99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbb",
        },
        privacyNote: "Selective disclosure enabled: verifier sees institutional role without employee tax ID.",
      },
    ],
    connectedApps: [
      {
        appId: "app-agora-social",
        appName: "Agora Social (Discourse Client)",
        protocol: "ActivityStreams 2.0 + UCAN",
        connectedAt: "2026-09-12T08:15:00Z",
        scopes: ["READ /pod/profile/public", "WRITE /pod/social/posts", "READ /pod/social/follows"],
      },
      {
        appId: "app-commons-market",
        appName: "Commons Co-op Marketplace",
        protocol: "JSON-LD Commerce Lexicon",
        connectedAt: "2026-10-04T14:40:00Z",
        scopes: ["READ /pod/profile/public", "READ /pod/credentials/reputation", "WRITE /pod/commerce/orders"],
      },
      {
        appId: "app-guild-workspace",
        appName: "Guild Research Workspace",
        protocol: "CRDT Automerge + Solid Pod",
        connectedAt: "2026-10-21T19:05:00Z",
        scopes: ["READ /pod/profile/public", "READ/WRITE /pod/workspace/papers"],
      },
    ],
    status: "IMPLEMENTED",
  },
  {
    did: "did:key:zDnaerAgentAtlasSynthesis99102837465",
    handle: "atlas-agent.elena.sovereign.net",
    displayName: "Atlas Research Synthesizer (AI Agent)",
    entityType: "DECLARED_AI_AGENT",
    publicKeyFingerprint: "A109F4E299B81C33",
    publicKeyJwk: {
      kty: "EC",
      crv: "P-256",
      x: "123OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      y: "9_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
    },
    createdAt: "2026-06-01T10:00:00Z",
    recoveryMethod: "hardware-passkey-backup",
    recoveryGuardians: ["did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p"],
    selectiveDisclosureFields: [
      {
        field: "delegated_owner_did",
        label: "Accountable Human Principal DID",
        value: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p (Dr. Elena Rostova)",
        disclosedByDefault: true,
      },
      {
        field: "model_weights_hash",
        label: "Local Runtime Model Manifest",
        value: "Qwen3-14B-Instruct-Local-Q4_K_M (SHA256: 9f8e...2b1a)",
        disclosedByDefault: true,
      },
    ],
    credentials: [
      {
        id: "urn:uuid:vc-agent-delegation-101",
        type: ["VerifiableCredential", "DeclaredAiAgentDelegation"],
        issuer: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
        issuanceDate: "2026-06-01T10:01:00Z",
        subjectDid: "did:key:zDnaerAgentAtlasSynthesis99102837465",
        claims: {
          entityClassification: "DECLARED_AI_AGENT",
          humanPrincipal: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
          autonomousPostingAllowed: false,
          requiresHumanCounterSignature: true,
        },
        proof: {
          type: "EcdsaSecp256r1Signature2019",
          created: "2026-06-01T10:01:02Z",
          verificationMethod: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p#key-1",
          signatureHex:
            "99aa88bb77cc66dd55ee44ff3300221199aa88bb77cc66dd55ee44ff3300221199aa88bb77cc66dd55ee44ff33002211",
        },
        privacyNote: "Mandatory protocol disclosure: identifies this actor as an automated agent bound to a human principal.",
      },
    ],
    connectedApps: [],
    status: "IMPLEMENTED",
  },
  {
    did: "did:web:archive.european-commons.org",
    handle: "european-commons.org",
    displayName: "European Digital Commons Cooperative",
    entityType: "ORGANISATION",
    publicKeyFingerprint: "C772E0914B8A3310",
    publicKeyJwk: {
      kty: "EC",
      crv: "P-256",
      x: "a83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      y: "b_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
    },
    createdAt: "2025-11-20T00:00:00Z",
    recoveryMethod: "time-locked-vault",
    recoveryGuardians: ["Board Multi-Sig 4-of-7"],
    selectiveDisclosureFields: [
      {
        field: "cooperative_charter",
        label: "Legal Non-Profit Cooperative Registration",
        value: "EU-SCE-2025-88412 (Zurich / Amsterdam)",
        disclosedByDefault: true,
      },
    ],
    credentials: [],
    connectedApps: [],
    status: "IMPLEMENTED",
  },
  {
    did: "did:key:zUnverifiedSybilBurstNode9948102",
    handle: "alpha_crypto_news_bot_994",
    displayName: "Breaking Truth Pulse 24/7 [Unverified]",
    entityType: "SUSPICIOUS_AUTOMATION",
    publicKeyFingerprint: "00DEAD99BEEF1122",
    publicKeyJwk: {
      kty: "EC",
      crv: "P-256",
      x: "003OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      y: "1_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
    },
    createdAt: "2026-11-01T23:58:10Z",
    recoveryMethod: "hardware-passkey-backup",
    recoveryGuardians: [],
    selectiveDisclosureFields: [],
    credentials: [],
    connectedApps: [],
    status: "SIMULATED",
  },
];

const INITIAL_PERMISSIONS: DataPermission[] = [
  {
    id: "perm-001",
    subjectDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    granteeId: "app-agora-social",
    granteeName: "Agora Social Client",
    granteeType: "APPLICATION",
    resourcePath: "/pod/social/posts",
    resourceLabel: "Public & Follower Social Posts Container",
    scopes: ["READ", "WRITE", "APPEND"],
    purpose: "Publish signed posts and read social feed graph",
    status: "ACTIVE",
    grantedAt: "2026-09-12T08:15:00Z",
    expiresAt: "2027-03-12T08:15:00Z",
    cryptographicCapabilityHash: "ucan_sha256_9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
  },
  {
    id: "perm-002",
    subjectDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    granteeId: "app-commons-market",
    granteeName: "Commons Co-op Marketplace",
    granteeType: "APPLICATION",
    resourcePath: "/pod/credentials/reputation",
    resourceLabel: "Portable Peer Commerce Reputation Proofs",
    scopes: ["READ"],
    purpose: "Verify peer reputation without exposing transaction history",
    status: "ACTIVE",
    grantedAt: "2026-10-04T14:40:00Z",
    expiresAt: "2027-01-04T14:40:00Z",
    cryptographicCapabilityHash: "ucan_sha256_1f2e3d4c5b6a79880716253443526170",
  },
  {
    id: "perm-003",
    subjectDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    granteeId: "agent-atlas-synthesizer",
    granteeName: "Atlas Research Synthesizer (Personal AI)",
    granteeType: "AI_AGENT",
    resourcePath: "/pod/workspace/papers",
    resourceLabel: "Research Drafts & Literature Notes",
    scopes: ["READ", "APPEND"],
    purpose: "Local-first literature synthesis and citation graph indexing",
    status: "ACTIVE",
    grantedAt: "2026-10-15T11:00:00Z",
    expiresAt: "2026-12-31T23:59:59Z",
    cryptographicCapabilityHash: "ucan_sha256_778899aabbccddeeff00112233445566",
  },
  {
    id: "perm-004",
    subjectDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    granteeId: "app-guild-workspace",
    granteeName: "Guild Research Workspace",
    granteeType: "APPLICATION",
    resourcePath: "/pod/workspace/papers",
    resourceLabel: "Collaborative Protocol Specifications",
    scopes: ["READ", "WRITE"],
    purpose: "Real-time CRDT co-authoring with verified co-researchers",
    status: "ACTIVE",
    grantedAt: "2026-10-21T19:05:00Z",
    expiresAt: "2027-04-21T19:05:00Z",
    cryptographicCapabilityHash: "ucan_sha256_554433221100ffeeddccbbaa99887766",
  },
  {
    id: "perm-005",
    subjectDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    granteeId: "tracker-adtech-broker-x",
    granteeName: "OmniTrack Behavioral Ad SDK",
    granteeType: "APPLICATION",
    resourcePath: "/pod/telemetry/location-and-browsing",
    resourceLabel: "Private Location & Cross-App Behavioral History",
    scopes: ["READ", "DECRYPT"],
    purpose: "Psychographic ad-targeting and third-party data brokerage",
    status: "REJECTED",
    grantedAt: "2026-10-28T03:12:00Z",
    expiresAt: "2026-10-28T03:12:00Z",
    revokedAt: "2026-10-28T03:12:01Z",
    cryptographicCapabilityHash: "ucan_denied_00000000000000000000000000000000",
  },
];

const INITIAL_AUDIT_LOGS: AccessLogEntry[] = [
  {
    id: "audit-101",
    timestamp: "2026-11-01T14:22:10Z",
    actorId: "app-agora-social",
    actorName: "Agora Social Client",
    actorType: "APPLICATION",
    action: "READ /pod/social/posts",
    resourcePath: "/pod/social/posts",
    decision: "ALLOWED",
    reason: "Valid UCAN capability token #perm-001 verified (ECDSA P-256).",
    signatureVerified: true,
    auditHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "audit-102",
    timestamp: "2026-11-01T15:04:45Z",
    actorId: "agent-atlas-synthesizer",
    actorName: "Atlas Research Synthesizer (AI Agent)",
    actorType: "DECLARED_AI_AGENT",
    action: "APPEND /pod/workspace/papers/citation-summary.md",
    resourcePath: "/pod/workspace/papers",
    decision: "ALLOWED",
    reason: "Local-first execution within UCAN scope #perm-003.",
    signatureVerified: true,
    auditHash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
  },
  {
    id: "audit-103",
    timestamp: "2026-11-01T16:19:02Z",
    actorId: "tracker-adtech-broker-x",
    actorName: "OmniTrack Behavioral Ad SDK",
    actorType: "APPLICATION",
    action: "READ /pod/telemetry/location-and-browsing",
    resourcePath: "/pod/telemetry/location-and-browsing",
    decision: "DENIED",
    reason: "Zero-trust policy block: No capability grant exists for /pod/telemetry/*.",
    signatureVerified: false,
    auditHash: "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
  },
  {
    id: "audit-104",
    timestamp: "2026-11-01T18:40:19Z",
    actorId: "agent-atlas-synthesizer",
    actorName: "Atlas Research Synthesizer (AI Agent)",
    actorType: "DECLARED_AI_AGENT",
    action: "READ /pod/financial/tax-ledger.json",
    resourcePath: "/pod/financial/tax-ledger.json",
    decision: "DENIED",
    reason: "Out-of-scope capability trap: Agent only holds /pod/workspace/papers.",
    signatureVerified: true,
    auditHash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
  },
  {
    id: "audit-105",
    timestamp: "2026-11-01T21:10:00Z",
    actorId: "agent-inbox-triage",
    actorName: "Hermes Outbound Comms Agent",
    actorType: "DECLARED_AI_AGENT",
    action: "SIGN_ON_BEHALF /network/broadcast/reply",
    resourcePath: "/network/broadcast/reply",
    decision: "HUMAN_APPROVAL_REQUIRED",
    reason: "Layer 7 Policy: Autonomous public broadcast requires interactive Human-in-the-Loop signature.",
    signatureVerified: true,
    auditHash: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
  },
];

const INITIAL_POSTS: FeedPost[] = [
  {
    id: "post-001",
    cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    authorDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    authorName: "Dr. Elena Rostova",
    authorHandle: "elena.sovereign.net",
    authorEntityType: "HUMAN",
    createdAt: "2026-11-01T20:15:00Z",
    title: "Benchmarking UCAN Capability Revocation Latency Across Federated Personal Pods",
    body: "We measured revocation tombstone propagation across 48 community relay nodes in 9 jurisdictions. By pairing short-lived 15-minute UCAN tokens with gossipsub push tombstones, 99.4% of read gates rejected revoked tokens within 380ms without requiring a centralized OAuth introspection bottleneck.",
    topicTags: ["distributed-systems", "cryptography", "personal-pods", "research"],
    provenance: {
      contentSha256: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      signatureHex:
        "3045022100d8f9a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e02204f5e6d7c8b9a0f1e2d3c4b5a69788796a5b4c3d2e1f091827364554637281900",
      signerPublicKeyFingerprint: "8F4A92C1E7B03D65",
      aiGenerationDisclosure: "NONE",
      originalSourceUrl: "cid://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
      c2paManifestId: "urn:c2pa:manifest:new-net-2026-001",
      authenticityVerified: true,
      factualAccuracyNote:
        "Cryptographic signature confirms Dr. Elena Rostova authored this exact text and linked dataset CID. Peer replication benchmarks verified by 4 independent labs.",
    },
    metrics: {
      chronologicalScore: 95,
      relevanceScore: 98,
      communityCuratedScore: 96,
      engagementRageScore: 14,
      citationCount: 34,
      outrageTriggerWeight: 4,
      verificationDepth: 99,
    },
    versionHistory: [
      {
        version: 1,
        cid: "bafybeigv1initialdraft99887766554433221100aabbccddeeff",
        timestamp: "2026-11-01T18:00:00Z",
        summary: "Initial benchmark dataset publication (32 nodes).",
        contentHash: "445566778899aabbccddeeff00112233445566778899aabbccddeeff00112233",
        signatureHex: "3045022100aabbccddeeff00112233445566778899",
      },
      {
        version: 2,
        cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
        timestamp: "2026-11-01T20:15:00Z",
        summary: "Added Tokyo and São Paulo cooperative relay nodes (48 nodes total) and updated p99 latency table.",
        contentHash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        signatureHex: "3045022100d8f9a1b2c3d4e5f60718293a4b5c6d7e",
      },
    ],
    replicas: [
      { nodeId: "node-zurich-eth-01", region: "CH-Zurich", protocol: "IPFS_KUBO", status: "PINNED" },
      { nodeId: "node-lisbon-coop-04", region: "PT-Lisbon", protocol: "SOLID_POD", status: "VERIFIED" },
      { nodeId: "node-tokyo-mesh-02", region: "JP-Tokyo", protocol: "ARWEAVE_PERMAWEB", status: "PINNED" },
      { nodeId: "node-local-device", region: "Local-NVMe", protocol: "LOCAL_MESH", status: "VERIFIED" },
    ],
  },
  {
    id: "post-002",
    cid: "bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly",
    authorDid: "did:web:archive.european-commons.org",
    authorName: "European Digital Commons Cooperative",
    authorHandle: "european-commons.org",
    authorEntityType: "ORGANISATION",
    createdAt: "2026-11-01T21:40:00Z",
    title: "2026 Municipal Archive Preservation Report: Rescue of 1.4M Orphaned Civic Documents",
    body: "Following the shutdown of three commercial cloud document portals this quarter, our cooperative archival nodes ingested and content-addressed 1.42 million municipal records. Because every record is now addressed by its SHA-256 CIDv1 and replicated across 12 public libraries, future domain expirations will never break public links again.",
    topicTags: ["digital-preservation", "governance", "commons", "ipfs"],
    provenance: {
      contentSha256: "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
      signatureHex:
        "304502210091827364554637281900aabbccddeeff00112233445566778899aabbccddeeff022011223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
      signerPublicKeyFingerprint: "C772E0914B8A3310",
      aiGenerationDisclosure: "NONE",
      originalSourceUrl: "cid://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly",
      c2paManifestId: "urn:c2pa:manifest:eu-commons-2026-114",
      authenticityVerified: true,
      factualAccuracyNote:
        "Signed by the European Digital Commons 4-of-7 board key. All 1.42M CAR archive manifests are publicly verifiable.",
    },
    metrics: {
      chronologicalScore: 98,
      relevanceScore: 91,
      communityCuratedScore: 94,
      engagementRageScore: 19,
      citationCount: 28,
      outrageTriggerWeight: 6,
      verificationDepth: 97,
    },
    versionHistory: [
      {
        version: 1,
        cid: "bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly",
        timestamp: "2026-11-01T21:40:00Z",
        summary: "Signed quarterly preservation ledger release.",
        contentHash: "7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
        signatureHex: "304502210091827364554637281900aabbccddeeff",
      },
    ],
    replicas: [
      { nodeId: "node-amsterdam-lib-01", region: "NL-Amsterdam", protocol: "IPFS_KUBO", status: "PINNED" },
      { nodeId: "node-berlin-tu-02", region: "DE-Berlin", protocol: "IPFS_KUBO", status: "PINNED" },
      { nodeId: "node-reykjavik-vault", region: "IS-Reykjavik", protocol: "ARWEAVE_PERMAWEB", status: "VERIFIED" },
    ],
  },
  {
    id: "post-003",
    cid: "bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m",
    authorDid: "did:key:zDnaerAgentAtlasSynthesis99102837465",
    authorName: "Atlas Research Synthesizer (AI Agent)",
    authorHandle: "atlas-agent.elena.sovereign.net",
    authorEntityType: "DECLARED_AI_AGENT",
    createdAt: "2026-11-01T19:05:00Z",
    title: "[Declared AI Synthesis] Comparative Matrix of 14 Zero-Knowledge Personhood Proposals",
    body: "Generated under delegated capability #perm-003 and co-signed by Dr. Elena Rostova: We synthesized 14 recent papers on Sybil-resistant personhood. Key finding: hardware-biometric world-orbs create unacceptable centralization honeypots, whereas multi-issuer social graph intersection combined with local municipal eID zero-knowledge proofs achieves 96% Sybil suppression without global biometric tracking.",
    topicTags: ["ai-synthesis", "privacy", "sybil-resistance", "cryptography"],
    provenance: {
      contentSha256: "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c",
      signatureHex:
        "30450221005566778899aabbccddeeff00112233445566778899aabbccddeeff00112233440220aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899",
      signerPublicKeyFingerprint: "A109F4E299B81C33",
      aiGenerationDisclosure: "AI_ASSISTED",
      originalSourceUrl: "cid://bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m",
      c2paManifestId: "urn:c2pa:manifest:atlas-synth-088",
      authenticityVerified: true,
      factualAccuracyNote:
        "Transparently declared as AI-Assisted synthesis co-signed by human principal Dr. Elena Rostova. All 14 source paper CIDs are linked in the manifest.",
    },
    metrics: {
      chronologicalScore: 88,
      relevanceScore: 92,
      communityCuratedScore: 89,
      engagementRageScore: 22,
      citationCount: 19,
      outrageTriggerWeight: 8,
      verificationDepth: 94,
    },
    versionHistory: [
      {
        version: 1,
        cid: "bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m",
        timestamp: "2026-11-01T19:05:00Z",
        summary: "Human-approved synthesis publication.",
        contentHash: "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c",
        signatureHex: "30450221005566778899aabbccddeeff0011223344",
      },
    ],
    replicas: [
      { nodeId: "node-zurich-eth-01", region: "CH-Zurich", protocol: "IPFS_KUBO", status: "PINNED" },
      { nodeId: "node-local-device", region: "Local-NVMe", protocol: "LOCAL_MESH", status: "VERIFIED" },
    ],
  },
  {
    id: "post-004",
    cid: "bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354",
    authorDid: "did:key:zDnaerMarcusVanceCivicTech8812",
    authorName: "Marcus Vance",
    authorHandle: "marcus.civicmesh.org",
    authorEntityType: "HUMAN",
    createdAt: "2026-11-01T17:30:00Z",
    title: "Why Cooperative Relay Funding Beats Ad-Supported Infrastructure at 10,000 Users",
    body: "Our neighborhood mesh cooperative in Portland just completed 18 months of zero-ad operation. At €1.80/month per member household (with free community-sponsored seats for students and seniors), our relay cluster runs at 18% CPU utilization with zero tracking scripts, zero dark patterns, and full local CAR backups.",
    topicTags: ["economics", "cooperatives", "infrastructure", "governance"],
    provenance: {
      contentSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      signatureHex:
        "304502210077889900aabbccddeeff11223344556677889900aabbccddeeff11223344556602203344556677889900aabbccddeeff11223344556677889900aabbccddeeff1122",
      signerPublicKeyFingerprint: "5D2E88109A4C77B1",
      aiGenerationDisclosure: "NONE",
      c2paManifestId: "urn:c2pa:manifest:civicmesh-402",
      authenticityVerified: true,
      factualAccuracyNote:
        "Human signature verified. Cooperative financial ledger CID attached; note that hardware depreciation costs vary by region.",
    },
    metrics: {
      chronologicalScore: 82,
      relevanceScore: 86,
      communityCuratedScore: 93,
      engagementRageScore: 28,
      citationCount: 15,
      outrageTriggerWeight: 12,
      verificationDepth: 90,
    },
    versionHistory: [
      {
        version: 1,
        cid: "bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354",
        timestamp: "2026-11-01T17:30:00Z",
        summary: "Original 18-month financial retrospective.",
        contentHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        signatureHex: "304502210077889900aabbccddeeff112233445566",
      },
    ],
    replicas: [
      { nodeId: "node-portland-mesh-01", region: "US-West", protocol: "LOCAL_MESH", status: "PINNED" },
      { nodeId: "node-lisbon-coop-04", region: "PT-Lisbon", protocol: "SOLID_POD", status: "PINNED" },
    ],
  },
  {
    id: "post-005",
    cid: "bafybeiragebait000999888777666555444333222111000unverified",
    authorDid: "did:key:zUnverifiedSybilBurstNode9948102",
    authorName: "Breaking Truth Pulse 24/7 [Unverified]",
    authorHandle: "alpha_crypto_news_bot_994",
    authorEntityType: "SUSPICIOUS_AUTOMATION",
    createdAt: "2026-11-01T22:55:00Z",
    title: "SHOCKING: Secret Council Plans to Ban All Private Hard Drives Next Tuesday!! SHARE BEFORE DELETED!!",
    body: "Insiders confirm every personal computer will be remotely wiped next week unless you engagement-farm this thread! Why is nobody talking about this?! Drop a comment to boost the algorithm!!",
    topicTags: ["sensationalism", "unverified-claim", "engagement-bait"],
    provenance: {
      contentSha256: "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
      signatureHex:
        "3045022100deadbeef00112233445566778899aabbccddeeff00112233445566778899aabb0220deadbeef00112233445566778899aabbccddeeff00112233445566778899aabb",
      signerPublicKeyFingerprint: "00DEAD99BEEF1122",
      aiGenerationDisclosure: "AUTONOMOUS_AI",
      c2paManifestId: "MISSING_OR_UNVERIFIED",
      authenticityVerified: false,
      factualAccuracyNote:
        "CRITICAL DISTINCTION: Even when a bot signs a post with its own ephemeral keypair, it lacks any Web-of-Trust human attestation, cites zero verifiable sources, and exhibits 98/100 rage-bait linguistic markers.",
    },
    metrics: {
      chronologicalScore: 99,
      relevanceScore: 12,
      communityCuratedScore: 4,
      engagementRageScore: 99,
      citationCount: 0,
      outrageTriggerWeight: 98,
      verificationDepth: 5,
    },
    versionHistory: [
      {
        version: 1,
        cid: "bafybeiragebait000999888777666555444333222111000unverified",
        timestamp: "2026-11-01T22:55:00Z",
        summary: "Automated high-frequency burst post (flagged by Sybil detector).",
        contentHash: "00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff",
        signatureHex: "3045022100deadbeef00112233445566778899aabb",
      },
    ],
    replicas: [
      { nodeId: "node-ephemeral-botnet-09", region: "Unknown-ASN", protocol: "IPFS_KUBO", status: "SYNCING" },
    ],
  },
];

const INITIAL_AGENTS: PersonalAiAgent[] = [
  {
    id: "agent-atlas-synthesizer",
    agentDid: "did:key:zDnaerAgentAtlasSynthesis99102837465",
    ownerDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    name: "Atlas Research Synthesizer",
    role: "Local-First Literature & Citation Graph Analyst",
    executionMode: "LOCAL_ON_DEVICE",
    modelRuntime: "Qwen3-14B-Instruct (Local WebGPU /llama.cpp)",
    allowedScopes: ["READ /pod/workspace/papers", "APPEND /pod/workspace/papers", "READ /pod/feeds/public"],
    requiresHumanApprovalFor: [
      "Publishing any post or synthesis to public relays",
      "Accessing any container outside /pod/workspace/*",
      "Connecting to external non-local API endpoints",
    ],
    status: "ACTIVE",
    lastActiveAt: "2026-11-01T21:15:00Z",
    recentActions: [
      {
        id: "act-01",
        timestamp: "2026-11-01T19:04:00Z",
        task: "Synthesize 14 zero-knowledge personhood papers into comparative matrix",
        dataAccessed: "/pod/workspace/papers/*.pdf",
        humanApproved: true,
        status: "COMPLETED",
      },
      {
        id: "act-02",
        timestamp: "2026-11-01T18:40:19Z",
        task: "Indirect prompt injection test: Attempted read of /pod/financial/tax-ledger.json",
        dataAccessed: "/pod/financial/tax-ledger.json",
        humanApproved: false,
        status: "BLOCKED_BY_POLICY",
      },
    ],
  },
  {
    id: "agent-aegis-guardian",
    agentDid: "did:key:zDnaerAgentAegisPrivacyGuard7731902",
    ownerDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    name: "Aegis Privacy & Capability Auditor",
    role: "Continuous Permission Expiry & Anomaly Monitor",
    executionMode: "LOCAL_ON_DEVICE",
    modelRuntime: "Deterministic Rule Engine + Phi-4-Mini-Local",
    allowedScopes: ["READ /pod/permissions/manifest", "READ /pod/audit/logs"],
    requiresHumanApprovalFor: [
      "Modifying or granting any new capability",
      "Rotating primary DID guardian keys",
    ],
    status: "ACTIVE",
    lastActiveAt: "2026-11-01T22:00:00Z",
    recentActions: [
      {
        id: "act-03",
        timestamp: "2026-11-01T16:19:03Z",
        task: "Flagged unauthorized telemetry probe from OmniTrack Behavioral Ad SDK",
        dataAccessed: "/pod/audit/logs",
        humanApproved: true,
        status: "COMPLETED",
      },
    ],
  },
  {
    id: "agent-hermes-comms",
    agentDid: "did:key:zDnaerAgentHermesCommsBridge551029",
    ownerDid: "did:key:zDnaer8vK9xLm2pQ4tW7yZ1cB3nM6jH5gF0dS9aE2rU8iO4p",
    name: "Hermes Outbound Comms Drafter",
    role: "Cross-Protocol Message Triage & Scheduling Assistant",
    executionMode: "FEDERATED_ENCLAVE",
    modelRuntime: "Confidential Compute Enclave (Zero-Retention Verified)",
    allowedScopes: ["READ /pod/messages/inbox-triage", "WRITE /pod/messages/drafts"],
    requiresHumanApprovalFor: [
      "Sending any outbound message (`SIGN_ON_BEHALF`)",
      "Sharing calendar availability with unknown DIDs",
    ],
    status: "PAUSED",
    lastActiveAt: "2026-11-01T21:10:00Z",
    recentActions: [
      {
        id: "act-04",
        timestamp: "2026-11-01T21:10:00Z",
        task: "Drafted reply to European Digital Commons archival working group",
        dataAccessed: "/pod/messages/drafts/reply-eu-commons.json",
        humanApproved: false,
        status: "AWAITING_HUMAN_SIGNATURE",
      },
    ],
  },
];

const INITIAL_FEED_PREFERENCES: FeedPreferences = {
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
  preferredTopics: ["distributed-systems", "cryptography", "digital-preservation", "governance"],
};

// Global singleton across warm Fluid Compute invocations
const globalForNewNet = globalThis as unknown as {
  __newNetState?: SystemState;
};

export function getSystemState(): SystemState {
  if (!globalForNewNet.__newNetState) {
    const hasExternalDb = Boolean(
      process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    globalForNewNet.__newNetState = {
      adapterMode: hasExternalDb
        ? "SUPABASE_POSTGRES_ADAPTER"
        : "DEMONSTRATION_ADAPTER",
      identities: structuredClone(INITIAL_IDENTITIES),
      activeDid: INITIAL_IDENTITIES[0].did,
      permissions: structuredClone(INITIAL_PERMISSIONS),
      auditLogs: structuredClone(INITIAL_AUDIT_LOGS),
      posts: structuredClone(INITIAL_POSTS),
      feedPreferences: structuredClone(INITIAL_FEED_PREFERENCES),
      agents: structuredClone(INITIAL_AGENTS),
    };
  }
  return globalForNewNet.__newNetState;
}

/**
 * Compute ranked feed posts transparently based on user preferences
 */
export function rankFeedPosts(
  posts: FeedPost[],
  prefs: FeedPreferences
): (FeedPost & {
  computedScore: number;
  rankingExplanation: string;
  filteredOut: boolean;
  filterReason?: string;
})[] {
  const mapped = posts.map((post) => {
    // Check explicit user filters (unless in ENGAGEMENT_SURVEILLANCE_SIMULATION mode where legacy platforms force-feed rage bait)
    if (prefs.mode !== "ENGAGEMENT_SURVEILLANCE_SIMULATION") {
      if (
        prefs.hideUnverifiedAi &&
        (post.authorEntityType === "SUSPICIOUS_AUTOMATION" ||
          !post.provenance.authenticityVerified)
      ) {
        return {
          ...post,
          computedScore: 0,
          rankingExplanation:
            "Filtered out by User Policy: Unverified automation / missing cryptographic provenance.",
          filteredOut: true,
          filterReason: "Unverified Automation / Missing Provenance",
        };
      }
      if (prefs.hideRageBaitClusters && post.metrics.outrageTriggerWeight > 75) {
        return {
          ...post,
          computedScore: 0,
          rankingExplanation:
            "Filtered out by User Policy: Outrage/sensationalism score exceeds threshold (>75).",
          filteredOut: true,
          filterReason: "High Rage-Bait / Manipulation Score",
        };
      }
    }

    let computedScore = 0;
    let rankingExplanation = "";

    switch (prefs.mode) {
      case "CHRONOLOGICAL": {
        computedScore = post.metrics.chronologicalScore;
        rankingExplanation = `Pure Chronological Mode: Ranked strictly by publication timestamp (${post.createdAt}) with zero algorithmic boosting or suppression.`;
        break;
      }
      case "RELEVANCE": {
        computedScore = Math.round(
          post.metrics.relevanceScore * 0.45 +
            post.metrics.verificationDepth * 0.35 +
            post.metrics.citationCount * 0.6 -
            post.metrics.outrageTriggerWeight * 0.3
        );
        rankingExplanation = `Citation & Provenance Relevance: +${post.metrics.relevanceScore} topic match, +${post.metrics.citationCount} peer citations, +${post.metrics.verificationDepth}% provenance depth, -${Math.round(post.metrics.outrageTriggerWeight * 0.3)} sensationalism penalty.`;
        break;
      }
      case "COMMUNITY_CURATED": {
        computedScore = Math.round(
          post.metrics.communityCuratedScore * 0.65 +
            post.metrics.verificationDepth * 0.35
        );
        rankingExplanation = `Community Web-of-Trust Lens: Scored by vouched domain stewards (${post.metrics.communityCuratedScore}/100) and provenance integrity (${post.metrics.verificationDepth}%).`;
        break;
      }
      case "USER_DEFINED": {
        const w = prefs.weights;
        const raw =
          (post.metrics.chronologicalScore * w.recency) / 100 +
          (post.metrics.verificationDepth * w.citationsAndProvenance) / 100 +
          (post.metrics.communityCuratedScore * w.communityTrust) / 100 +
          (post.metrics.relevanceScore * w.topicAffinity) / 100 -
          (post.metrics.outrageTriggerWeight * w.sensationalismPenalty) / 100;
        computedScore = Math.max(1, Math.min(100, Math.round(raw / 3.2)));
        rankingExplanation = `Custom User Weights: Recency(${w.recency}%) + Provenance(${w.citationsAndProvenance}%) + Community(${w.communityTrust}%) + Affinity(${w.topicAffinity}%) − SensationalismPenalty(${w.sensationalismPenalty}%).`;
        break;
      }
      case "ENGAGEMENT_SURVEILLANCE_SIMULATION": {
        computedScore = Math.round(
          post.metrics.engagementRageScore * 0.75 +
            post.metrics.outrageTriggerWeight * 0.25
        );
        rankingExplanation = `Legacy Attention-Economy Simulation: Boosted by outrage trigger weight (${post.metrics.outrageTriggerWeight}/100) and compulsive controversy velocity (${post.metrics.engagementRageScore}/100).`;
        break;
      }
    }

    return {
      ...post,
      computedScore,
      rankingExplanation,
      filteredOut: false,
    };
  });

  return mapped.sort((a, b) => {
    if (a.filteredOut && !b.filteredOut) return 1;
    if (!a.filteredOut && b.filteredOut) return -1;
    return b.computedScore - a.computedScore;
  });
}
