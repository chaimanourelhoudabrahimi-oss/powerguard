import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import { Phone, MessageSquare, Signal, Wifi, Send } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/gsm")({
  component: GSM,
});

function GSM() {
  const { t } = useT();
  return (
    <MobileShell title="GSM Module" subtitle="SIM7600 · 4G LTE">
      <GlassCard className="!p-5" glow>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{t("SIM Status")}</p>
            <h2 className="mt-1 text-xl font-semibold text-success glow-text">{t("REGISTERED")}</h2>
            <p className="text-xs text-muted-foreground mt-1 font-mono">+1 555 ·· 0142 · IMSI 2604011···</p>
          </div>
          <div className="flex items-end gap-1 h-12">
            {[40, 60, 80, 100, 70].map((h, i) => (
              <span
                key={i}
                className="w-2 rounded-t-sm bg-primary animate-signal shadow-[0_0_8px_var(--primary)]"
                style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <Kv label={t("Operator")} value="Verizon LTE" icon={<Wifi className="size-4 text-primary" />} />
        <Kv label={t("Signal")} value="-67 dBm" icon={<Signal className="size-4 text-success" />} />
        <Kv label={t("Mode")} value="LTE-A" />
        <Kv label={t("Cell ID")} value="0x4A92F1" />
      </div>

      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" /> {t("Send SMS Alert")}
          </h3>
          <span className="text-[10px] font-mono text-muted-foreground">UNICODE</span>
        </div>
        <input
          placeholder="+1 555 000 1234"
          className="w-full h-10 rounded-lg bg-surface/60 border border-border px-3 text-xs font-mono outline-none focus:border-primary/50"
        />
        <textarea
          rows={3}
          placeholder={t("Alert message…")}
          defaultValue={t("PowerGuard: anomaly detected. Voltage stable now.")}
          className="mt-2 w-full rounded-lg bg-surface/60 border border-border px-3 py-2 text-xs font-mono outline-none focus:border-primary/50 resize-none"
        />
        <button className="mt-3 w-full h-11 rounded-xl gradient-primary-bg text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-border">
          <Send className="size-4" /> {t("TRANSMIT SMS")}
        </button>
      </GlassCard>

      <button className="relative w-full h-16 rounded-2xl bg-success text-background font-bold tracking-wider flex items-center justify-center gap-3 shadow-[0_0_32px_var(--success)] active:scale-[0.99] transition">
        <span className="absolute inset-0 rounded-2xl border border-success animate-ping-ring" />
        <Phone className="size-5" /> {t("EMERGENCY CALL")}
      </button>
    </MobileShell>
  );
}

function Kv({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <GlassCard className="!p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</span>
        {icon}
      </div>
      <div className="mt-1.5 text-sm font-mono text-foreground">{value}</div>
    </GlassCard>
  );
}
