# Lead Line Lens: instructions for AI coding tools

Read this before every task. If something here is out of date, say so instead of guessing.

## What we're building
Lead Line Lens is a web app for New York City residents. You type an address and see the city's official record
for the building's water service line (lead, galvanized needing replacement, unknown, not lead), how the city knows
(excavation, inspection, old records, a model), and what to do next. Later: a citywide map and a model that
estimates how likely each "unknown" line is to be lead.

Built by Shourya Mehta (Cornell, Information Science, Data Science concentration) for the Sustainabytes WebDev
group, fall 2026. I'm comfortable with Python and data work and newer to React, so explain React-specific choices.

## Stack (don't add anything else without asking)
- React 19 + TypeScript + Vite, React Router v7 (routes live in `src/main.tsx`)
- Supabase client in `src/lib/supabase.ts` (no tables yet; SQL comes in Week 5)
- Vercel for deploys; `vercel.json` rewrites every route to `index.html`
- Data: NYC Open Data dataset `jqfp-uff7` ("Lead Service Line Location Coordinates"), queried with SoQL

## Where things go
- All API calls go through `src/lib/serviceLines.ts`. Components never call `fetch` directly.
- All labels, colors and confidence levels come from `src/lib/statusInfo.ts`.
- Pages in `src/pages/`, reusable pieces in `src/components/`, styles in `src/index.css` (CSS variables at the top).

## Rules
- Ask before adding a dependency, and explain why you're suggesting any change.
- Never write copy that tells a user their water is "safe". Show the city's official status first and point to
  free 311 test kits.
- Dataset addresses are uppercase, with ordinals removed and words spelled out ("175 WEST BROADWAY",
  "350 56 STREET"). Normalize user input with `normalizeAddress` before querying.
- Keep the visual style: light paper background, serif headings, the status colors in `index.css`. No dark,
  neon "AI app" look.
- Typed props, small components, no `any`. Run `npm run build` before saying something works.

## Commands
- `npm run dev`: local dev server
- `npm run build`: type-check and build
- `npm run preview`: serve the production build
