# Week 4 code review

I went through the Week 3 address lookup (`src/lib/serviceLines.ts` and `src/pages/Check.tsx`) line by line, the way I'd review someone else's pull request. I checked that every function and API call is real, what happens with empty or weird input, and whether anything sensitive is exposed. Every finding below was tested against the live NYC data.

## Fixed
1. Lettered avenues didn't work when typed with "Ave". The address cleaner only expanded abbreviations in the last word, so "14 Ave A" stayed "14 AVE A" and found nothing, because the city writes "14 AVENUE A". Over 10,000 properties are on lettered avenues like Avenue A and Avenue J. Now "Ave" gets expanded anywhere after the house number. "St" is left alone in the middle on purpose, since there it usually means Saint (92 St Marks Pl).
2. Apartment numbers written with # broke the search. "175 W Broadway #4B" became "175 WEST BROADWAY 4B" and matched nothing. Now anything after # is dropped, same as Apt or Unit.
3. Typing only "Apt 4B" showed No match for "" with empty quotes. Now it asks for a house number and street.

## Checked and fine
- Every API call is real: fetch, URLSearchParams, React Router's useSearchParams, and the starts_with function in the city's query language. Each query was run against the live data.
- If two searches overlap, the older one is ignored, so the page never shows results for the wrong address.
- The only key in the frontend is the Supabase publishable key, which is meant to be public. The secret key isn't in the code, and .env.local is gitignored.
- The address goes into the query, but quotes are escaped first, and the dataset is public and read only, so the worst case is a failed search.

## Still open
- No timeout. If NYC Open Data hangs, the page says "Checking city records…" forever. Plan: cancel after about 15 seconds and show an error.
- Spelled-out numbers like "Fifth Ave" don't match, since the city stores "5 AVENUE".
- Turn on row level security before adding Supabase tables in Week 5, since the publishable key is public.
