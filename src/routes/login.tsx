import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Mail, Lock, Fingerprint, ArrowRight } from "lucide-react";
import { type FormEvent } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { t, dir } = useT();
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  };

  return (
    <div dir={dir} className="relative min-h-screen flex flex-col px-6 py-10 max-w-md mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-72 rounded-full gradient-primary-bg opacity-20 blur-3xl pointer-events-none" />

      <div className="relative flex items-center gap-3">
        <div className="size-11 rounded-xl glass-strong grid place-items-center glow-border">
          <ShieldCheck className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">PowerGuard</p>
          <h1 className="text-base font-semibold">{t("Secure Access")}</h1>
        </div>
      </div>

      <div className="mt-12 mb-6">
        <h2 className="text-3xl font-semibold leading-tight">
          {t("Welcome to")} <span className="gradient-text">PowerGuard</span>
        </h2>
      </div>

      <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 glow-border space-y-4">
        <Field icon={<Mail className="size-4" />} type="email" placeholder="engineer@powerguard.io" label={t("Email")} />
        <Field icon={<Lock className="size-4" />} type="password" placeholder="••••••••••••" label={t("Password")} />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <span className="size-4 rounded border border-primary/40 grid place-items-center">
              <span className="size-2 rounded-sm bg-primary" />
            </span>
            {t("Remember device")}
          </label>
          <Link to="/forgot-password" className="text-primary font-mono">{t("Forgot?")}</Link>
        </div>

        <button
          type="submit"
          className="relative w-full h-12 rounded-xl gradient-primary-bg text-primary-foreground font-semibold tracking-wide flex items-center justify-center gap-2 glow-border-strong transition-transform active:scale-[0.98]"
        >
          {t("ACCESS DASHBOARD")} <ArrowRight className="size-4" />
        </button>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{t("or")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <SocialBtn icon={<GoogleIcon />} onClick={() => navigate({ to: "/connect/$provider", params: { provider: "google" } })} />
          <SocialBtn icon={<Fingerprint className="size-5 text-primary" />} onClick={() => navigate({ to: "/connect/$provider", params: { provider: "biometric" } })} />
          <SocialBtn icon={<FacebookIcon />} onClick={() => navigate({ to: "/connect/$provider", params: { provider: "facebook" } })} />
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {t("New operator?")} <Link to="/signup" className="text-primary">{t("Request enrollment")}</Link>
      </p>
    </div>
  );
}

function Field({
  icon,
  type,
  placeholder,
  label,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  label: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{label}</span>
      <div className="mt-1.5 relative flex items-center rounded-xl bg-surface/60 border border-border focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_oklch(0.85_0.18_210/0.15)] transition">
        <span className="pl-3.5 text-muted-foreground">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 h-11 text-sm outline-none placeholder:text-muted-foreground/60 font-mono"
        />
      </div>
    </label>
  );
}

function SocialBtn({ label, icon, onClick }: { label?: string; icon?: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-xl glass border border-border flex items-center justify-center text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/40 transition"
    >
      {icon ?? label ?? "•"}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#1877F2" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
    </svg>
  );
}
