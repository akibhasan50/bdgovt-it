import {
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileCode2,
  type LucideIcon,
  GitBranch,
  Globe,
  Globe2,
  Infinity,
  Microchip,
  MonitorCog,
  Network,
  Server,
  ShieldCheck,
  Sigma,
  Terminal,
  Workflow,
} from "lucide-react";

export const topicIcons: Record<string, LucideIcon> = {
  Cpu,
  Boxes,
  Network,
  GitBranch,
  Database,
  FileCode2,
  Code2,
  Microchip,
  Terminal,
  Globe2,
  MonitorCog,
  Server,
  Workflow,
  ShieldCheck,
  Cloud,
  BrainCircuit,
  Globe,
  Infinity,
  Sigma,
};

export function TopicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = topicIcons[name] ?? Cpu;
  return <Icon className={className} />;
}
