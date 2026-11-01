import React from "react";
import { PlaygroundSuite } from "@/components/PlaygroundSuite";
import { Terminal } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-white/[0.07] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span>MODULE 08 • 8 INTERACTIVE FUNCTIONAL DEMONSTRATION LABS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          NEW NET Interactive Cryptographic &amp; Protocol Playground
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
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
