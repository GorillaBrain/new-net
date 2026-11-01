import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#060708] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.12] bg-[#12141a] font-mono text-xs font-bold text-zinc-100">
                NN
              </div>
              <span className="font-mono text-sm font-semibold tracking-tight text-zinc-100">
                NEW NET ARCHITECTURE INITIATIVE
              </span>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-md">
              The internet is infrastructure. It should serve the people who use
              it, not exclusively the corporations that operate its largest
              platforms. NEW NET is an experimental research architecture and
              interactive systems showcase exploring self-sovereign identity,
              encrypted personal data pods, content-addressed preservation,
              algorithmic independence, and fiduciary personal AI.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
              <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/25 bg-emerald-500/[0.06] px-2 py-0.5 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                IMPLEMENTED: WebCrypto &amp; 15 APIs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-blue-500/25 bg-blue-500/[0.06] px-2 py-0.5 text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                SIMULATED: Relay Mesh
              </span>
              <span className="inline-flex items-center gap-1.5 rounded border border-zinc-500/25 bg-zinc-500/[0.06] px-2 py-0.5 text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                PROPOSED: Federation Specs
              </span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
              Core Architecture
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    <span className="font-mono text-[10px] text-zinc-600">
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
              Security, Verification &amp; Labs
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    <span className="font-mono text-[10px] text-zinc-600">
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Repository Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs sm:flex-row sm:items-center">
          <div className="font-mono text-[11px] text-zinc-500">
            NEW NET Research Specification v0.9.4 • Released under MIT License •
            Next.js App Router, TypeScript, React Flow &amp; Web Crypto API
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            <Link
              href="/architecture"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Architecture Explorer
            </Link>
            <Link
              href="/playground"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Interactive Playground
            </Link>
            <Link
              href="/api-docs"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              API Reference
            </Link>
            <a
              href="https://github.com/GorillaBrain/new-net"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-zinc-200 hover:text-blue-400 transition-colors"
            >
              <span>GitHub Repository</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
