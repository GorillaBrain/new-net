import React from "react";
import { ImplementationStatus } from "@/lib/types";
import { CheckCircle2, Cpu, Compass, FlaskConical } from "lucide-react";

const STATUS_STYLES: Record<
  ImplementationStatus,
  {
    bg: string;
    border: string;
    text: string;
    icon: React.ComponentType<{ className?: string }>;
    tooltip: string;
  }
> = {
  IMPLEMENTED: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    icon: CheckCircle2,
    tooltip: "Actually functional in this build (WebCrypto, API routes, state engine).",
  },
  SIMULATED: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    icon: Cpu,
    tooltip: "Demonstrated using deterministic sample state & cryptographic primitives.",
  },
  PROPOSED: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    icon: Compass,
    tooltip: "Architecturally specified with protocol schemas, not yet wired in runtime.",
  },
  "RESEARCH REQUIRED": {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    icon: FlaskConical,
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
  const Icon = cfg.icon;

  return (
    <span
      title={cfg.tooltip}
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-wider ${cfg.bg} ${cfg.border} ${cfg.text} ${
        size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs"
      }`}
    >
      <Icon className={size === "xs" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      <span>{status}</span>
    </span>
  );
}
