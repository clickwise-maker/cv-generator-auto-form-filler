import { tr } from "@/lib/i18n/i18n";

/** formzolo mark: document with a brass check. */
export function LogoMark({ size = 36, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" style={onDark ? { filter: "drop-shadow(0 2px 6px rgba(0,0,0,.2))" } : undefined}>
      <rect width="40" height="40" rx="10" fill={onDark ? "#2C6B57" : "#1B4D3E"} />
      <path d="M12 10h13l4 4v16a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z" fill="#fff" />
      <path d="M15 17h10M15 21h10M15 25h6" stroke="#1B4D3E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="29" cy="29" r="6" fill="#A68456" />
      <path d="m26.5 29 1.8 1.8 3.2-3.4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <span className={`text-xl font-extrabold tracking-tight ${onDark ? "text-sheet" : "text-ink"} ${className}`}>
      form<b className={onDark ? "text-mist" : "text-forest"}>zolo</b>
    </span>
  );
}

const NAV: [string, string][] = [
  ["/", "Home"],
  ["/templates", "CV Templates"],
  ["/guides", "Guides"],
  ["/services", "Plans"],
  ["/faq", "FAQ"],
  ["/about", "About"],
];

/** Unified forest header. Sits flush on the green hero on the home page. */
export function SiteHeader({ current }: { current?: string }) {
  const link = (href: string, label: string, mobile = false) => {
    const active = current === href;
    return (
      <a
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative rounded-full px-3.5 py-2 text-[0.95rem] transition-colors ${
          active ? "bg-sheet/12 text-sheet" : "text-mist hover:bg-sheet/8 hover:text-sheet"
        } ${mobile ? "block rounded-xl px-4 py-3" : ""}`}
      >
        {tr(label)}
        {active && !mobile ? <span aria-hidden className="absolute bottom-0.5 left-1/2 -ml-2 h-0.5 w-4 rounded bg-brass" /> : null}
      </a>
    );
  };
  return (
    <header className="sticky top-0 z-40 border-b border-sheet/10 bg-forest text-sheet">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center gap-3 px-4" aria-label={tr("Main")}>
        <a href="/" className="me-auto flex items-center gap-2" aria-label="formzolo home">
          <LogoMark onDark />
          <Wordmark onDark />
        </a>
        <div className="hidden items-center gap-1 md:flex">{NAV.map(([h, l]) => link(h, l))}</div>
        <a
          href="/#studio"
          className="hidden rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-ink shadow-[0_4px_14px_rgba(0,0,0,.18)] transition-colors hover:bg-[#C2A273] md:inline-block"
        >
          {tr("Start free")}
        </a>
        <details className="relative md:hidden">
          <summary className="list-none rounded-xl border border-sheet/25 px-3 py-2 text-sm [&::-webkit-details-marker]:hidden" aria-label={tr("Menu")}>
            ☰
          </summary>
          <div className="fixed inset-x-0 top-[72px] grid gap-1 bg-forest-deep px-4 pb-5 pt-3 shadow-2xl">
            {NAV.map(([h, l]) => link(h, l, true))}
            <a href="/#studio" className="mt-3 rounded-full bg-brass px-5 py-3 text-center font-bold text-ink">
              {tr("Start free")}
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
