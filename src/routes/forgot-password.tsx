import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Mail, KeyRound, Lock, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

// Demo code (in real app, sent via email)
const DEMO_CODE = "123456";

type Step = "email" | "code" | "password";

function ForgotPassword() {
  const { t, dir } = useT();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [sentMsg, setSentMsg] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (step === "email") {
      if (!email) return;
      setStep("code");
      setSentMsg(t("Code sent! For demo, use:") + " " + DEMO_CODE);
      return;
    }
    if (step === "code") {
      if (code !== DEMO_CODE) return setError(t("Invalid code. Try again."));
      setStep("password");
      return;
    }
    // password step
    if (pw.length < 6) return setError(t("Password must be at least 6 characters."));
    if (pw !== confirm) return setError(t("Passwords do not match."));
    navigate({ to: "/login" });
  };

  const heading =
    step === "email"
      ? t("Forgot your password?")
      : step === "code"
      ? t("Enter the code")
      : t("Create a new password");

  const subtitle =
    step === "email"
      ? t("Enter your email and we'll send you a verification code.")
      : step === "code"
      ? t("We sent a 6-digit code to") + " " + email
      : t("Choose a strong password for your account.");

  const buttonLabel =
    step === "email" ? t("Send code") : step === "code" ? t("Verify code") : t("Save password");

  return (
    <div dir={dir} className="relative min-h-screen flex flex-col px-6 py-10 max-w-md mx-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-72 rounded-full gradient-primary-bg opacity-20 blur-3xl pointer-events-none" />

      <div className="relative flex items-center gap-3">
        <div className="size-11 rounded-xl glass-strong grid place-items-center glow-border">
          <ShieldCheck className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">PowerGuard</p>
          <h1 className="text-base font-semibold">{t("Recover Access")}</h1>
        </div>
      </div>

      <div className="mt-12 mb-6">
        <h2 className="text-3xl font-semibold leading-tight">{heading}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 glow-border space-y-4">
        <Field
          icon={<Mail className="size-4" />}
          type="email"
          placeholder="engineer@powerguard.io"
          label={t("Email")}
          value={email}
          onChange={setEmail}
        />

        {(step === "code" || step === "password") && (
          <>
            {sentMsg && <p className="text-xs text-primary font-mono">{sentMsg}</p>}
            <Field
              icon={<KeyRound className="size-4" />}
              type="text"
              placeholder="••••••"
              label={t("Verification code")}
              value={code}
              onChange={setCode}
            />
          </>
        )}

        {step === "password" && (
          <>
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
          </>
        )}

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          className="relative w-full h-12 rounded-xl gradient-primary-bg text-primary-foreground font-semibold tracking-wide flex items-center justify-center gap-2 glow-border-strong transition-transform active:scale-[0.98]"
        >
          {buttonLabel} <ArrowRight className="size-4" />
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
