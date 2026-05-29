import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import { useState } from "react";
import { TrendingUp, Zap, Activity, Gauge, Battery } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/stats")({
  component: Stats,
});

const tabs = ["Daily", "Weekly", "Monthly"] as const;

function Stats() {
  const { t } = useT();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Weekly");
  const data =
    tab === "Daily"
      ? [12, 18, 22, 30, 28, 35, 40, 38, 30, 25, 20, 15]
      : tab === "Weekly"
      ? [62, 78, 91, 70, 88, 102, 85]
      : [320, 410, 380, 450, 520, 480, 510, 600, 580, 620, 700, 660];

  const max = Math.max(...data);

  return (
    <MobileShell title="Statistics" subtitle="ENERGY ANALYTICS">
      <div className="glass rounded-xl p-1 grid grid-cols-3 gap-1">
        {tabs.map((tb) => (
          <button
            key={tb}
            onClick={() => setTab(tb)}
            className={`h-9 rounded-lg text-xs font-medium transition ${
              tab === tb ? "gradient-primary-bg text-primary-foreground glow-border" : "text-muted-foreground"
            }`}
          >
            {t(tb)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <GlassCard className="!p-3">
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Total")}</p>
          <p className="mt-1 text-lg font-semibold text-primary glow-text font-mono">487 kWh</p>
        </GlassCard>
        <GlassCard className="!p-3">
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Peak")}</p>
          <p className="mt-1 text-lg font-semibold text-electric glow-text font-mono">3.4 kW</p>
        </GlassCard>
        <GlassCard className="!p-3">
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Cost")}</p>
          <p className="mt-1 text-lg font-semibold text-success glow-text font-mono">$58.4</p>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Zap className="size-4 text-primary" /> {t("Statistics")}
          </h3>
          <span className="text-[10px] font-mono text-success flex items-center gap-1">
            <TrendingUp className="size-3" /> +12.4%
          </span>
        </div>
        <div className="h-44 flex items-end gap-1.5">
          {data.map((d, i) => {
            const h = (d / max) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-md gradient-primary-bg"
                  style={{
                    height: `${h}%`,
                    boxShadow: "0 0 12px oklch(0.85 0.18 210/0.4)",
                  }}
                />
                <span className="text-[8px] font-mono text-muted-foreground">{i + 1}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Activity className="size-4 text-electric" /> {t("Voltage / Current")}
          </h3>
          <div className="flex gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-primary" /> V</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-electric" /> A</span>
          </div>
        </div>
        <div className="h-32 relative rounded-lg bg-surface/40 border border-border/60 overflow-hidden">
          <svg viewBox="0 0 320 120" className="w-full h-full">
            <polyline
              points="0,80 30,70 60,75 90,40 120,55 150,30 180,50 210,35 240,60 270,45 300,55 320,40"
              fill="none"
              stroke="oklch(0.85 0.18 210)"
              strokeWidth="2"
              style={{ filter: "drop-shadow(0 0 4px oklch(0.85 0.18 210))" }}
            />
            <polyline
              points="0,90 30,85 60,70 90,80 120,65 150,75 180,55 210,70 240,50 270,65 300,45 320,55"
              fill="none"
              stroke="oklch(0.7 0.22 255)"
              strokeWidth="2"
              style={{ filter: "drop-shadow(0 0 4px oklch(0.7 0.22 255))" }}
            />
          </svg>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Gauge className="size-4 text-primary" /> {t("Power Distribution")}
          </h3>
          <span className="text-[10px] font-mono text-muted-foreground">{t("Live")}</span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Lighting", val: 32, color: "bg-primary" },
            { label: "HVAC", val: 48, color: "bg-electric" },
            { label: "Appliances", val: 15, color: "bg-success" },
            { label: "Other", val: 5, color: "bg-muted-foreground" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-muted-foreground">{t(row.label)}</span>
                <span className="text-foreground">{row.val}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface/60 overflow-hidden">
                <div className={`h-full ${row.color}`} style={{ width: `${row.val}%`, boxShadow: "0 0 8px currentColor" }} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="!p-3">
        <div className="flex items-center gap-2 mb-1">
          <Battery className="size-3.5 text-success" />
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Efficiency")}</p>
        </div>
        <p className="text-lg font-semibold text-success glow-text font-mono">92.7%</p>
      </GlassCard>
    </MobileShell>
  );
}
