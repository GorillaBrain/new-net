"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Layers,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-items";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"arch" | "dev" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const archItems = NAV_ITEMS.filter((i) => i.category === "Architecture");
  const devItems = NAV_ITEMS.filter((i) => i.category === "Developers");

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isArchActive = archItems.some((i) => pathname.startsWith(i.href));
  const isDevActive = devItems.some((i) => pathname.startsWith(i.href));

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#08090a]/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:rounded-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.12] bg-[#12141a] text-zinc-100 transition-colors group-hover:border-blue-500/50 group-hover:text-blue-400">
              <span className="font-mono text-xs font-bold tracking-tighter">
                NN
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm font-semibold tracking-tight text-zinc-100">
                NEW NET
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                SPEC v0.9.4
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Grouped Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1"
        >
          <Link
            href="/"
            className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
              pathname === "/"
                ? "text-white bg-white/[0.06]"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
            }`}
          >
            Overview
          </Link>

          <Link
            href="/vision"
            className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
              pathname.startsWith("/vision")
                ? "text-white bg-white/[0.06]"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
            }`}
          >
            Vision
          </Link>

          {/* Dropdown 1: Technical Architecture (04–07) */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === "arch" ? null : "arch")
              }
              aria-expanded={openDropdown === "arch"}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                isArchActive || openDropdown === "arch"
                  ? "text-white bg-white/[0.06]"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
              }`}
            >
              <span>Infrastructure &amp; Specs</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-150 ${
                  openDropdown === "arch" ? "rotate-180 text-zinc-200" : ""
                }`}
              />
            </button>

            {openDropdown === "arch" && (
              <div className="absolute left-0 mt-2 w-[360px] rounded-xl border border-white/[0.09] bg-[#0e1014] p-2 shadow-2xl">
                <div className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Core Technical Subsystems
                </div>
                <div className="space-y-0.5">
                  {archItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors ${
                          active
                            ? "bg-blue-500/[0.08] text-white"
                            : "hover:bg-white/[0.04] text-zinc-300"
                        }`}
                      >
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-[#14171d] text-zinc-300">
                          <Icon className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-100">
                              {item.label}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-500">
                              {item.number}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/playground"
            className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
              pathname.startsWith("/playground")
                ? "text-white bg-white/[0.06]"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
            }`}
          >
            Playground
          </Link>

          {/* Dropdown 2: Developers & Research (08–10) */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === "dev" ? null : "dev")
              }
              aria-expanded={openDropdown === "dev"}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                (isDevActive && !pathname.startsWith("/playground")) ||
                openDropdown === "dev"
                  ? "text-white bg-white/[0.06]"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
              }`}
            >
              <span>API &amp; Roadmap</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-150 ${
                  openDropdown === "dev" ? "rotate-180 text-zinc-200" : ""
                }`}
              />
            </button>

            {openDropdown === "dev" && (
              <div className="absolute right-0 mt-2 w-[340px] rounded-xl border border-white/[0.09] bg-[#0e1014] p-2 shadow-2xl">
                <div className="px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Verification, APIs &amp; Timeline
                </div>
                <div className="space-y-0.5">
                  {devItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors ${
                          active
                            ? "bg-blue-500/[0.08] text-white"
                            : "hover:bg-white/[0.04] text-zinc-300"
                        }`}
                      >
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-[#14171d] text-zinc-300">
                          <Icon className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-100">
                              {item.label}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-500">
                              {item.number}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Prominent Architecture Explorer CTA + Mobile Trigger */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/playground"
            className="hidden sm:inline-flex lg:hidden items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.06]"
          >
            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
            <span>Playground</span>
          </Link>

          <Link
            href="/architecture"
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              pathname.startsWith("/architecture")
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-blue-500/30 bg-blue-500/[0.12] text-blue-300 hover:bg-blue-500/[0.2] hover:border-blue-500/50 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Architecture Explorer</span>
            <ArrowUpRight className="h-3 w-3 opacity-75 hidden sm:inline" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="inline-flex lg:hidden items-center justify-center rounded-lg border border-white/[0.09] bg-[#0e1014] p-2 text-zinc-300 hover:text-white"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/[0.07] bg-[#08090a] px-4 py-5 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-[11px] text-zinc-400">
              <span>All 10 Architecture Modules</span>
              <span className="text-emerald-400">WebCrypto: Active</span>
            </div>

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
                    className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                      active
                        ? "border-blue-500/40 bg-blue-500/[0.08] text-white"
                        : "border-white/[0.06] bg-[#0e1014] text-zinc-300 hover:border-white/[0.12]"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-100">
                          {item.label}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {item.number}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
