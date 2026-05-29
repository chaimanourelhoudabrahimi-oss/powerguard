import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, Lock, Fingerprint, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/connect/$provider")({
  component: ConnectPage,
});

type Provider = "google" | "facebook" | "biometric";

function ConnectPage() {
  const { t, dir } = useT();
  const navigate = useNavigate();
  const { provider } = Route.useParams();
  const p = (provider as Provider);
  const [scanning, setScanning] = useState(false);

  const meta = {
    google: {
      title: t("Continue with Google"),
      subtitle: t("Sign in with your Google account"),
      accent: "#EA4335",
      icon: <GoogleIcon />,
      placeholder: "you@gmail.com",
    },
    facebook: {
      title: t("Continue with Facebook"),
      subtitle: t("Sign in with your Facebook account"),
      accent: "#1877F2",
      icon: <FacebookIcon />,
      placeholder: "you@facebook.com",
    },
    biometric: {
      title: t("Biometric Access"),
      subtitle: t("Authenticate with your fingerprint"),
      accent: "oklch(0.85 0.18 210)",
      icon: <Fingerprint className="size-7 text-primary" />,
      placeholder: "",
    },
  }[p] ?? {
    title: t("Connect"),
    subtitle: "",
    accent: "#888",
    icon: <ShieldCheck className="size-7" />,
    placeholder: "",
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  };

  const onScan = () => {
    setScanning(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 1400);
  };

  return (
    <div dir={dir} className="relative min-h-screen flex flex-col px-6 py-10 max-w-md mx-auto">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 size-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: meta.accent }}
      />

      <Link to="/login" className="relative inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> {t("Back")}
      </Link>

      <div className="relative mt-10 flex flex-col items-center text-center">
        <div className="size-16 rounded-2xl glass-strong grid place-items-center glow-border">
          {meta.icon}
        </div>
        <h1 className="mt-5 text-2xl font-semibold">{meta.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{meta.subtitle}</p>
      </div>

      {p === "biometric" ? (
        <form onSubmit={onSubmit} className="mt-10 glass-strong rounded-3xl p-6 glow-border space-y-4">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={onScan}
              className={`size-32 rounded-full grid place-items-center border-2 border-primary/40 transition ${
                scanning ? "gradient-primary-bg animate-pulse" : "bg-surface/60 hover:border-primary"
              }`}
            >
              <Fingerprint className={`size-14 ${scanning ? "text-primary-foreground" : "text-primary"}`} />
            </button>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
              {scanning ? t("Scanning...") : t("Tap to scan")}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{t("or")}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Field icon={<Mail className="size-4" />} type="email" placeholder="operator@powerguard.io" label={t("Email")} />
          <Field icon={<Lock className="size-4" />} type="password" placeholder="••••••••••••" label={t("Password")} />

          <button
            type="submit"
            className="relative w-full h-12 rounded-xl gradient-primary-bg text-primary-foreground font-semibold tracking-wide flex items-center justify-center gap-2 glow-border-strong transition-transform active:scale-[0.98]"
          >
            {t("Continue")} <ArrowRight className="size-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="mt-10 glass-strong rounded-3xl p-6 glow-border space-y-4">
          <Field icon={<Mail className="size-4" />} type="email" placeholder={meta.placeholder} label={t("Email")} />
          <Field icon={<Lock className="size-4" />} type="password" placeholder="••••••••••••" label={t("Password")} />

          <button
            type="submit"
            className="relative w-full h-12 rounded-xl gradient-primary-bg text-primary-foreground font-semibold tracking-wide flex items-center justify-center gap-2 glow-border-strong transition-transform active:scale-[0.98]"
          >
            {t("Continue")} <ArrowRight className="size-4" />
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ icon, type, placeholder, label }: { icon: React.ReactNode; type: string; placeholder: string; label: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{label}</span>
      <div className="mt-1.5 flex items-center rounded-xl bg-surface/60 border border-border focus-within:border-primary/50 transition">
        <span className="pl-3.5 text-muted-foreground">{icon}</span>
        <input
          type={type}
          required
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 h-11 text-sm outline-none placeholder:text-muted-foreground/60 font-mono"
        />
      </div>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <path fill="#1877F2" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
    </svg>
  );
}
