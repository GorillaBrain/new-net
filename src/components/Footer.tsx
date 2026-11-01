import React from "react";
import Link from "next/link";
import { Shield, Github, ExternalLink, Terminal, Layers, FileCode2 } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#05070b] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-blue-500/40 bg-blue-500/10 text-blue-400">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-mono text-sm font-bold tracking-wider text-white">
                NEW NET — ALTERNATIVE INTERNET ARCHITECTURE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-xl">
              The internet is infrastructure. It should serve the people who use it,
              not exclusively the corporations that operate its largest platforms.
              NEW NET is an experimental research architecture and interactive
              engineering showcase exploring digital sovereignty, personal data pods,
              content-addressed preservation, cryptographic provenance, and
              user-controlled AI.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono">
              <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                IMPLEMENTED: WebCrypto &amp; 15 API Routes
              </span>
              <span className="rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-blue-400">
                SIMULATED: Multi-Node Relay Mesh
              </span>
              <span className="rounded border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-violet-400">
                PROPOSED: Global Federation Specs
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Architecture Modules
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="font-mono text-[10px] text-slate-600">{item.number}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Verification &amp; Labs
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="font-mono text-[10px] text-slate-600">{item.number}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-800/60 pt-6 text-xs sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-slate-500">
            NEW NET Research Initiative • Open Source (MIT License) • Built with Next.js App Router, TypeScript, React Flow, Zod &amp; Web Crypto API
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/architecture"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-blue-400"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Explorer</span>
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-blue-400"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>8 Live Labs</span>
            </Link>
            <Link
              href="/api-docs"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-blue-400"
            >
              <FileCode2 className="h-3.5 w-3.5" />
              <span>15 APIs</span>
            </Link>
            <a
              href="https://github.com/GorillaBrain/new-net"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub Repo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
