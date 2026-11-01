# NEW NET — Detailed Architecture & Threat Model Specification

> **Status Note:** NEW NET is a proposed next-generation internet architecture under active research and engineering development. It is designed to demonstrate how self-sovereign identity, personal data pods, content-addressed storage, algorithm independence, cryptographic provenance, and fiduciary personal AI can address the structural decay of today's internet.

## 1. Seven-Layer Reference Architecture

```
+-----------------------------------------------------------------------------------+
| LAYER 7: PERSONAL AI & SOVEREIGN AUTOMATION                                       |
| • Delegated Agent DIDs • Local-First Inference • Out-of-Context UCAN Sandboxes    |
| • Mandatory Human-in-the-Loop (HITL) Signatures • Emergency Kill-Switch           |
+-----------------------------------------------------------------------------------+
| LAYER 6: SECURITY, CRYPTOGRAPHY & TRUST                                           |
| • WebCrypto ECDSA P-256 / Ed25519 • IETF MLS (RFC 9420) E2EE • Merkle Audit Logs  |
+-----------------------------------------------------------------------------------+
| LAYER 5: INFORMATION DISCOVERY, PROVENANCE & PRESERVATION                         |
| • User-Selected Ranking Lenses • C2PA Provenance • Authenticity != Factual Truth  |
+-----------------------------------------------------------------------------------+
| LAYER 4: INTEROPERABLE APPLICATION ECOSYSTEM                                      |
| • Agora Social • Commons Marketplace • Guild Workspace • Shared JSON-LD Lexicons  |
+-----------------------------------------------------------------------------------+
| LAYER 3: DECENTRALISED NETWORK & CONTENT-ADDRESSED STORAGE                        |
| • SHA-256 CIDv1 Content Addressing • IPFS/Solid/Arweave Pinning • libp2p/WebRTC   |
+-----------------------------------------------------------------------------------+
| LAYER 2: PERSONAL DATA SOVEREIGNTY                                                |
| • Encrypted Personal Data Pods • Path-Scoped UCAN Capabilities • Instant Revoke   |
+-----------------------------------------------------------------------------------+
| LAYER 1: SELF-SOVEREIGN DIGITAL IDENTITY                                          |
| • W3C DIDs (did:key / did:plc) • Verifiable Credentials • 3-of-5 Shamir Recovery  |
+-----------------------------------------------------------------------------------+
```

## 2. Implementation Status Taxonomy

Every subsystem in NEW NET is explicitly labelled:

- **IMPLEMENTED**: Genuinely functional in this repository (e.g., Web Crypto ECDSA P-256 keypair generation, SHA-256 CIDv1 derivation, 15 Zod-validated Next.js API Route Handlers, interactive 9-mode React Flow explorer, and 8 functional Playground labs).
- **SIMULATED**: Demonstrated using deterministic state in our clearly labelled `DEMONSTRATION_ADAPTER` (e.g., multi-region IPFS/Solid/Arweave replica node pinning and Sybil burst classification).
- **PROPOSED**: Architecturally specified with protocol schemas, awaiting multi-node daemon deployment (e.g., IETF MLS group ratcheting and composable community moderation arbitration).
- **RESEARCH REQUIRED**: Open distributed-systems and economic research questions (e.g., post-quantum zero-knowledge BBS+ credentials, state-level partition healing, and global cooperative hosting economics).
