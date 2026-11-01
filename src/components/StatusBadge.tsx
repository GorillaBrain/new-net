import React from "react";
import { ImplementationStatus } from "@/lib/types";

const STATUS_STYLES: Record<
  ImplementationStatus,
  {
    dot: string;
    bg: string;
    border: string;
    text: string;
    tooltip: string;
  }
> = {
  IMPLEMENTED: {
    dot: "bg-emerald-400",
    bg: "bg-emerald-500/[0.07]",
    border: "border-emerald-500/25",
    text: "text-emerald-300",
    tooltip: "Implemented & functional in this runtime (WebCrypto, API routes, state engine).",
  },
  SIMULATED: {
    dot: "bg-blue-400",
    bg: "bg-blue-500/[0.07]",
    border: "border-blue-500/25",
    text: "text-blue-300",
    tooltip: "Demonstrated using deterministic sample state & cryptographic primitives.",
  },
  PROPOSED: {
    dot: "bg-zinc-300",
    bg: "bg-zinc-500/[0.08]",
    border: "border-zinc-500/25",
    text: "text-zinc-300",
    tooltip: "Architecturally specified with protocol schemas, not yet wired in runtime.",
  },
  "RESEARCH REQUIRED": {
    dot: "bg-amber-400",
    bg: "bg-amber-500/[0.07]",
    border: "border-amber-500/25",
    text: "text-amber-300",
    tooltip: "Open distributed-systems or cryptographic research question.",
  },
};

export function StatusBadge({
  status,
  size = "sm",
}: {
  status: ImplementationStatus;
  size?: "xs" | "sm";
}) {
  const cfg = STATUS_STYLES[status];

  return (
    <span
      title={cfg.tooltip}
      className={`inline-flex items-center gap-1.5 rounded-md border font-mono uppercase tracking-wider select-none ${cfg.bg} ${cfg.border} ${cfg.text} ${
        size === "xs"
          ? "px-2 py-0.5 text-[10px] leading-tight"
          : "px-2.5 py-1 text-[11px] leading-tight"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      <span>{status}</span>
    </span>
  );
}
