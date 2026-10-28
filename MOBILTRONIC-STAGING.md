# Mobiltronic staging delivery

## Follow-up verification — 2026-10-28

- Existing implementation commit `d175664` recovered intact; no user edits were present.
- Fresh lint, 17 unit/component tests and production build passed. Fresh production HTTP checks passed for all 18 staging pages, Bijan homepage isolation, noindex, canonical, robots, sitemap, 404s and disabled submission.
- Added four Playwright scenarios covering the original homepage, catalog/cart/comparison, empty checkout and mobile RTL navigation. Test discovery passes; browser execution remains NOT YET VERIFIED because Chromium download returned truncated archives in this environment.
- Repaired the e2e cleanup command (it referenced an absent script); explicitly bound the test server to loopback to avoid restricted network-interface enumeration.
- Added a pull-request/manual GitHub Actions workflow for lint, tests, production build and Chromium tests, including screenshot/trace artifact upload. Remote execution has not yet been verified.
- Connected GitHub app reports push permission; branch publication is being attempted through that app rather than unavailable shell credentials.
- Hosting integration discovery found Vercel available but unconnected. A connection is required before using that provider; no host project, production deployment or DNS was changed. Filesystem lead persistence must stay disabled on serverless hosting.


## Scope and audit

- Baseline: `b37b1288d5a553d9957779073113c89a26ea1f79` (`main`).
- Branch: `codex/mobiltronic-ecommerce`. No merge is authorized.
- Remote refs did not contain the previously reported branch or commit `5f4efe3…`; that local Mac checkout is unavailable here. This implementation was created from the confirmed remote baseline.
- Clean initial checkout; no user edits existed in this checkout.
- Read root AGENTS.md and installed Next.js 16.2.11 page, route and rewrite documentation.
- Existing Next.js/React/MDX stack retained, with no added dependencies or package-lock changes.
- Baseline lint and production build passed; baseline Vitest found no tests. The first baseline build completed with only `/` and `/_not-found` routes, before storefront files were introduced. Host configuration edits overlapped that run; final host behavior was checked separately.
- Repository contains chemistry/education manifests, but the confirmed baseline only exposes the video homepage. All original files except additive Next configuration remain unchanged.
- No hosting-provider project, credentials or existing deployment configuration was found. No DNS or production infrastructure was changed.

## Implementation

Mobiltronic lives under `/mobiltronic` with scoped styles and Persian RTL content. Only host `mobiltronic.bijan.se` receives a beforeFiles rewrite to that namespace. `_next`, API and already prefixed routes are excluded. The Bijan homepage and root layout remain untouched. Canonical links target staging, and both metadata and HTTP headers prohibit indexing. `/robots.txt` on the staging host disallows all; its sitemap is available but deliberately not advertised to crawlers.

Implemented pages: home, catalog, two categories, three products, comparison, cart, checkout, organizational purchasing, quotation, about, contact, shipping/returns, warranty, privacy and buying guides. Shared header, mobile navigation, category/product cards, specifications, availability states, cart summary, lead form, FAQ and footer are included. Search handles common Arabic/Persian character variants. Cart is namespaced in browser storage, validates imported values and supports quantities 1–999, removal and cross-tab updates. Unknown product/category paths return 404.

No prices, inventory, reviews, credentials, company history, warranty promises or final legal terms were fabricated. Device artwork is explicitly labeled as an illustration, not a real product photograph. No real payment integration exists. Generic Product JSON-LD omits offers, price, inventory and ratings; merchant rich-result eligibility is not claimed.

### Product sources

Only the limited specifications in `lib/mobiltronic/catalog.ts` were published, checked on 2026-10-28:

- PNC560: https://www.hytera.com/eu/products/mcs-device/pnc560 — 5G/LTE, 6.3-inch display, 5040 mAh, IP68.
- PNC460: https://livesite2.hytera.com/en/product-new/lte-broadband/poc-radio/pnc460.html — Android 12, 5-inch display, 4500 mAh, IP68.
- PNC380: https://www.hytera.com/en/product-new/lte-broadband/poc-radio/pnc380.html — 4G/WLAN, 5MP camera, 4000 mAh, IP67.

Regional variants and supplied accessories still require confirmation. No Iranian network or service compatibility is promised.

## Inquiry persistence

`POST /api/mobiltronic/leads` accepts only JSON, bounds streamed input to 16 KiB, validates contact details, consent, B2B company/industry, catalog identifiers and integer quantities, and enforces an exact approved origin and matching request host. It returns no personal data in errors.

Default: HTTP 503, no success receipt. To enable on a dedicated Node/POSIX host, both `MOBILTRONIC_LEADS_ENABLED=true` and an absolute `MOBILTRONIC_LEAD_DIRECTORY` are required. Use a persistent volume outside web-accessible paths; never an ephemeral/serverless filesystem. A receipt is issued only after an exclusive UUID-named file is written, fsynced, closed, and the directory fsynced. Directory mode is 0700 and new file mode 0600. Files contain a `received` status, timestamp and validated request. Restricted server operators can track status in these records; no public tracking or administrator UI is provided.

Before enabling real collection: approve privacy details, designate the data controller and support contact, set retention/deletion and backup procedures, restrict volume access and deploy edge rate limiting. The example proxy includes lead throttling. Application-level distributed abuse protection is not implemented. Email delivery is not configured, and file receipt does not promise staff notification or a response time. Use test data until operations and privacy details are approved.

## Staging deployment preparation

Prepared isolated-service examples:

- `deployment/Dockerfile.mobiltronic`: separate Node 22 build/runtime, non-root service. Existing app deployment settings remain intact.
- `deployment/mobiltronic.env.example`: disabled lead collection by default.
- `deployment/mobiltronic.nginx.example.conf`: a new staging-only TLS virtual host with rate limiting and forwarded host.
- `.dockerignore`: excludes Git state, dependencies, build output, environment files and test artifacts.

Intended topology: independent container bound to `127.0.0.1:3200`, existing authorized reverse proxy routing only `mobiltronic.bijan.se`, a separately provisioned TLS certificate and (if enabled) a writable persistent lead volume owned by the container user. Never replace the existing Bijan service or its virtual host. Do not use this Dockerfile on a production deployment automatically. Verify supported Node architecture, image build, proxy syntax and volume permissions on the target host before rollout. Docker and nginx execution were unavailable here; these examples are NOT YET VERIFIED.

Exact deployment blockers: no authorized hosting project/server access, no staging domain attachment/TLS evidence and no deployment credentials were available in this environment. No staging deployment occurred. The requested staging hostname is not evidence of a live app.

GitHub read access worked. Push failed with `could not read Username for 'https://github.com'`; no usable GitHub publishing credentials were present. The previous invalid-token report was not reused as current evidence.

## Verification

- ESLint: passed.
- TypeScript: passed, also checked by the production build.
- Production Next.js build: passed.
- Vitest: 17 tests passed across API/data boundaries and React component interactions.
- Persistence tested in unit tests and through the built production HTTP server: enabled storage returned 201 with a matching record, received status and 0600 file permissions. Unwritable storage returns 503. This validates local storage behavior, not a deployed persistent volume.
- Production HTTP smoke: 18 staging pages returned 200 with Persian RTL markup, canonical URLs and noindex; robots, sitemap, unknown-path 404s, direct `/mobiltronic` access and disabled lead response passed.
- Original `bijan.se/`: production HTTP response still contains the original video and no Mobiltronic content or noindex header. Original page/layout/package/lock files have no diff.
- Reproducible HTTP checks: `node scripts/mobiltronic-smoke.mjs` against a production server, with optional `MOBILTRONIC_TEST_URL` override.
- Browser screenshots, visual/mobile/accessibility audits, keyboard navigation and Core Web Vitals: NOT YET VERIFIED. Managed preview invokes `next dev --host ... --strictPort`; Next rejects those Vite arguments. No production application code was changed to work around the preview infrastructure.
- Existing Playwright configuration retained. Full browser suite execution is NOT YET VERIFIED; no pre-existing e2e tests were present in the baseline.
- Live hosting, TLS, deployed persistence, backup restoration and proxy rate limiting: NOT YET VERIFIED.

## Migration readiness and missing business data

`Product` is a reusable typed model containing ID, SKU, brand, model, category, Persian description, specifications, image/alt fields, accessories, price/inventory status, warranty, SEO metadata, source and verification date. UI consumes this model; images/accessories are deliberately empty until verified. Future importer mapping must preserve unique stable IDs and SKU, validate category references, safely handle unknown statuses, audit source provenance, and map old URLs to reviewed redirects. Keep price/stock unknown until verified, and preserve current cart identifiers or version storage on a breaking catalog change.

No old Mobiltronic data dump, database access, original URL inventory or migration permission was provided. Migration architecture is prepared; an actual migration has NOT been performed or verified.

Missing business inputs: legal company identity, contact channels, product images and rights, actual offered regional variants, supply/stock/prices, tax/invoice rules, shipping/returns, warranty providers, approved privacy/retention terms, PoC service compatibility and costs, payment-provider credentials and target-host access.

## Production approval gate

Never deploy or change DNS for `mobiltronic.ir` under this staging authorization. That requires explicit separate approval after approved commercial/legal data, payment integration (if desired), verified browser/mobile/accessibility and operational checks, a reviewed migration plan and a tested rollback plan. No automatic main merge is permitted.
