import React from "react";
import { PlaygroundSuite } from "@/components/PlaygroundSuite";
import { Terminal } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs text-violet-300">
          <Terminal className="h-3.5 w-3.5" />
          <span>MODULE 08 • 8 INTERACTIVE FUNCTIONAL DEMONSTRATION LABS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          NEW NET Interactive Cryptographic &amp; Protocol Playground
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
          Every demonstration below executes against our live Next.js API Route Handlers
          and Web Crypto API engine. Generate real ECDSA P-256 decentralized identifiers,
          grant and revoke Personal Pod capabilities, tune feed ranking algorithms in
          real time, verify entity attestations, test SHA-256 content tamper detection,
          trigger AI prompt-injection traps, export portable JSON-LD/CAR archives, and
          switch seamlessly between interoperable applications.
        </p>
      </div>

      <PlaygroundSuite />
    </div>
  );
}
