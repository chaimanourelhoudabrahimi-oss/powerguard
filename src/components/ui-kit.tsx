import { type ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`glass rounded-2xl p-4 relative overflow-hidden ${glow ? "glow-border" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function StatPill({
  label,
  value,
  unit,
  color = "primary",
  icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  color?: "primary" | "electric" | "success" | "warning" | "danger";
  icon?: ReactNode;
}) {
  const colorMap: Record<string, string> = {
    primary: "text-primary",
    electric: "text-electric",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</span>
        {icon && <div className={colorMap[color]}>{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className={`text-2xl font-semibold tabular-nums ${colorMap[color]} glow-text font-mono`}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground font-mono">{unit}</span>}
      </div>
    </GlassCard>
  );
}

export function StatusDot({ status }: { status: "online" | "offline" | "warning" }) {
  const map = {
    online: "bg-success shadow-[0_0_12px_var(--success)]",
    offline: "bg-muted-foreground",
    warning: "bg-warning shadow-[0_0_12px_var(--warning)]",
  };
  return (
    <span className="relative inline-flex">
      <span className={`size-2 rounded-full ${map[status]}`} />
      {status !== "offline" && (
        <span className={`absolute inset-0 size-2 rounded-full ${map[status]} animate-ping opacity-60`} />
      )}
    </span>
  );
}
