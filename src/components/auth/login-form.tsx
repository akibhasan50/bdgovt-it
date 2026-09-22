"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/auth-shell";
import { authErrorKey } from "@/components/auth/auth-errors";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "required")
    .refine((v) => z.email().safeParse(v).success, "email"),
  password: z.string().min(1, "required"),
});

type LoginValues = z.infer<typeof loginSchema>;

const DEMO_EMAIL = "demo@itjobprep.bd";
const DEMO_PASSWORD = "demo1234";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06L5.84 9.9c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function LoginForm({
  googleEnabled,
  from,
  initialError,
}: {
  googleEnabled: boolean;
  from?: string;
  initialError?: boolean;
}) {
  const t = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(
    initialError ? "credentials" : null
  );
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const callbackUrl = from || "/dashboard";

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (result?.error) {
          setFormError("credentials");
          return;
        }
        toast.success(t("dashboard.welcome"));
        router.push(callbackUrl);
        router.refresh();
      } catch {
        setFormError("credentials");
      }
    });
  });

  const fillDemo = () => {
    setValue("email", DEMO_EMAIL, { shouldValidate: true });
    setValue("password", DEMO_PASSWORD, { shouldValidate: true });
    setFormError(null);
  };

  return (
    <AuthShell
      title={t("auth.loginTitle")}
      subtitle={t("auth.loginSubtitle")}
      footer={
        <p className="text-muted-foreground">
          {t("auth.noAccount")}{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            {t("nav.register")}
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        {formError ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2.5 text-sm text-danger"
          >
            <ShieldAlert className="mt-0.5 size-4 shrink-0" />
            <span>{t(authErrorKey(formError))}</span>
          </div>
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="email">{t("auth.email")}</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="h-10 rounded-xl pl-9"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
          </div>
          {errors.email ? (
            <p id="email-error" className="text-xs text-danger">
              {t(authErrorKey(errors.email.message))}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{t("auth.password")}</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="h-10 rounded-xl pr-10 pl-9"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p id="password-error" className="text-xs text-danger">
              {t(authErrorKey(errors.password.message))}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full rounded-xl"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : null}
          {t("auth.loginCta")}
        </Button>

        <div className="relative my-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/70" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {t("auth.orContinueWith")}
            </span>
          </div>
        </div>

        {googleEnabled ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-xl"
            onClick={() =>
              signIn("google", { callbackUrl })
            }
          >
            <GoogleIcon />
            {t("auth.google")}
          </Button>
        ) : null}

        <button
          type="button"
          onClick={fillDemo}
          className="group w-full rounded-xl border border-dashed border-primary/35 bg-primary/5 px-3 py-2.5 text-left transition-colors hover:border-primary/60 hover:bg-primary/10"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            {t("auth.demoHint")}
          </span>
          <span className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-transparent bg-background/70 px-2.5 py-1.5 font-mono text-xs text-foreground">
            <span>{DEMO_EMAIL}</span>
            <span className="text-muted-foreground group-hover:text-foreground">
              {DEMO_PASSWORD}
            </span>
          </span>
        </button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          {t("auth.terms")}
        </p>
      </form>
    </AuthShell>
  );
}
