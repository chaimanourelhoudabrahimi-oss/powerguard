import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import { User, Mail, Phone, MapPin, Shield, Calendar, Hash, ArrowLeft, Briefcase } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useT();
  const navigate = useNavigate();

  const info: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Mail className="size-4 text-primary" />, label: t("Email"), value: "alex.chen@powerguard.io" },
    { icon: <Phone className="size-4 text-primary" />, label: t("Phone"), value: "+1 (415) 555-0142" },
    { icon: <Briefcase className="size-4 text-primary" />, label: t("Role"), value: t("Lead Operator") },
    { icon: <Shield className="size-4 text-primary" />, label: t("Access Tier"), value: "Tier 3" },
    { icon: <Hash className="size-4 text-primary" />, label: t("Operator ID"), value: "OP-2048-AC" },
    { icon: <MapPin className="size-4 text-primary" />, label: t("Site"), value: "San Francisco · HQ" },
    { icon: <Calendar className="size-4 text-primary" />, label: t("Member Since"), value: "Mar 2023" },
  ];

  return (
    <MobileShell title="Profile" subtitle="ACCOUNT DETAILS">
      <button
        onClick={() => navigate({ to: "/settings" })}
        className="flex items-center gap-2 text-xs text-muted-foreground font-mono hover:text-primary transition"
      >
        <ArrowLeft className="size-4" /> {t("Back to Settings")}
      </button>

      {/* Header card */}
      <GlassCard className="!p-5 flex flex-col items-center text-center" glow>
        <div className="size-20 rounded-2xl gradient-primary-bg grid place-items-center glow-border-strong mb-3">
          <User className="size-9 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-semibold">Alex Chen</h2>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          {t("Lead Operator · Tier 3 Access")}
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/30">
          <span className="size-1.5 rounded-full bg-success animate-pulse-glow" />
          <span className="text-[10px] font-mono text-success">{t("Active Session")}</span>
        </div>
      </GlassCard>

      {/* Info list */}
      <GlassCard className="!p-2">
        {info.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center gap-3 px-3 py-3 ${
              i !== info.length - 1 ? "border-b border-border/50" : ""
            }`}
          >
            <div className="size-8 rounded-lg bg-primary/10 grid place-items-center">{row.icon}</div>
            <span className="flex-1 text-xs text-muted-foreground font-mono">{row.label}</span>
            <span className="text-sm font-medium">{row.value}</span>
          </div>
        ))}
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <GlassCard className="!p-3 text-center">
          <p className="text-[10px] text-muted-foreground font-mono uppercase">{t("Devices")}</p>
          <p className="text-lg font-bold text-primary glow-text mt-1">12</p>
        </GlassCard>
        <GlassCard className="!p-3 text-center">
          <p className="text-[10px] text-muted-foreground font-mono uppercase">{t("Alerts")}</p>
          <p className="text-lg font-bold text-primary glow-text mt-1">48</p>
        </GlassCard>
        <GlassCard className="!p-3 text-center">
          <p className="text-[10px] text-muted-foreground font-mono uppercase">{t("Uptime")}</p>
          <p className="text-lg font-bold text-primary glow-text mt-1">99%</p>
        </GlassCard>
      </div>
    </MobileShell>
  );
}
