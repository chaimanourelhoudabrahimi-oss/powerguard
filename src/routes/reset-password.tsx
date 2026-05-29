import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const { t, dir } = useT();
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pw.length < 6) return setError(t("Password must be at least 6 characters."));
    if (pw !== confirm) return setError(t("Passwords do not match."));
    navigate({ to: "/login" });
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
          <h1 className="text-base font-semibold">{t("New Password")}</h1>
        </div>
      </div>

      <div className="mt-12 mb-6">
        <h2 className="text-3xl font-semibold leading-tight">{t("Create a new password")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("Choose a strong password for your account.")}</p>
      </div>

      <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 glow-border space-y-4">
        <Field
          icon={<Lock className="size-4" />}
          type="password"
          placeholder="••••••••••••"
          label={t("New password")}
          value={pw}
          onChange={setPw}
        />
        <Field
          icon={<Lock className="size-4" />}
          type="password"
          placeholder="••••••••••••"
          label={t("Confirm password")}
          value={confirm}
          onChange={setConfirm}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button
          type="submit"
          className="relative w-full h-12 rounded-xl gradient-primary-bg text-primary-foreground font-semibold tracking-wide flex items-center justify-center gap-2 glow-border-strong transition-transform active:scale-[0.98]"
        >
          {t("Save password")} <ArrowRight className="size-4" />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        <Link to="/login" className="text-primary">{t("Back to login")}</Link>
      </p>
    </div>
  );
}

function Field({
  icon,
  type,
  placeholder,
  label,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{label}</span>
      <div className="mt-1.5 relative flex items-center rounded-xl bg-surface/60 border border-border focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_oklch(0.85_0.18_210/0.15)] transition">
        <span className="pl-3.5 text-muted-foreground">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent px-3 h-11 text-sm outline-none placeholder:text-muted-foreground/60 font-mono"
        />
      </div>
    </label>
  );
}
