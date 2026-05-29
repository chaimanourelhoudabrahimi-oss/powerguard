import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  Bell,
  Signal,
  MapPin,
  Power,
  BarChart3,
  Brain,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { type ReactNode } from "react";
import { useT } from "@/lib/i18n";

const nav = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/monitor", label: "Live", icon: Activity },
  { to: "/control", label: "Relay", icon: Power },
  { to: "/alarms", label: "Alerts", icon: Bell },
  { to: "/settings", label: "More", icon: Settings },
] as const;

export function MobileShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const loc = useLocation();
  const { t, dir } = useT();
  return (
    <div dir={dir} className="relative min-h-screen pb-28 pt-4 px-4 max-w-md mx-auto">
      {/* top bar */}
      <header className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="size-10 rounded-xl glass-strong grid place-items-center glow-border">
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-success animate-pulse-glow" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">PowerGuard</p>
            <h1 className="text-base font-semibold leading-none mt-1">{t(title)}</h1>
          </div>
        </div>
        <Link to="/settings" className="size-10 rounded-xl glass grid place-items-center hover:glow-border transition-shadow">
          <div className="size-7 rounded-lg gradient-primary-bg grid place-items-center text-[11px] font-bold text-primary-foreground">A</div>
        </Link>
      </header>

      {subtitle && <p className="text-xs text-muted-foreground mb-4 font-mono">{t(subtitle)}</p>}

      <main className="relative z-10 space-y-4">{children}</main>

      {/* bottom nav */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
        <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-between glow-border">
          {nav.map((n) => {
            const active = loc.pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all relative"
              >
                {active && (
                  <span className="absolute inset-0 rounded-xl gradient-primary-bg opacity-15" />
                )}
                <Icon className={`size-5 relative ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-[10px] font-mono relative ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {t(n.label)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export const moreNav = [
  { to: "/gsm", label: "GSM", icon: Signal },
  { to: "/gps", label: "GPS", icon: MapPin },
  { to: "/stats", label: "Statistics", icon: BarChart3 },
  { to: "/ai", label: "AI Prediction", icon: Brain },
] as const;
