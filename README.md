# Lead Line Lens

Look up whether the water service line to a New York City building is lead, how sure the city is, and what to do
next. Sustainabytes WebDev project, fall 2026.

Data: NYC DEP service line inventory on NYC Open Data
([jqfp-uff7](https://data.cityofnewyork.us/d/jqfp-uff7)), 856,912 properties, updated January 30, 2026.

## Run it
```bash
npm install
cp .env.example .env.local   # add your Supabase URL and anon key
npm run dev
```

## Deploy
Import the GitHub repo in Vercel (framework: Vite), add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under
Environment Variables, and deploy.

## Structure
- `src/main.tsx`: routes (`/`, `/check`, `/about`, 404)
- `src/pages/`: Home, Check, About, NotFound
- `src/components/`: Layout, AddressSearch, StatusCard, ConfidenceMeter, NextSteps
- `src/lib/`: `serviceLines.ts` (API + address normalizing), `statusInfo.ts` (labels), `supabase.ts`
- `CLAUDE.md`: instructions for AI coding tools
- `docs/prompt-log.md`: Week 3 prompt log
