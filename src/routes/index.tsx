import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Zap } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 max-w-md mx-auto overflow-hidden">
      {/* ambient rings */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="size-[520px] rounded-full border border-primary/10 animate-spin-slow" />
        <div className="absolute size-[360px] rounded-full border border-electric/10" />
        <div className="absolute size-[200px] rounded-full border border-primary/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative animate-float">
          <div className="absolute inset-0 rounded-3xl gradient-primary-bg blur-2xl opacity-60" />
          <div className="relative size-28 rounded-3xl glass-strong grid place-items-center glow-border-strong">
            <ShieldCheck className="size-14 text-primary glow-text" strokeWidth={1.5} />
            <Zap className="absolute size-7 text-electric" strokeWidth={2.5} />
          </div>
          <span className="absolute -inset-2 rounded-3xl border border-primary/30 animate-ping-ring" />
        </div>

        <h1 className="mt-10 text-4xl font-bold tracking-[0.2em] gradient-text">POWERGUARD</h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-mono">
          Smart · Secure · Connected
        </p>

        <div className="mt-12 w-64">
          <div className="relative h-1 rounded-full bg-surface-elevated overflow-hidden">
            <div className="h-full gradient-primary-bg animate-loading-bar shadow-[0_0_12px_var(--primary)]" />
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>BOOT · ESP32</span>
            <span className="text-primary animate-pulse">INITIALIZING</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] tracking-[0.3em] text-muted-foreground font-mono">
        v2.4.1 · IoT EDGE
      </div>
    </div>
  );
}
