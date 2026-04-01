"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LANGUAGE_COOKIE_NAME, supportedLanguages, type Language } from "@/lib/i18n";

export async function setLanguageAction(formData: FormData) {
  const requestedLanguage = String(formData.get("language") ?? "en");
  const pathname = String(formData.get("pathname") ?? "/");
  const language: Language = supportedLanguages.includes(requestedLanguage as Language)
    ? (requestedLanguage as Language)
    : "en";

  const cookieStore = await cookies();
  cookieStore.set(LANGUAGE_COOKIE_NAME, language, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect(pathname);
}
