import { cookies } from "next/headers";

export const LANGUAGE_COOKIE_NAME = "sagactlab_lang";
export const supportedLanguages = ["en", "bn"] as const;

export type Language = (typeof supportedLanguages)[number];

export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value;

  if (value === "bn") {
    return "bn";
  }

  return "en";
}
