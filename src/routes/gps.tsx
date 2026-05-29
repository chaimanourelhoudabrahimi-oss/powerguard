import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { GlassCard } from "@/components/ui-kit";
import { MapPin, Share2, Navigation, Satellite } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/gps")({
  component: GPS,
});

function GPS() {
  const { t } = useT();
  return (
    <MobileShell title="GPS Tracker" subtitle="NEO-6M · 9 SATELLITES">
      <GlassCard className="!p-0 overflow-hidden" glow>
        <div className="relative h-72">
          {/* dark map */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, oklch(0.22 0.05 250) 0%, oklch(0.13 0.03 250) 70%)",
            }}
          />
          {/* grid roads */}
          <svg className="absolute inset-0 w-full h-full opacity-40">
            <defs>
              <pattern id="roads" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 30 H60 M30 0 V60" stroke="oklch(0.85 0.18 210/0.25)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#roads)" />
            <path d="M0 90 Q160 60 320 140" stroke="oklch(0.7 0.22 255/0.5)" strokeWidth="2" fill="none" />
            <path d="M40 200 Q140 150 280 220" stroke="oklch(0.85 0.18 210/0.4)" strokeWidth="1.5" fill="none" />
          </svg>

          {/* pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <span className="absolute inset-0 size-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-primary/30 animate-ping-ring" />
              <span className="absolute inset-0 size-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-primary/50 blur-md" />
              <div className="relative size-10 rounded-full gradient-primary-bg grid place-items-center glow-border-strong">
                <MapPin className="size-5 text-primary-foreground" />
              </div>
            </div>
          </div>

          <div className="absolute top-3 left-3 glass-strong rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
            <Satellite className="size-3 text-primary" />
            <span className="text-[10px] font-mono">FIX 3D</span>
          </div>
          <div className="absolute top-3 right-3 glass-strong rounded-lg px-2.5 py-1.5">
            <span className="text-[10px] font-mono text-success">HDOP 0.8</span>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Latitude")}</p>
          <p className="mt-1.5 text-base font-mono text-primary glow-text">40.7128° N</p>
        </GlassCard>
        <GlassCard>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Longitude")}</p>
          <p className="mt-1.5 text-base font-mono text-electric glow-text">74.0060° W</p>
        </GlassCard>
        <GlassCard>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Altitude")}</p>
          <p className="mt-1.5 text-base font-mono">12 m</p>
        </GlassCard>
        <GlassCard>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{t("Speed")}</p>
          <p className="mt-1.5 text-base font-mono">0.0 km/h</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="h-12 rounded-xl glass-strong border border-primary/30 flex items-center justify-center gap-2 text-sm font-medium text-primary glow-border">
          <Navigation className="size-4" /> {t("Navigate")}
        </button>
        <button className="h-12 rounded-xl gradient-primary-bg text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-border-strong">
          <Share2 className="size-4" /> {t("Share Location")}
        </button>
      </div>
    </MobileShell>
  );
}
