<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Karhari Media site migration (legacy → Next.js 16 App Router)

## Key decisions
- Section CSS stays as native `@scope` per-component files, NOT CSS Modules — the legacy scripts query class names directly (200+ selectors) and @scope isolates the ~34 cross-section collisions.
- `reactStrictMode: false` (legacy scripts append DOM + infinite tweens; double effects would duplicate content).
- Server build for **Vercel** (NOT static export anymore): the contact form POSTs to `app/api/contact`, which sends via Gmail SMTP (nodemailer). Env vars (set in `.env.local` + Vercel): `SMTP_USER` (Gmail with App Password), `SMTP_PASS`, optional `SMTP_HOST`/`SMTP_PORT`/`CONTACT_TO`. `next build` emits `.next`; `next start` works locally.
- Source of truth = `legacy/combined.html`; `tools/phase2-extract.js` regenerates components/CSS/scripts from it. **After re-running, always re-run `tools/remove-dead-rules.js`** (the extractor restores the dead `body/html/:root` rules inside @scope blocks).
- The extractor now applies an **event guard** to legacy scripts: `document.addEventListener('DOMContentLoaded', () => {...})` and `window.addEventListener('load', ...)` registrations are rewritten to run immediately when the event already fired (scripts run in React effects, after DCL). Scripts still say "do not hand-edit" — the guard is applied by the extractor.
- Dev on port 3100 — **port 3000 is occupied by the user's SEUM project**.

## Verification tooling (phase 5)
- `tools/visual-compare.js` — serves `legacy/` (port 3200) + prod Next (3100), drives headless Chrome over CDP: per-section bounding-box diffs (desktop 1440×900 + mobile 390×844), interaction checks (mobile nav toggle, anchor scroll, navbar scrolled, hero animation state, ScrollTrigger reveals), full-page + per-section screenshots to `%TEMP%\opencode\km-visual\`.
- `tools/img-diff.js <dir> [--coarse|--shift|--motion <dir2>]` — pixel diffs; `--motion` is the authoritative test: compare each page against itself across two runs (animation noise) vs legacy-vs-next (cross). Cross ≤ self-motion ⇒ visual parity.
- `tools/browser-smoke.js <url> [waitMs]` — quick DOM-state + error smoke test.
- Known benign diff: legacy mobile nav width flickers ±27px (its km8 slider overflow spawns a classic scrollbar) — Next is stable.
- `node --check` on the `.js` scripts is unreliable (CJS parse quirk) — validate with `node --input-type=module -e "import('./app/components/scripts/X.js')"` instead.

