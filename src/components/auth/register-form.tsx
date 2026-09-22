"use client";

import { useEffect, useRef, useState, useTransition } from "react";
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
  Lock,
  Mail,
  ShieldAlert,
  User,
} from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/auth/auth-shell";
import { authErrorKey } from "@/components/auth/auth-errors";
import { registerAction, type RegisterState } from "@/lib/actions/auth";

const registerSchema = z
  .object({
    name: z.string().trim().min(1, "required"),
    email: z
      .string()
      .trim()
      .min(1, "required")
      .refine((v) => z.email().safeParse(v).success, "email"),
    password: z.string().min(1, "required").min(8, "password"),
    confirmPassword: z.string().min(1, "required"),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "match",
      });
    }
  });

type RegisterValues = z.infer<typeof registerSchema>;

const initialState: RegisterState = {};

export function RegisterForm({ googleEnabled }: { googleEnabled: boolean }) {
  const t = useTranslations();
  const router = useRouter();
  const [serverState, formAction, actionPending] = useActionState(
    registerAction,
    initialState
  );
  const [isTransitioning, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [creds, setCreds] = useState<{ email: string; password: string } | null>(
    null
  );
  const completedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const pending = isTransitioning || actionPending;

  useEffect(() => {
    if (!serverState.ok || !creds || completedRef.current) return;
    completedRef.current = true;

    let active = true;
    (async () => {
      try {
        const result = await signIn("credentials", {
          email: creds.email,
          password: creds.password,
          redirect: false,
        });
        if (!active) return;
        if (result?.error) {
          completedRef.current = false;
          return;
        }
        toast.success(t("auth.successRegister"));
        router.push("/dashboard");
        router.refresh();
      } catch {
        completedRef.current = false;
      }
    })();

    return () => {
      active = false;
    };
  }, [serverState.ok, creds, router, t]);

  const onSubmit = handleSubmit((values) => {
    setCreds({
      email: values.email,
      password: values.password,
    });
    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("email", values.email);
    fd.set("password", values.password);
    fd.set("confirmPassword", values.confirmPassword);
    startTransition(() => {
      formAction(fd);
    });
  });

  const serverError = serverState.error;

  return (
    <AuthShell
      title={t("auth.registerTitle")}
      subtitle={t("auth.registerSubtitle")}
      footer={
        <p className="text-muted-foreground">
          {t("auth.hasAccount")}{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            {t("nav.login")}
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        {serverError ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2.5 text-sm text-danger"
          >
            <ShieldAlert className="mt-0.5 size-4 shrink-0" />
            <span>{t(authErrorKey(serverError))}</span>
          </div>
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="name">{t("auth.name")}</Label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              autoComplete="name"
              placeholder="Rakib Hasan"
              className="h-10 rounded-xl pl-9"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
          </div>
          {errors.name ? (
            <p id="name-error" className="text-xs text-danger">
              {t(authErrorKey(errors.name.message))}
            </p>
          ) : null}
        </div>

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
              autoComplete="new-password"
              placeholder="••••••••"
              className="h-10 rounded-xl pr-10 pl-9"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "password-error" : "password-hint"
              }
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          ) : (
            <p id="password-hint" className="text-xs text-muted-foreground">
              8+ characters
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              className="h-10 rounded-xl pr-10 pl-9"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "confirm-error" : undefined
              }
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showConfirm ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p id="confirm-error" className="text-xs text-danger">
              {t(authErrorKey(errors.confirmPassword.message))}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-1 w-full rounded-xl bg-gradient-brand text-white hover:opacity-90"
          disabled={pending}
        >
          {pending ? <Loader2 className="animate-spin" /> : null}
          {t("auth.registerCta")}
        </Button>

        {googleEnabled ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-xl"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            {t("auth.google")}
          </Button>
        ) : null}

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          {t("auth.terms")}
        </p>
      </form>
    </AuthShell>
  );
}
