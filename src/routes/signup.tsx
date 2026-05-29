import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Mail, Lock, User, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { type FormEvent } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
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
        <Link
          to="/login"
          className="size-11 rounded-xl glass-strong grid place-items-center glow-border text-primary"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="size-11 rounded-xl glass-strong grid place-items-center glow-border">
          <ShieldCheck className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
            PowerGuard
          </p>
          <h1 className="text-base font-semibold">{t("New Operator")}</h1>
        </div>
      </div>

      <div className="mt-10 mb-6">
        <h2 className="text-3xl font-semibold leading-tight">
          {t("Create your")} <span className="gradient-text">{t("account")}</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2 font-mono">
          {t("Fill in your information to enroll.")}
        </p>
      </div>

      <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 glow-border space-y-4">
        <Field icon={<User className="size-4" />} type="text" placeholder="Alex Chen" label={t("Full Name")} />
        <Field icon={<Mail className="size-4" />} type="email" placeholder="engineer@powerguard.io" label={t("Email")} />
        <Field icon={<Phone className="size-4" />} type="tel" placeholder="+1 555 000 0000" label={t("Phone")} />
        <Field icon={<Lock className="size-4" />} type="password" placeholder="••••••••••••" label={t("Password")} />
        <Field icon={<Lock className="size-4" />} type="password" placeholder="••••••••••••" label={t("Confirm Password")} />

        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <span className="size-4 mt-0.5 rounded border border-primary/40 grid place-items-center shrink-0">
            <span className="size-2 rounded-sm bg-primary" />
          </span>
          {t("I accept the terms and privacy policy")}
        </label>

        <button
          type="submit"
          className="relative w-full h-12 rounded-xl gradient-primary-bg text-primary-foreground font-semibold tracking-wide flex items-center justify-center gap-2 glow-border-strong transition-transform active:scale-[0.98]"
        >
          {t("CREATE ACCOUNT")} <ArrowRight className="size-4" />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {t("Already enrolled?")} <Link to="/login" className="text-primary">{t("Sign in")}</Link>
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
