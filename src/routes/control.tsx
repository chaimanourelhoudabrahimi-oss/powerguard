import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import { Power, Volume2, Signal, MapPin, RotateCcw, Shield } from "lucide-react";
import { useState } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/control")({
  component: Control,
});

const modes = ["Standard", "Sensitive", "Industrial", "Night"] as const;

function Control() {
  const { t } = useT();
  const [on, setOn] = useState(true);
  const [mode, setMode] = useState<(typeof modes)[number]>("Standard");

  return (
    <MobileShell title="Remote Control" subtitle="ENCRYPTED · ESP32 LINK">
      <GlassCard className="!p-6 flex flex-col items-center" glow>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{t("Main Relay")}</p>
        <button
          onClick={() => setOn(!on)}
          className="relative mt-5 size-44 rounded-full grid place-items-center transition active:scale-95"
        >
          <span className={`absolute inset-0 rounded-full ${on ? "gradient-primary-bg" : "bg-surface-elevated"} ${on ? "animate-pulse-glow" : ""}`} />
          {on && <span className="absolute -inset-2 rounded-full border border-primary/40 animate-ping-ring" />}
          <span className={`absolute inset-2 rounded-full ${on ? "bg-background/30" : "bg-background/60"} backdrop-blur`} />
          <Power className={`relative size-16 ${on ? "text-primary-foreground glow-text" : "text-muted-foreground"}`} strokeWidth={1.5} />
        </button>
        <div className="mt-5 text-center">
          <div className={`text-2xl font-bold tracking-widest ${on ? "text-success glow-text" : "text-muted-foreground"}`}>
            {on ? t("ENERGIZED") : t("DISCONNECTED")}
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{t("Tap to toggle main contactor")}</p>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="size-4 text-primary" />
          <h3 className="text-sm font-semibold">{t("Protection Mode")}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`h-11 rounded-xl border text-sm font-medium transition ${
                mode === m
                  ? "gradient-primary-bg text-primary-foreground border-transparent glow-border"
                  : "glass border-border text-muted-foreground"
              }`}
            >
              {t(m)}
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-sm font-semibold mb-3">{t("System Tests")}</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <TestBtn icon={<Volume2 className="size-4" />} label={t("Buzzer")} />
          <TestBtn icon={<Signal className="size-4" />} label={t("GSM Ping")} />
          <TestBtn icon={<MapPin className="size-4" />} label={t("GPS Fix")} />
          <TestBtn icon={<RotateCcw className="size-4" />} label={t("Reset ESP32")} danger />
        </div>
      </GlassCard>
    </MobileShell>
  );
}

function TestBtn({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  return (
    <button
      className={`h-12 rounded-xl glass border flex items-center justify-center gap-2 text-sm font-medium transition active:scale-[0.98] ${
        danger ? "border-danger/40 text-danger hover:shadow-[var(--shadow-glow-danger)]" : "border-primary/30 text-primary hover:glow-border"
      }`}
    >
      {icon} {label}
    </button>
  );
}
