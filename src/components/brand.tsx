import { tr } from "@/lib/i18n/i18n";

/** FormZalo mark: document with a brass check. */
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

// Nav labels go through tr(); listed here so the i18n key collector sees them.
// i18n-data:start
// "Home" "CV Templates" "Guides" "Plans" "FAQ" "About"
// i18n-data:end
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
          active ? "bg-forest/10 text-forest" : "text-ink/70 hover:bg-forest/5 hover:text-forest"
        } ${mobile ? "block rounded-xl px-4 py-3" : ""}`}
      >
        {tr(label)}
        {active && !mobile ? <span aria-hidden className="absolute bottom-0.5 left-1/2 -ml-2 h-0.5 w-4 rounded bg-brass" /> : null}
      </a>
    );
  };
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-sheet/95 text-ink backdrop-blur-sm">
      <nav className="mx-auto flex h-[64px] max-w-6xl sm:h-[72px] items-center gap-3 px-4" aria-label={tr("Main")}>
        <a href="/" className="me-auto flex items-center gap-2" aria-label="FormZalo home">
          <LogoMark size={30} />
          <Wordmark />
        </a>
        <div className="hidden items-center gap-1 md:flex">{NAV.map(([h, l]) => link(h, l))}</div>
        <a
          href="/#studio"
          className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#24624F] md:inline-block"
        >
          {tr("Start free")}
        </a>
        <details className="relative md:hidden">
          <summary className="list-none rounded-xl border border-line px-3 py-2 text-forest text-sm [&::-webkit-details-marker]:hidden" aria-label={tr("Menu")}>
            ☰
          </summary>
          <div className="fixed inset-x-0 top-[64px] grid gap-1 border-b border-line bg-sheet sm:top-[72px] px-4 pb-5 pt-3 shadow-2xl">
            {NAV.map(([h, l]) => link(h, l, true))}
            <a href="/#studio" className="mt-3 rounded-full bg-forest px-5 py-3 text-center font-semibold text-white">
              {tr("Start free")}
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
