# Deployment instructions — NOT authorization

PR5 is a source review package only. See [LAUNCH_PLAN.md](LAUNCH_PLAN.md) for release gates/rollback/canary/postlaunch detail. Main is stale; correct branch base is feature/free-cv-paid-filler-ads at5ccb8b4. Review PR3/PR4 independently; no merge or live update occurred here.

1. Recheck live source/version, compare full PR5 diff and review private-path/auth/export/payment/ads flags and untranslated/legal gaps. Obtain explicit release approval; t1656 covers only a separate AdSense-only unblock, not PR5.
2. Use safe public client build configuration through the existing approved build mechanism; never print/commit values. Run typecheck, targeted source tests, safe build:render and build:cloudflare. Do not run generic build (includes migrations). Snapshot full artifact/config/version and rollback handle.
3. Current supported Cloudflare connector has4MiB request cap/no full-artifact uploader plus asset-network restriction. STOP until the sanctioned deployment operator can transfer the original complete artifact while preserving settings. Do not use Wrangler, another credential/domain/browser route, strip assets, or change DNS/security to bypass the restriction. No confirmed merge→production pipeline exists; main merge is not a deployment method.
4. After approval/unblock, operator releases exact approved SHA via supported uploader. Recheck actual live routing,84 canonical URLs/alternates/robots/AI assets and required browser/auth/PDF gates before broad traffic. Staged first5→remaining7 is a plan requiring coherent activation metadata, not currently staged source.
5. Only after actual release/ownership/key verification, separately authorize any sitemap/IndexNow/direct directory action. Google live102-page Success predates this artifact and is not proof of84 live pages. Bing is unverified; do not repeat user-blocked consent/login.
6. Record source SHA/version/artifact/time in IST, non-sensitive smoke results and rollback decision. Production secrets, personal documents and account session values must not enter the repo/logs.

Local preview is not deployment. Authenticated runtime, real browser/mobile/native/a11y/performance/Unicode remain release blockers. AdSense Requires review, ads.txt missing and PR3 upload blocked are not solved by PR5 build success.
