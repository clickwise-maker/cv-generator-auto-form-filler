import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper py-4 text-center text-xs text-ink/60">
      <Link to="/refund-policy" className="underline-offset-2 hover:text-ink hover:underline">
        Refund Policy
      </Link>
    </footer>
  );
}
