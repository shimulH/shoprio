import { setLanguageAction } from "@/app/actions";
import type { Language } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLanguage: Language;
  pathname: string;
  variant?: "light" | "dark";
};

const labels: Record<Language, { english: string; bangla: string }> = {
  en: {
    english: "English",
    bangla: "Bangla",
  },
  bn: {
    english: "ইংরেজি",
    bangla: "বাংলা",
  },
};

export function LanguageSwitcher({
  currentLanguage,
  pathname,
  variant = "light",
}: LanguageSwitcherProps) {
  const isDark = variant === "dark";
  const label = labels[currentLanguage];

  return (
    <form
      action={setLanguageAction}
      className={`inline-flex items-center gap-1 rounded-full border p-1 ${
        isDark
          ? "border-white/12 bg-white/8 text-white"
          : "border-[rgba(15,38,29,0.1)] bg-white text-[#10261d]"
      }`}
    >
      <input type="hidden" name="pathname" value={pathname} />
      {(["en", "bn"] as const).map((language) => {
        const active = currentLanguage === language;
        const text = language === "en" ? label.english : label.bangla;

        return (
          <button
            key={language}
            type="submit"
            name="language"
            value={language}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
              active
                ? isDark
                  ? "bg-white text-[#0f261d]"
                  : "bg-[#0f261d] text-white"
                : isDark
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-[#5f7167] hover:bg-[#f6f4ec] hover:text-[#10261d]"
            }`}
          >
            {text}
          </button>
        );
      })}
    </form>
  );
}
