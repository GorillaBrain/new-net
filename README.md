# NEW NET

**THE INTERNET DOESN’T HAVE TO WORK THIS WAY.**  
*An exploration of a more open, private, secure, interoperable, and individually controlled internet.*

> **Research & Architectural Status Disclosure:**  
> **NEW NET** is an experimental research architecture and interactive engineering showcase—not a commercial social network, browser, or claim of a fully deployed global replacement for the internet. We strictly distinguish between components that are **IMPLEMENTED**, **SIMULATED**, **PROPOSED**, and **RESEARCH REQUIRED**, and we never misrepresent a demonstration database adapter as live peer-to-peer infrastructure.

---

## 1. Why Do We Need a New Internet?

Today's internet suffers from six interconnected structural failure modes:
1. **Centralisation & Platform Lock-in**: Corporate monopolies control identity, social graphs, and cloud routing; leaving a platform means losing your digital community.
2. **The Extractive Attention Economy**: Surveillance-advertising business models reward rage bait, engagement farming, addictive UI patterns, and polarizing algorithms.
3. **AI-Generated Slop & Information Decay**: Zero-marginal-cost synthetic spam, Sybil botnets, and deepfakes overwhelm unverified communication channels.
4. **Surveillance & Personal-Data Exploitation**: Intimate behavioral telemetry is harvested across apps without granular, cryptographically enforceable consent or revocation.
5. **Digital Amnesia & Link Rot**: Location-based HTTP links break when domains expire or platforms shut down, erasing civic and personal archives.
6. **Systemic Security & Trust Failures**: Centralized password/data honeypots, ambient session authority, and uncontained autonomous AI agents create severe breach surfaces.

---

## 2. Core Philosophy & Twelve Principles

**Foundational Principle:** *The individual should own their digital life, not the platforms they use.*

1. **Digital Sovereignty** — Self-certifying W3C DIDs (`did:key`, `did:plc`) with social Shamir guardian recovery.
2. **Personal Data Ownership** — Encrypted Personal Data Pods with path-scoped UCAN capabilities.
3. **Decentralised Infrastructure** — Content-addressed storage (`CIDv1`) and federated relay meshes.
4. **Application Interoperability** — Open JSON-LD/RDF lexicons shared across social, commerce, and workspace clients.
5. **Information Freedom** — Signed content DAGs replicated across independent archival nodes.
6. **Privacy by Default** — Zero-knowledge selective disclosure and envelope encryption.
7. **Security by Design** — Capability-based zero-trust verification on every request.
8. **Digital Preservation** — Cryptographic content addressing and one-click portable JSON-LD/CARv2 exports.
9. **System Transparency** — Auditable ranking formulas and tamper-evident Merkle access logs.
10. **User-Controlled AI** — Local-first fiduciary Personal AI agents bound by out-of-context capability sandboxes and mandatory human approval gates.
11. **Community Governance** — Subsidiarity-based composable labelers, signed moderation receipts, and structured appeals.
12. **Economic Sustainability Without Surveillance** — Direct portable creator patronage, cooperative relay trusts, and zero-tracking contextual sponsorship.

---

## 3. Architecture Overview (7 Layers)

```
Layer 7: Personal AI & Sovereign Automation      [IMPLEMENTED Sandbox / SIMULATED Local Runtime]
Layer 6: Zero-Trust Security & Merkle Audit Log  [IMPLEMENTED WebCrypto & Audit Chain]
Layer 5: Information Discovery & Provenance      [IMPLEMENTED 5-Mode Ranking & SHA-256 Verifier]
Layer 4: Interoperable Application Ecosystem     [IMPLEMENTED 3-App Cross-Pod Portability]
Layer 3: Decentralised Network & Storage Mesh    [IMPLEMENTED CIDv1 Hashing / SIMULATED Replicas]
Layer 2: Personal Data Sovereignty (Pods/UCAN)   [IMPLEMENTED Capability Grant/Reject/Revoke]
Layer 1: Self-Sovereign Digital Identity (DID)   [IMPLEMENTED WebCrypto ECDSA P-256 Keygen & VCs]
```

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for the full architectural topology.

---

## 4. Website Modules (10 Interactive Sections)

1. **Home (`/`)** — Architectural thesis, 6 structural problem breakdowns, 7-layer stack, and 13-dimension comparative matrix.
2. **Vision (`/vision`)** — The 12 Core Principles, Anti-Decay Architecture (Pillars A–F), and non-surveillance economic models.
3. **Architecture Explorer (`/architecture`)** — Interactive `@xyflow/react` explorer featuring **9 clickable diagrams** and a 6-part deep component specification inspector.
4. **Backend Infrastructure (`/backend`)** — Modular service breakdown, persistence adapter transparency disclosure, and critical evaluation of 7 core protocol families.
5. **Information Ecosystem (`/information`)** — Epistemic separation of *cryptographic authenticity* vs. *factual accuracy*, C2PA version lineage, and digital preservation.
6. **Security Architecture (`/security`)** — Security & Trust Centre documenting **11 comprehensive adversarial threat models** (Description, Scenario, Impact, Prevention, Detection, Recovery, Limitations).
7. **AI and Automation (`/ai`)** — Layer 7 Sovereign Personal AI architecture and deterministic out-of-context defenses against indirect prompt injection.
8. **Interactive Playground (`/playground`)** — **8 functional interactive labs** wired to real Web Crypto primitives and Next.js API routes.
9. **API Documentation (`/api-docs`)** — Interactive specification and live execution console for all **15 backend API endpoints**.
10. **Research and Roadmap (`/roadmap`)** — **7-phase development roadmap** with realistic milestones, dependencies, risks, and unresolved research questions.

---

## 5. Backend API Reference (15 Live Route Handlers)

| Method | Endpoint | Layer | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Gateway | Operational status, active adapter mode disclosure, and layer metrics |
| `POST` | `/api/identity/create` | Layer 1 | Generate real WebCrypto ECDSA P-256 keypair, `did:key`, and self-signed VC |
| `GET` | `/api/identity/profile` | Layer 1 | Resolve active DID profile, selective disclosure fields, VCs, and connected apps |
| `POST` | `/api/identity/verify` | Layer 1/6 | Verify key continuity, challenge nonce digest, and personhood/agent attestations |
| `GET` | `/api/permissions` | Layer 2 | List Personal Data Pod containers and UCAN capability grants |
| `POST` | `/api/permissions/grant` | Layer 2 | Grant or reject a scoped UCAN capability token and log audit receipt |
| `DELETE` | `/api/permissions/revoke` | Layer 2 | Revoke an active capability, emit SHA-256 tombstone, and block future access |
| `GET` | `/api/feed` | Layer 5 | Fetch posts scored transparently by the active discovery ranking lens |
| `POST` | `/api/feed/preferences` | Layer 5 | Update ranking mode, custom mathematical weight sliders, and safety filters |
| `POST` | `/api/content/verify` | Layer 5/6 | Compute SHA-256 CIDv1, sign payloads, and detect byte-level tampering |
| `GET` | `/api/content/history` | Layer 3/5 | Inspect immutable parent-child CID version DAGs and regional replica nodes |
| `POST` | `/api/export` | Layer 2/3 | Export verifiable JSON-LD or CARv2 portable archive bundle |
| `GET` | `/api/audit` | Layer 6 | Retrieve hash-chained Merkle security and access audit trail |
| `GET` | `/api/agents` | Layer 7 | List sovereign Personal AI agents, delegated DIDs, and sandbox scopes |
| `POST` | `/api/agents/permissions` | Layer 7 | Pause/resume agents, sign HITL gates, test prompt-injection traps, or kill-switch |

---

## 6. Technology Stack & Evaluation

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind CSS, `@xyflow/react` (React Flow), Lucide Icons.
- **Backend**: Next.js Route Handlers, Zod schema validation, native Web Crypto API (`crypto.subtle` ECDSA P-256 & SHA-256).
- **Persistence**: Modular adapter pattern supporting optional Supabase/PostgreSQL (`SUPABASE_URL`) and defaulting to a clearly labelled `DEMONSTRATION_ADAPTER` that works with zero external credentials.

---

## 7. Local Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/GorillaBrain/new-net.git
cd new-net

# 2. Install dependencies
npm install

# 3. (Optional) Copy environment variable example
cp .env.example .env.local

# 4. Start the local development server
npm run dev

# 5. Run TypeScript verification and production build
npm run typecheck
npm run build
```

Open `http://localhost:3000` in your browser.

---

## 8. Known Limitations & Implementation Status

1. **Demonstration Persistence Adapter**: On serverless hosting without external database credentials, state mutations persist in warm instance memory (`DEMONSTRATION_ADAPTER`) while all cryptographic signatures and SHA-256 hashes execute genuinely.
2. **P2P Transport Simulation**: Browser security sandboxes prevent raw UDP/TCP libp2p listeners inside serverless HTTP functions; multi-node IPFS/Solid/Arweave replication is deterministically simulated.
3. **Human Personhood Attestation**: As documented throughout NEW NET, cryptographic keys alone prove key continuity, *not* biological humanity. Preventing Sybil attacks requires multi-issuer Web-of-Trust credentials.
4. **Provenance vs. Truth**: Cryptographic signatures verify origin and byte integrity, *not* factual accuracy.

---

## 9. Open-Source Licence Rationale

This project is released under the **MIT License** (see [`LICENSE`](./LICENSE)). We selected the permissive MIT License so researchers, protocol designers, students, and independent developers can freely inspect, fork, test, and incorporate NEW NET’s architectural specifications, React Flow diagrams, and WebCrypto verification modules into open-standards initiatives without legal friction.
