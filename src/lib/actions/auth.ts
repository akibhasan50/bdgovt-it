"use server";

import { z } from "zod";
import { createUser } from "@/lib/users-store";

export type RegisterState = {
  ok?: boolean;
  error?: "required" | "email" | "password" | "match" | "exists";
};

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

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    const code = parsed.error.issues[0]?.message;
    if (
      code === "required" ||
      code === "email" ||
      code === "password" ||
      code === "match"
    ) {
      return { error: code };
    }
    return { error: "required" };
  }

  const user = createUser(
    parsed.data.name,
    parsed.data.email,
    parsed.data.password
  );
  if (!user) return { error: "exists" };

  return { ok: true };
}
