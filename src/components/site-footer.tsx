import { tr } from "@/lib/i18n/i18n";
import { LanguageSelect } from "@/components/language-select";
import { LogoMark, Wordmark } from "@/components/brand";

const COLS: [string, [string, string][]][] = [
  ["Product", [["/", "CV generator"], ["/templates", "Templates"], ["/services", "Services & Plans"], ["/dashboard", "Dashboard"]]],
  ["Help", [["/guides", "Guides"], ["/faq", "FAQ"], ["/about", "About & Contact"]]],
  ["Legal", [["/privacy", "Privacy & DPDP"], ["/terms", "Terms"], ["/refund-policy", "Refund Policy"]]],
];

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-6 pt-14 text-[#D9D2C5]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href="/" className="flex items-center gap-2" aria-label="formzolo home">
            <LogoMark />
            <Wordmark onDark />
          </a>
          <p className="mt-3 max-w-xs text-sm">{tr("Free CV maker and form filler. One profile, reviewed by you, reused everywhere. Made in India.")}</p>
        </div>
        {COLS.map(([h, links]) => (
          <div key={h}>
            <h4 className="mb-3 font-semibold text-white">{tr(h)}</h4>
            <ul className="space-y-2 text-sm">
              {links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-white">{tr(label)}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-[#2E2A24] px-4 pt-5 text-xs">
        <span>© {new Date().getFullYear()} formzolo · formzalo.com</span>
        <LanguageSelect className="h-9 text-xs" />
      </div>
    </footer>
  );
}
