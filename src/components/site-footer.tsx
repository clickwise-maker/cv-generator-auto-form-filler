import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper py-4 text-center text-xs text-ink/60">
      <Link to="/refund-policy" className="underline-offset-2 hover:text-ink hover:underline">
        Refund Policy
      </Link>
      <span className="mx-2">·</span>
      <Link to="/services" className="underline-offset-2 hover:text-ink hover:underline">
        Services &amp; Plans
      </Link>
      <span className="mx-2">·</span>
      <a href="/privacy" className="underline-offset-2 hover:text-ink hover:underline">
        Privacy &amp; DPDP / गोपनीयता
      </a>
      <span className="mx-2">·</span>
      <Link to="/terms" className="underline-offset-2 hover:text-ink hover:underline">
        Terms
      </Link>
      <span className="mx-2">·</span>
      <Link to="/faq" className="underline-offset-2 hover:text-ink hover:underline">
        FAQ
      </Link>
      <span className="mx-2">·</span>
      <Link to="/about" className="underline-offset-2 hover:text-ink hover:underline">
        About &amp; Contact
      </Link>
    </footer>
  );
}
