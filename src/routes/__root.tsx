import { Fragment, useEffect } from "react";
import { LANG_BOOT, useLang } from "@/lib/i18n/i18n";
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";
import { ADS, ADSENSE_CLIENT, adsenseScriptSrc } from "@/config/ads";

import { SITE_URL } from "@/lib/seo-keywords";
import { LOCALE_SEO, hreflangLinks, langFromSearch, localeUrl } from "@/lib/seo-locales";

import { resolvePublicRoute, legacyPublicRoute, publicAlternates, registry } from "@/lib/public-locale-routing.mjs";
import { schemaGraph } from "@/lib/seo-graph.mjs";
import { LEGACY_PUBLIC_SEO,legacyBreadcrumbs } from "@/lib/legacy-public-seo";
import { publicBreadcrumbs, publicPageCopy } from "@/lib/public-locales";



const SITE = SITE_URL;
const GSC = (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined) || "";
/** Privacy-friendly analytics (Plausible-compatible). OFF unless VITE_ANALYTICS_DOMAIN is set at build time. No cookies. */
const ANALYTICS_DOMAIN = (import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined) || "";
const ANALYTICS_SRC =
  (import.meta.env.VITE_ANALYTICS_SRC as string | undefined) || "https://plausible.io/js/script.js";

/** Loads the saved UI language and remounts the page tree when it changes, so every string re-translates. */
function LangRoot() {
  const lang = useLang((s) => s.lang);
  const load = useLang((s) => s.load);
  const pathname = useRouterState({select: (state) => state.location.pathname});
  const publicRoute = resolvePublicRoute(pathname);
  useEffect(() => { if (!publicRoute) load(); }, [load, publicRoute?.locale]);
  return (
    <Fragment key={publicRoute?.locale ?? lang}>
      <Outlet />
    </Fragment>
  );
}

export const Route = createRootRoute({
  head: ({ matches }) => {
    const leaf = matches[matches.length - 1];
    const lang = langFromSearch(leaf?.search);
    const path = (leaf?.pathname || "/").replace(/(.)\/+$/, "$1");
    const publicRoute = resolvePublicRoute(path) ?? legacyPublicRoute(path, (leaf?.search as {lang?:unknown} | undefined)?.lang);
    const legacySeo=LEGACY_PUBLIC_SEO[path];
    const publicCopy = publicRoute ? publicPageCopy(publicRoute) : null;
    const seo = LOCALE_SEO[lang];
    const APP_NAME = publicCopy ? `${publicCopy.title} | FormZalo` : legacySeo ? `${legacySeo.title} — FormZalo` : seo.title;
    const DESCRIPTION = publicCopy?.description ?? legacySeo?.description ?? seo.description;
    const url = publicRoute?.url ?? (legacySeo ? `${SITE}${path}` : localeUrl(path, lang));
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: APP_NAME },
        { name: "description", content: DESCRIPTION },
        ...(ADS.enabled ? [{ name: "google-adsense-account", content: ADSENSE_CLIENT }] : []),

        { property: "og:title", content: APP_NAME },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "FormZalo" },
        { property: "og:image", content: `${SITE}/og.jpg` },
        { property: "og:url", content: url },
        { property: "og:locale", content: publicRoute ? registry.locales[publicRoute.locale].ogLocale : legacySeo ? "en_IN" : seo.ogLocale },
        ...(!legacySeo && publicRoute ? registry.activeLocales.map(locale => registry.locales[locale].ogLocale).filter(locale=>locale!==registry.locales[publicRoute.locale].ogLocale) : legacySeo ? [] : Object.values(LOCALE_SEO).filter(x=>x.ogLocale!==seo.ogLocale).map(x=>x.ogLocale))
          .map(locale=>({property:"og:locale:alternate",content:locale})),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: APP_NAME },
        { name: "twitter:description", content: DESCRIPTION },
        { name: "twitter:image", content: `${SITE}/og.jpg` },
        { name: "theme-color", content: "#1b4d3e" },
        // Search Console: set VITE_GOOGLE_SITE_VERIFICATION at build time (off when unset).
        ...(GSC ? [{ name: "google-site-verification", content: GSC }] : []),
      ],
      scripts: [
        ...((publicRoute || legacySeo) ? [{type:"application/ld+json",children:JSON.stringify(schemaGraph({url,title:APP_NAME,description:DESCRIPTION,language:publicRoute?.languageTag??"en",breadcrumbs:publicRoute?publicBreadcrumbs(publicRoute.locale,publicRoute.page):legacyBreadcrumbs(path),freeBuilder:publicRoute?.page==="home"}))}] : []),
        ...(ANALYTICS_DOMAIN
          ? [{ src: ANALYTICS_SRC, defer: true, "data-domain": ANALYTICS_DOMAIN }]
          : []),
        // AdSense loads ONLY when VITE_ADSENSE_CLIENT is a valid ca-pub id (src/config/ads.ts). Off by default.
        ...(ADS.enabled
          ? [{ src: adsenseScriptSrc(), async: true, crossOrigin: "anonymous" as const }]
          : []),
      ],
      links: [
        { rel: "canonical", href: url },
        ...(publicRoute ? publicAlternates(publicRoute.locale, publicRoute.page) : legacySeo ? [{rel:"alternate",hrefLang:"en",href:url},{rel:"alternate",hrefLang:"x-default",href:url}] : hreflangLinks(path)),
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
    };
  },
  component: RootDocument,
});

function RootDocument() {
  const pathname=useRouterState({select:(state)=>state.location.pathname});
  const publicRoute=resolvePublicRoute(pathname);
  return (
    <html lang={publicRoute?.languageTag ?? "en"} dir={publicRoute?.dir ?? "ltr"} className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        {!publicRoute && <script dangerouslySetInnerHTML={{ __html: LANG_BOOT }} />}
      </head>
      <body>
        {!publicRoute && <noscript>
          <p>FormZalo: sign in to build a CV and download Color PDF or Plain PDF without a watermark. Document reading proposes fields for review; it is not verified generative writing or automatic application submission. <a href="/en/services/">Plans and dated checkout availability</a> · <a href="/en/help/">Document limits and help</a></p>
        </noscript>}
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
  );
}
