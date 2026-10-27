import { Fragment, useEffect } from "react";
import { LANG_BOOT, useLang } from "@/lib/i18n/i18n";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";
import { ADS, adsenseScriptSrc } from "@/config/ads";

const APP_NAME = "Free CV generator and auto form filler";
const DESCRIPTION =
  "Free auto form filler and free CV generator. International auto CB generator: read a photo, image, or PDF, autofill the form, and download PDF or Word.";
const KEYWORDS =
  "auto CB generator, international CB generator, auto form filler, free auto form filler, free CV generator, auto populate, CV generator";

const SITE = "https://cvstudio-app.onrender.com";
const GSC = (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined) || "";
/** Privacy-friendly analytics (Plausible-compatible). OFF unless VITE_ANALYTICS_DOMAIN is set at build time. No cookies. */
const ANALYTICS_DOMAIN = (import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined) || "";
const ANALYTICS_SRC = (import.meta.env.VITE_ANALYTICS_SRC as string | undefined) || "https://plausible.io/js/script.js";

/** Loads the saved UI language and remounts the page tree when it changes, so every string re-translates. */
function LangRoot() {
  const lang = useLang((s) => s.lang);
  const load = useLang((s) => s.load);
  useEffect(() => load(), [load]);
  return (
    <Fragment key={lang}>
      <Outlet />
    </Fragment>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CV Studio" },
      { property: "og:image", content: `${SITE}/og.jpg` },
      { property: "og:url", content: SITE },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE}/og.jpg` },
      { name: "theme-color", content: "#1b4d3e" },
      // Search Console: set VITE_GOOGLE_SITE_VERIFICATION at build time (off when unset).
      ...(GSC ? [{ name: "google-site-verification", content: GSC }] : []),
    ],
    scripts: [
      ...(ANALYTICS_DOMAIN ? [{ src: ANALYTICS_SRC, defer: true, "data-domain": ANALYTICS_DOMAIN }] : []),
      // AdSense loads ONLY when ADS.enabled (src/config/ads.ts). Off by default.
      ...(ADS.enabled ? [{ src: adsenseScriptSrc(), async: true, crossOrigin: "anonymous" as const }] : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT }} />
      </head>
      <body>
        <noscript>
          <p>
            CV Studio: free CV builder (no login), plain and designed templates, PDF/DOCX download, free watermarked
            download and an Auto Form Filler for job applications. Single Use ₹20/$1, Career Starter ₹1,000/year,
            Global Pro $29/year. Support: team@clickwisewe24in.we24.in (reviewed within 2 working days).{" "}
            <a href="/services">Services &amp; Plans</a> · <a href="/refund-policy">Refund Policy</a>
          </p>
        </noscript>
        <PreviewHostBridge />
        <AuthProvider>
          <LangRoot />
        </AuthProvider>
        <Toaster
          theme="light"
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--color-sheet)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-line)",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
