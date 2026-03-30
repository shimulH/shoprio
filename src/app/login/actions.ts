"use server";

import { redirect } from "next/navigation";
import { clearSession, createSession, demoCredentials } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (email !== demoCredentials.email || password !== demoCredentials.password) {
    redirect("/login?error=invalid_credentials");
  }

  await createSession();
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
