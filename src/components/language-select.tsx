import { LANGS, useLang, useT } from "@/lib/i18n/i18n";
import { cn } from "@/lib/utils";

export function LanguageSelect({ className }: { className?: string }) {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const setLang = useLang((s) => s.setLang);
  return (
    <select
      data-testid="lang-toggle"
      aria-label={t("Language")}
      value={lang}
      onChange={(e) => setLang(e.target.value as (typeof LANGS)[number]["id"])}
      className={cn("h-11 shrink-0 rounded-full border border-line bg-sheet px-3 text-sm font-medium text-forest", className)}
    >
      {LANGS.map((l) => (
        <option key={l.id} value={l.id} lang={l.id}>
          {l.label}
        </option>
      ))}
    </select>
  );
}

