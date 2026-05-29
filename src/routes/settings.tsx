import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileShell, moreNav } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import {
  User, Bell, Sliders, Globe, Moon, Sun, ChevronRight, LogOut, Shield, Wifi,
} from "lucide-react";
import { useState } from "react";
import { useT, LANG_LABELS, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { t, lang, setLang } = useT();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [voltageMin, setVoltageMin] = useState(200);
  const [voltageMax, setVoltageMax] = useState(245);
  const [notif, setNotif] = useState(true);
  const [gsmReconnect, setGsmReconnect] = useState(true);
  const [autoTrip, setAutoTrip] = useState(true);

  return (
    <MobileShell title="Settings" subtitle="OPERATOR PREFERENCES">
      {/* Profile */}
      <Link to="/profile" className="block">
        <GlassCard className="!p-4 flex items-center gap-3 hover:glow-border transition" glow>
          <div className="size-14 rounded-2xl gradient-primary-bg grid place-items-center glow-border-strong">
            <User className="size-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold">Alex Chen</h2>
            <p className="text-xs text-muted-foreground font-mono">{t("Lead Operator · Tier 3 Access")}</p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </GlassCard>
      </Link>

      {/* Quick links */}
      <GlassCard className="!p-2">
        {moreNav.map((m, i) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.to}
              to={m.to}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/5 transition ${
                i !== moreNav.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="size-8 rounded-lg bg-primary/10 grid place-items-center">
                <Icon className="size-4 text-primary" />
              </div>
              <span className="flex-1 text-sm">{t(m.label)}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          );
        })}
      </GlassCard>

      {/* Thresholds */}
      <GlassCard>
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
          <Sliders className="size-4 text-primary" /> {t("Protection Thresholds")}
        </h3>
        <Slider label={t("Min Voltage")} value={voltageMin} min={180} max={220} unit="V" onChange={setVoltageMin} />
        <Slider label={t("Max Voltage")} value={voltageMax} min={230} max={260} unit="V" onChange={setVoltageMax} />
      </GlassCard>

      {/* Toggles */}
      <GlassCard className="!p-2">
        <Row icon={<Bell className="size-4 text-primary" />} label={t("Push Notifications")} toggle value={notif} onToggle={() => setNotif(!notif)} />
        <Row icon={<Wifi className="size-4 text-primary" />} label={t("GSM Auto-Reconnect")} toggle value={gsmReconnect} onToggle={() => setGsmReconnect(!gsmReconnect)} />
        <Row icon={<Shield className="size-4 text-primary" />} label={t("Auto Trip Protection")} toggle value={autoTrip} onToggle={() => setAutoTrip(!autoTrip)} />
        <LanguageRow label={t("Language")} value={lang} onChange={setLang} />
        <ThemeRow theme={theme} onChange={setTheme} />
      </GlassCard>

      <button
        onClick={() => navigate({ to: "/login" })}
        className="w-full h-12 rounded-xl glass border border-danger/40 text-danger flex items-center justify-center gap-2 text-sm font-semibold hover:shadow-[var(--shadow-glow-danger)] transition"
      >
        <LogOut className="size-4" /> {t("Disconnect Session")}
      </button>
    </MobileShell>
  );
}

function Slider({
  label, value, min, max, unit, onChange,
}: {
  label: string; value: number; min: number; max: number; unit: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-muted-foreground font-mono">{label}</span>
        <span className="text-primary font-mono glow-text">{value} {unit}</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface-elevated">
        <div className="absolute inset-y-0 left-0 rounded-full gradient-primary-bg shadow-[0_0_8px_var(--primary)]" style={{ width: `${pct}%` }} />
        <div className="absolute size-4 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_var(--primary)] -translate-x-1/2 -translate-y-1/4" style={{ left: `${pct}%` }} />
        <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
    </div>
  );
}

function Row({
  icon, label, hint, toggle, value, onToggle, last,
}: {
  icon: React.ReactNode; label: string; hint?: string;
  toggle?: boolean; value?: boolean; onToggle?: () => void; last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 px-3 py-3 ${!last ? "border-b border-border/50" : ""}`}>
      <div className="size-8 rounded-lg bg-primary/10 grid place-items-center">{icon}</div>
      <span className="flex-1 text-sm">{label}</span>
      {toggle ? (
        <button onClick={onToggle} className={`relative w-11 h-6 rounded-full transition ${value ? "gradient-primary-bg" : "bg-surface-elevated"}`}>
          <span className={`absolute top-0.5 size-5 rounded-full bg-background transition-all ${value ? "left-5 shadow-[0_0_8px_var(--primary)]" : "left-0.5"}`} />
        </button>
      ) : (
        <>
          {hint && <span className="text-xs text-muted-foreground font-mono">{hint}</span>}
          <ChevronRight className="size-4 text-muted-foreground" />
        </>
      )}
    </div>
  );
}

function LanguageRow({
  label, value, onChange,
}: {
  label: string; value: Lang; onChange: (v: Lang) => void;
}) {
  const options: Lang[] = ["en", "fr", "ar"];
  return (
    <div className="flex items-center gap-3 px-3 py-3 border-b border-border/50">
      <div className="size-8 rounded-lg bg-primary/10 grid place-items-center">
        <Globe className="size-4 text-primary" />
      </div>
      <span className="flex-1 text-sm">{label}</span>
      <div className="flex gap-1 p-1 rounded-lg bg-surface-elevated">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            dir={opt === "ar" ? "rtl" : "ltr"}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition ${
              value === opt
                ? "gradient-primary-bg text-primary-foreground shadow-[0_0_8px_var(--primary)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {LANG_LABELS[opt]}
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeRow({ theme, onChange }: { theme: "dark" | "light"; onChange: (t: "dark" | "light") => void }) {
  const { t } = useT();
  const options: { id: "dark" | "light"; label: string; Icon: typeof Moon }[] = [
    { id: "dark", label: t("Dark"), Icon: Moon },
    { id: "light", label: t("Default"), Icon: Sun },
  ];
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <div className="size-8 rounded-lg bg-primary/10 grid place-items-center">
        {theme === "dark" ? <Moon className="size-4 text-primary" /> : <Sun className="size-4 text-primary" />}
      </div>
      <span className="flex-1 text-sm">{t("Theme")}</span>
      <div className="flex gap-1 p-1 rounded-lg bg-surface-elevated">
        {options.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition ${
              theme === id
                ? "gradient-primary-bg text-primary-foreground shadow-[0_0_8px_var(--primary)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-3" /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
