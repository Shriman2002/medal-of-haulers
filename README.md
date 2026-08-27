# Medal of Haulers

Marketing site for Medal of Haulers — a veteran-owned moving, junk removal, and
donation pickup company serving the DMV, Northern Virginia, and Richmond.

Built from the design handoff in `../design_handoff_medal_of_haulers/`. All
customer-facing copy is client-approved and carried over verbatim.

## Stack

- **Next.js 16** (App Router, TypeScript) — seven real routes, all statically generated
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css` under `@theme`
- **Archivo** via `next/font/google`, self-hosted at build time
- **lucide-react** for icons; Instagram/Facebook marks are inlined in `src/components/ui/BrandIcons.tsx`
- **react-hook-form + zod** — one schema validates on both the client and the server

## Getting started

```bash
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build (server target, `/api/estimate` live) |
| `npm run build:static` | Static export to `out/` for the GitHub Pages review site |
| `npm run build:production` | Static export for the live domain (requires `NEXT_PUBLIC_SITE_URL`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run check:copy` | Asserts every prose string in the design prototype still appears verbatim in `src/content/site.ts` |
| `npm run prepare:logo` | Regenerates `public/logo-*.png` from `assets/moh-logo.png` |

## Project shape

```
src/
  app/                 seven routes + api/estimate + sitemap.ts + robots.ts
  components/
    layout/            header, drawer, CTA banner, footer, mobile action bar
    ui/                Button, PhotoPlaceholder, PageHeader, Logo, BrandIcons
    sections/          FaqAccordion
    estimate/          EstimateForm, PhotoPicker, SuccessPanel, field shells
  content/site.ts      ALL copy — single source of truth
  lib/                 estimate-schema.ts (shared), metadata.ts
```

## Design rules

Flat and architectural. Structure comes from **2px rules**, never shadows or
curves. Enforced globally in `globals.css`:

- `border-radius: 0` everywhere
- no `box-shadow`
- no transitions or animations — state changes are instant, by design
- `:focus-visible` is a 2px gold outline at 2px offset. **Do not remove it.**

The single breakpoint that matters is `nav: 1140px`, below which the desktop nav
gives way to the hamburger drawer and the fixed bottom action bar.

## Open items

### 1. Photography and maps

Eight photo slots and two map graphics are still diagonal-hatch placeholders —
real photography was never delivered with the handoff. Each is a one-line swap:
add `src` (and `alt`) to the slot in `PHOTO_SLOTS` in `src/content/site.ts` and
`PhotoPlaceholder` renders the image instead. No component changes needed.

### 2. The estimate form does not send anywhere yet

`src/app/api/estimate/route.ts` is **deliberately stubbed**. The form, its
validation, and its success *and* error states are complete and work end to end
against it — it validates, writes uploads to `.tmp/estimate-uploads/`, and logs
the payload, but delivers nothing.

To go live, see the `TODO(provider)` block in that file. In short: photos to
object storage, then a transactional email to medalofhaulers@gmail.com carrying
*links* rather than attachments (ten 10 MB files is 100 MB, far past Gmail's
~25 MB ceiling), plus real spam protection on top of the existing honeypot and
timing checks. Nothing else in the app changes — the client only reads
`{ ok, error }`.

### 3. Logo

`assets/moh-logo.png` is the client's original 2000×2000 PNG. It renders on navy
with `mix-blend-mode: screen` to drop its dark ground out. If a
transparent-background version turns up, use it and remove the blend mode from
`src/components/ui/Logo.tsx`.

### 4. Domain

`medalofhaulers.com`, registered on the client's own Cloudflare account.
`SITE_URL` in `src/lib/metadata.ts` defaults to it; `NEXT_PUBLIC_SITE_URL`
overrides. It drives canonicals, OpenGraph, the sitemap, and robots.txt.

## Deployment

### Client-review site (GitHub Pages)

Live at **https://shriman2002.github.io/medal-of-haulers/**, published by
`.github/workflows/deploy-pages.yml` on every push to `main`.

This is a **review deployment for design sign-off only**, and differs from
production in three deliberate ways:

1. **The form does not send anything.** GitHub Pages has no server runtime, so
   the build sets `NEXT_PUBLIC_DEMO_MODE=1`. Validation, conditional panels, the
   photo picker and its type/size/count checks all behave exactly as designed —
   only the network call is skipped, and submitting goes straight to the
   thank-you screen. No submission is sent or stored, so no real lead can be
   silently lost here.
2. **It is invisible to search engines** — `noindex, nofollow` plus a
   disallow-all `robots.txt`, via `NEXT_PUBLIC_PREVIEW=1`. A public staging copy
   that got indexed would compete with the real domain later.
3. **`/api/estimate` is not deployed.** `output: "export"` cannot include a POST
   handler, so `scripts/build-static.mjs` moves `src/app/api` aside for the
   duration of the export and restores it afterwards. The route is untouched in
   the normal `npm run build`.

Because Pages serves the site from `/medal-of-haulers`, `NEXT_PUBLIC_BASE_PATH`
is set at build time. Note that Next applies `basePath` to its own bundles and to
`next/link`, but **not** to hand-written `<img src="/...">` — those go through
`assetPath()` in `src/lib/asset-path.ts`. Use it for any new public/ asset.

### Production (Cloudflare Workers, static assets)

Built with `npm run build:production`, which differs from the review build in
three ways: served from the root (no base path), **indexable**, and the estimate
form is **offline** rather than demo.

The build refuses to run if the resolved site URL looks like a staging one
(github.io, localhost, example.*), so a preview URL cannot end up baked into
every canonical, the sitemap, and the OpenGraph tags.

**Cloudflare Workers Builds settings**

| Setting | Value |
| --- | --- |
| Build command | `npm run build:production` |
| Output directory | `out` |
| Deploy command | `npx wrangler deploy` |

No build variables are required. The production domain is a constant in
`scripts/build-static.mjs` (`NEXT_PUBLIC_SITE_URL` overrides it if ever needed),
and Node is pinned by `.nvmrc`. Workers Builds cannot set build variables until
after the project exists, so requiring either would fail the first deploy.

Deploys are driven by `wrangler.jsonc` — an assets-only Worker pointing at
`out/`, with no Worker script.

Because the domain is in the same Cloudflare account, attaching it under
**Custom domains** creates the DNS records and certificate automatically — there
are no records to add by hand.

### `FORM_MODE` — read this before changing it

`src/lib/metadata.ts` exposes three modes, set via `NEXT_PUBLIC_FORM_MODE`:

- **`live`** — posts to `/api/estimate`. Needs a server or a form endpoint.
- **`demo`** — skips the network call and shows the success screen. **Review site
  only.** Safe there because nobody real submits.
- **`offline`** — no submit button; the form points to the phone and email.
  The correct setting for a public static build with no backend.

⚠️ **Never ship `demo` to a public domain.** It tells a real customer their
request was received when nothing was sent — a lost job every time, and a
customer who believes they have made contact.

### Other hosts

Not currently deployed there. The build is intentionally host-agnostic: all seven pages are
statically generated and the only server dependency is the single
`/api/estimate` route handler.

- **AWS Amplify Hosting** — closest thing to Vercel on AWS; the route handler
  works unchanged. Recommended.
- **SST v3 / OpenNext → Lambda + CloudFront** — cheapest at low traffic,
  infrastructure-as-code, steeper learning curve.
- **S3 + CloudFront (static export)** — simplest and cheapest, but has no server
  runtime, so `/api/estimate` would have to move to API Gateway + Lambda or a
  hosted form service.
- **App Runner / ECS Fargate** — more infrastructure than this site needs.
