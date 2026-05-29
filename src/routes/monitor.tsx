import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard, StatPill } from "@/components/ui-kit";
import { Zap, Activity, Waves } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/monitor")({
  component: Monitor,
});

function Gauge({
  label,
  value,
  unit,
  pct,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  pct: number;
  color: string;
}) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <GlassCard className="flex flex-col items-center !p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-2">{label}</p>
      <div className="relative size-36">
        <svg viewBox="0 0 140 140" className="size-full -rotate-90">
          <circle cx="70" cy="70" r={r} stroke="oklch(0.25 0.05 250)" strokeWidth="8" fill="none" />
          <circle
            cx="70"
            cy="70"
            r={r}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-3xl font-semibold font-mono glow-text" style={{ color }}>
              {value}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground mt-1">{unit}</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function Monitor() {
  const { t } = useT();
  // generate fake waveform
  const points = Array.from({ length: 60 }, (_, i) => {
    const x = (i / 59) * 320;
    const y = 60 + Math.sin(i / 3) * 28 + Math.sin(i / 1.3) * 6;
    return `${x},${y}`;
  }).join(" ");

  return (
    <MobileShell title="Live Monitor" subtitle="REAL-TIME · 50ms POLL">
      <div className="grid grid-cols-2 gap-3">
        <Gauge label={t("Voltage")} value="229" unit={t("VOLTS AC")} pct={76} color="oklch(0.85 0.18 210)" />
        <Gauge label={t("Current")} value="12.7" unit={t("AMPERES")} pct={52} color="oklch(0.7 0.22 255)" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <StatPill label={t("Power")} value="2.91" unit="kW" color="primary" icon={<Zap className="size-4" />} />
      </div>

      <GlassCard className="!p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{t("Waveform")}</p>
            <h3 className="text-sm font-semibold mt-0.5 flex items-center gap-2">
              <Activity className="size-4 text-primary" /> {t("AC Sine · phase A")}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-success">{t("LIVE")}</span>
        </div>
        <div className="relative h-32 rounded-xl bg-surface/40 overflow-hidden border border-border/60">
          {/* grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.85 0.18 210/0.08) 1px,transparent 1px),linear-gradient(90deg,oklch(0.85 0.18 210/0.08) 1px,transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <svg viewBox="0 0 320 120" className="absolute inset-0 w-full h-full">
            <polyline
              points={points}
              fill="none"
              stroke="oklch(0.85 0.18 210)"
              strokeWidth="2"
              style={{ filter: "drop-shadow(0 0 6px oklch(0.85 0.18 210))" }}
            />
          </svg>
          <div className="absolute inset-x-0 top-0 h-px bg-primary/40 animate-scan" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            [t("MIN"), "218 V"],
            [t("AVG"), "229 V"],
            [t("MAX"), "236 V"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-surface/40 py-2">
              <div className="text-[9px] font-mono text-muted-foreground">{k}</div>
              <div className="text-xs font-mono text-primary mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </MobileShell>
  );
}
