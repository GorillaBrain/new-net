import {
  Compass,
  Layers,
  Server,
  Radio,
  Lock,
  Bot,
  Terminal,
  FileCode2,
  Map,
  Home,
} from "lucide-react";

export const NAV_ITEMS = [
  { number: "01", label: "Home", href: "/", icon: Home },
  { number: "02", label: "Vision", href: "/vision", icon: Compass },
  { number: "03", label: "Architecture Explorer", href: "/architecture", icon: Layers },
  { number: "04", label: "Backend Infrastructure", href: "/backend", icon: Server },
  { number: "05", label: "Information Ecosystem", href: "/information", icon: Radio },
  { number: "06", label: "Security Architecture", href: "/security", icon: Lock },
  { number: "07", label: "AI & Automation", href: "/ai", icon: Bot },
  { number: "08", label: "Interactive Playground", href: "/playground", icon: Terminal },
  { number: "09", label: "API Documentation", href: "/api-docs", icon: FileCode2 },
  { number: "10", label: "Research & Roadmap", href: "/roadmap", icon: Map },
];
