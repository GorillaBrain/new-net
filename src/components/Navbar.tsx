"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-xl">
      {/* Top Research Telemetry Bar */}
      <div className="border-b border-slate-800/60 bg-[#05070b] px-4 py-1.5 text-[11px] font-mono text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-slate-200 font-semibold">NEW NET ARCHITECTURE SPEC v0.9.4</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              Proposed Next-Generation Sovereign Internet Architecture Under Research &amp; Development
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">WebCrypto ECDSA/SHA-256: ACTIVE</span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400">Adapter: DEMO_STATE_ENGINE</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-400 transition group-hover:border-blue-400 group-hover:bg-blue-500/20">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-wider text-white">
                NEW NET
              </span>
              <span className="rounded border border-violet-500/40 bg-violet-500/10 px-1.5 py-0.2 font-mono text-[10px] text-violet-300">
                R&amp;D ARCH
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Sovereign • Decentralised • Verifiable
            </p>
          </div>
        </Link>

        {/* Desktop Compact Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  active
                    ? "bg-blue-500/15 text-blue-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <span className="font-mono text-[10px] text-slate-500">
                  {item.number}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile / Tablet Menu Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 rounded-md border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-mono text-blue-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Playground</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="rounded-md border border-slate-800 bg-slate-900/80 p-2 text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#090c14] px-4 py-4 xl:hidden">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-xs font-medium ${
                    active
                      ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
                      : "border-slate-800/80 bg-slate-900/40 text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="h-4 w-4 text-blue-400" />
                  <span className="font-mono text-[10px] text-slate-500">
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
