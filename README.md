# Circle of Mindfulness

A calm, modern website for a meditation / mindfulness business — built with
**Next.js 16** (App Router, React 19), **Tailwind CSS v4**, **TypeScript**, and a
**Sanity** CMS with an embedded Studio at `/studio`.

It includes:

- **Forside** (`/`) — landing page with hero, value props, blog & offering teasers.
- **Blog** (`/blog`, `/blog/[slug]`) — fully CMS-driven articles with portable text.
- **Forløb / Tilbud** (`/forloeb`, `/forloeb/[slug]`) — services / courses.
- **Meditationskort** (`/kort`) — the interactive card-draw tool (restyled).
- **Om** (`/om`) and **Kontakt** (`/kontakt`, with an optional email form).
- **Studio** (`/studio`) — the embedded Sanity content editor.

The whole site **builds and runs without any CMS credentials** — every
Sanity-driven page falls back to bundled content until you connect a project.

---

## Getting started

```bash
yarn install
cp .env.local.example .env.local   # then fill in the values
yarn dev
```

Open <http://localhost:3000>. The Studio lives at <http://localhost:3000/studio>.

## Environment variables

See `.env.local.example`. The important ones:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project id (from sanity.io/manage). **Required to go live.** |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | e.g. `2024-10-01`. |
| `SANITY_API_READ_TOKEN` | Optional — only for drafts / private datasets. |
| `SANITY_REVALIDATE_SECRET` | Optional — shared secret for the `/api/revalidate` webhook. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Optional — make the contact form send email via [Resend](https://resend.com). Without them the form still works (it just logs in dev). |

> Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set to a real id, content comes from
> bundled fallbacks and the 23 meditation cards in `src/data/cards.ts`.

## Sanity / CMS

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) and copy
   the project id into `.env.local` (and `sanity.cli.ts` reads it from there too).
2. Visit `/studio`, sign in, and start adding content. Singletons
   (Forside, Om, Forløb-side, Kontakt, Siteindstillinger) live at the top of the
   Studio; Blog, Forløb and Meditationskort are document lists.
3. **Seed a full Danish starting point** into Sanity (optional, one-off) — the
   page singletons (pre-filled), a sample author, categories, blog posts, forløb
   and all 23 meditation cards:

   ```bash
   npx sanity login                                   # first time only
   npx sanity exec scripts/seed.ts --with-user-token
   ```

   You don't strictly need this: every singleton already opens pre-filled via
   schema defaults — just open it in the Studio and press **Publish**.

4. **Revalidation (optional):** add a webhook in sanity.io/manage pointing to
   `https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>` so the
   site refreshes instantly on publish.

### Content model

`post`, `author`, `category`, `offering`, `card` (documents) and `homePage`,
`aboutPage`, `offeringsPage`, `contactPage`, `siteSettings` (singletons), plus
`blockContent` and `seo` objects. Schemas live in `src/sanity/schemaTypes/`,
queries in `src/sanity/lib/queries.ts`, and matching TypeScript types in
`src/sanity/types.ts`.

### Editing offering information boxes

Under **Forløb / Tilbud**, each offering has an editable audience introduction
and checklist (**Hvem er det for**), benefits (**Det får du**), and **Ekstra
informationsbokse** with a heading, optional introduction, and checklist. Boxes
appear below the description in up to three columns, stacking on mobile.
Choosing **Fysisk og online** shows separate location and online badges.

Yoga's **Tider** box lives inside **Beskrivelse** as a **Fremhævet boks**, directly
after the opening paragraph. Edit the two times on separate lines.

The customer feedback from 15 September 2026 has a targeted migration:

```bash
# Preview the requested changes without writing to Sanity.
yarn sanity exec scripts/apply-customer-feedback.ts --with-user-token
# Apply the reviewed changes to published documents and any existing drafts.
yarn sanity exec scripts/apply-customer-feedback.ts --with-user-token -- --apply
```

This migration backs up the three offerings in a temporary directory and uses
revision checks to protect concurrent edits. It preserves unrelated fields and
content. It applies the September copy, so do not rerun it over later customer
edits. Do not run the full seed against live content: it replaces documents.

Deploy schema and editor changes to the customer's hosted Studio as well:

```bash
yarn studio:deploy --schema-required
```

The hosted Studio is https://circleofmindfulness.sanity.studio and uses the same
Sanity dataset as the embedded `/studio`. Publishing content and deploying the
Studio are separate from deploying the Next.js website.

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the dev server. |
| `yarn build` / `yarn start` | Production build / serve. |
| `yarn lint` | ESLint. |
| `yarn typecheck` | `tsc --noEmit`. |
| `yarn format` | Prettier. |

## Project structure

```
src/
  app/
    (site)/        # public pages — wrapped in Header + Footer
    studio/        # embedded Sanity Studio (/studio)
    api/           # contact + revalidate route handlers
  components/      # layout, ui, blog, offerings, cards, home, brand
  sanity/          # client, queries, types, schemas, structure
  lib/             # site config, fonts, icons, helpers
  data/            # the 23 bundled meditation cards (seed + fallback)
sanity.config.ts   # embedded Studio config
```

## Deploy

Deploy to [Vercel](https://vercel.com/new). Add the environment variables in the
project settings, and add `https://<your-domain>` as a CORS origin in
sanity.io/manage (API → CORS origins) so the Studio can talk to your dataset.
