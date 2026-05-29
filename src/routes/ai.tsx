import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import { Brain, Sparkles, TrendingUp, ShieldCheck, Lightbulb } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/ai")({
  component: AI,
});

function AI() {
  const { t } = useT();
  return (
    <MobileShell title="AI Prediction" subtitle="NEURAL PROTECTION ENGINE">
      <GlassCard className="!p-6 flex flex-col items-center" glow>
        {/* AI brain visual */}
        <div className="relative size-44">
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border border-electric/30" style={{ animation: "spin-slow 12s linear infinite reverse" }} />
          <div className="absolute inset-6 rounded-full border border-primary/40 animate-spin-slow" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full gradient-primary-bg blur-2xl opacity-60" />
              <div className="relative size-20 rounded-full glass-strong grid place-items-center glow-border-strong">
                <Brain className="size-10 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          {/* synapse dots */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <span
              key={deg}
              className="absolute size-2 rounded-full bg-electric shadow-[0_0_8px_var(--electric)] animate-pulse-glow"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateY(-86px)`,
              }}
            />
          ))}
        </div>
        <div className="mt-5 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{t("Risk Forecast · Next 24h")}</p>
          <h2 className="mt-2 text-3xl font-semibold gradient-text">{t("LOW")}</h2>
        </div>

        <div className="mt-5 w-full">
          <div className="relative h-2 rounded-full bg-surface-elevated overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-[22%] rounded-full bg-success shadow-[0_0_12px_var(--success)]" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>{t("SAFE")}</span><span>{t("WATCH")}</span><span>{t("WARN")}</span><span>{t("CRITICAL")}</span>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="size-4 text-success" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Health")}</span>
          </div>
          <p className="text-xl font-mono text-success glow-text">96/100</p>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center gap-2 mb-1.5">
            <TrendingUp className="size-4 text-electric" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Trend")}</span>
          </div>
          <p className="text-xl font-mono text-electric glow-text">{t("Stable")}</p>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <Lightbulb className="size-4 text-warning" /> {t("Smart Recommendations")}
        </h3>
        <ul className="space-y-3">
          {[
            { t: "Schedule load balance at 18:00", d: "Predicted peak demand on circuit B." },
            { t: "Inspect cooling fan within 7 days", d: "Temperature gradient rising 0.4°C/day." },
            { t: "Update GSM firmware", d: "New revision improves signal stability by 12%." },
          ].map((r, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 size-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              <div className="flex-1">
                <p className="text-sm font-medium flex items-center gap-2">
                  {t(r.t)}
                  <Sparkles className="size-3 text-primary" />
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{t(r.d)}</p>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>
    </MobileShell>
  );
}
