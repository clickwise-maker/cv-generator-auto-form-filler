import { tr } from "@/lib/i18n/i18n";
import { Link } from "@tanstack/react-router";
import { LanguageSelect } from "@/components/language-select";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper py-4 text-center text-xs text-ink/60">
      <Link to="/refund-policy" className="underline-offset-2 hover:text-ink hover:underline">
        {tr("Refund Policy")}
      </Link>
      <span className="mx-2">·</span>
      <Link to="/services" className="underline-offset-2 hover:text-ink hover:underline">
        {tr("Services & Plans")}
      </Link>
      <span className="mx-2">·</span>
      <a href="/privacy" className="underline-offset-2 hover:text-ink hover:underline">
        {tr("Privacy & DPDP")}
      </a>
      <span className="mx-2">·</span>
      <Link to="/terms" className="underline-offset-2 hover:text-ink hover:underline">
        {tr("Terms")}
      </Link>
      <span className="mx-2">·</span>
      <Link to="/faq" className="underline-offset-2 hover:text-ink hover:underline">
        {tr("FAQ")}
      </Link>
      <span className="mx-2">·</span>
      <Link to="/about" className="underline-offset-2 hover:text-ink hover:underline">
        {tr("About & Contact")}
      </Link>
      <div className="mt-3 flex justify-center">
        <LanguageSelect className="h-9 text-xs" />
      </div>
    </footer>
  );
}
