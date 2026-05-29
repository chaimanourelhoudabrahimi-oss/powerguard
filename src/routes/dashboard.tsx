import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, moreNav } from "@/components/MobileShell";
import { GlassCard, StatPill, StatusDot } from "@/components/ui-kit";
import { useT } from "@/lib/i18n";
import {
  Zap,
  Activity,
  Gauge,
  
  Power,
  Signal,
  MapPin,
  Cpu,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { t } = useT();
  return (
    <MobileShell title="Dashboard" subtitle="GRID · LIVE · ENCRYPTED">
      {/* Safety hero */}
      <GlassCard className="!p-5" glow>
        <div className="absolute -top-12 -right-12 size-40 rounded-full gradient-primary-bg opacity-20 blur-2xl" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{t("System Status")}</p>
            <h2 className="mt-1 text-2xl font-semibold">{t("All Systems")} <span className="gradient-text">{t("Protected")}</span></h2>
          </div>
          <div className="relative size-16 rounded-2xl glass-strong grid place-items-center glow-border-strong">
            <ShieldCheck className="size-7 text-primary" />
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-success animate-pulse-glow" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1.5">
            <span>{t("SAFETY LEVEL")}</span>
            <span className="text-success">98% {t("OPTIMAL")}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-elevated overflow-hidden relative">
            <div className="h-full w-[98%] gradient-primary-bg shadow-[0_0_12px_var(--primary)]" />
          </div>
        </div>
      </GlassCard>

      {/* live metrics */}
      <div className="grid grid-cols-3 gap-3">
        <StatPill label={t("Voltage")} value="229.4" unit="V" color="primary" icon={<Zap className="size-4" />} />
        <StatPill label={t("Current")} value="12.7" unit="A" color="electric" icon={<Activity className="size-4" />} />
        <StatPill label={t("Power")} value="2.91" unit="kW" color="primary" icon={<Gauge className="size-4" />} />
      </div>

      {/* Connectivity row */}
      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{t("Connectivity")}</span>
          <span className="text-[10px] font-mono text-success">{t("ALL LINKS UP")}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <ConnTile icon={<Cpu className="size-4" />} label="ESP32" status="online" sub="32ms" />
          <ConnTile icon={<Signal className="size-4" />} label="GSM" status="online" sub="4G" />
          <ConnTile icon={<MapPin className="size-4" />} label="GPS" status="online" sub="9 sat" />
          <ConnTile icon={<Power className="size-4" />} label={t("Relay")} status="online" sub="ON" />
        </div>
      </GlassCard>

      {/* Relay quick state */}
      <GlassCard className="!p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{t("Main Relay")}</p>
            <h3 className="mt-1 text-xl font-semibold">
              <span className="text-success glow-text">{t("ENERGIZED")}</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1 font-mono">{t("Power")}: 2.91 kW · 60Hz</p>
          </div>
          <Link to="/control" className="relative size-16 rounded-full grid place-items-center glow-border-strong gradient-primary-bg active:scale-95 transition">
            <Power className="size-7 text-primary-foreground" />
            <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping-ring" />
          </Link>
        </div>
      </GlassCard>

      {/* Shortcuts */}
      <div className="grid grid-cols-2 gap-3">
        {moreNav.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.to} to={m.to} className="glass rounded-2xl p-4 flex items-center justify-between hover:glow-border transition">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg gradient-primary-bg/20 grid place-items-center bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{t(m.label)}</span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          );
        })}
      </div>
    </MobileShell>
  );
}

function ConnTile({
  icon,
  label,
  status,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  status: "online" | "offline" | "warning";
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-surface/40 border border-border/60 p-2.5 flex flex-col items-center gap-1.5">
      <div className="text-primary">{icon}</div>
      <div className="flex items-center gap-1">
        <StatusDot status={status} />
        <span className="text-[10px] font-mono text-foreground">{label}</span>
      </div>
      <span className="text-[9px] font-mono text-muted-foreground">{sub}</span>
    </div>
  );
}
