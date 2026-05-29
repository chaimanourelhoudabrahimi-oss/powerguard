import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import { AlertTriangle, Flame, Zap, ShieldAlert } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/alarms")({
  component: Alarms,
});

const events = [
  { type: "danger", icon: Zap, title: "Overvoltage Detected", desc: "Phase A exceeded 248V — relay tripped automatically.", time: "14:32:08", color: "danger", val: "248.6 V" },
  { type: "warn", icon: AlertTriangle, title: "Overcurrent Warning", desc: "Load surged to 21.4 A on circuit B for 2.4s.", time: "13:51:44", color: "warning", val: "21.4 A" },
  { type: "danger", icon: Flame, title: "Overtemperature Critical", desc: "Power module reached 78.2°C — fan triggered.", time: "11:18:02", color: "danger", val: "78.2 °C" },
  { type: "warn", icon: ShieldAlert, title: "GSM Signal Drop", desc: "Signal strength below threshold for 12s.", time: "09:04:30", color: "warning", val: "-101 dBm" },
  { type: "info", icon: Zap, title: "Brown-out Recovered", desc: "Voltage restored to nominal range after 3s dip.", time: "Yesterday", color: "primary", val: "198 V" },
];

const colorMap: Record<string, string> = {
  danger: "border-danger/40 bg-danger/5",
  warning: "border-warning/40 bg-warning/5",
  primary: "border-primary/30 bg-primary/5",
};
const iconColorMap: Record<string, string> = {
  danger: "text-danger",
  warning: "text-warning",
  primary: "text-primary",
};

function Alarms() {
  const { t } = useT();
  return (
    <MobileShell title="Alarms" subtitle="ANOMALY TIMELINE · 24H">
      <div className="grid grid-cols-3 gap-3">
        <Pill label={t("Critical")} value="2" color="danger" />
        <Pill label={t("Warning")} value="6" color="warning" />
        <Pill label={t("Info")} value="14" color="primary" />
      </div>

      <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-electric/30 to-transparent" />
        <div className="space-y-3">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <div key={i} className="relative">
                <span className={`absolute -left-[18px] top-4 size-3 rounded-full ${e.color === "danger" ? "bg-danger" : e.color === "warning" ? "bg-warning" : "bg-primary"} shadow-[0_0_10px_currentColor]`} />
                <GlassCard className={`!p-4 border ${colorMap[e.color]}`}>
                  <div className="flex items-start gap-3">
                    <div className={`size-9 rounded-lg grid place-items-center ${e.color === "danger" ? "bg-danger/15" : e.color === "warning" ? "bg-warning/15" : "bg-primary/15"}`}>
                      <Icon className={`size-4 ${iconColorMap[e.color]}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold">{t(e.title)}</h3>
                        <span className={`text-[10px] font-mono ${iconColorMap[e.color]}`}>{e.val}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t(e.desc)}</p>
                      <p className="text-[10px] font-mono text-muted-foreground/70 mt-2">{t(e.time)}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}

function Pill({ label, value, color }: { label: string; value: string; color: "danger" | "warning" | "primary" }) {
  const map = {
    danger: "text-danger border-danger/40",
    warning: "text-warning border-warning/40",
    primary: "text-primary border-primary/40",
  };
  return (
    <div className={`glass rounded-xl p-3 border ${map[color]}`}>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</div>
      <div className={`text-2xl font-semibold mt-1 font-mono ${map[color].split(" ")[0]}`}>{value}</div>
    </div>
  );
}
