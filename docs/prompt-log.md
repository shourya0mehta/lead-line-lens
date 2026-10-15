# Week 3 prompt log

Tool: Claude (Cowork), with CLAUDE.md as the instructions file.
Feature: address lookup on the Check page (official NYC record, how the city knows, how sure, next steps).

| # | What I asked / tested | What came back | What we changed or decided |
|---|---|---|---|
| 1 | "I like Lead Line Lens. Do the progress I'm expected to have made so far (Weeks 1-3), don't over-deliver, keep it quick. If it asks for frontend design, make that too." | Read the Week 1-3 handouts. Built a Vite + React + TypeScript app with React Router (Home, Check, About, 404), a Supabase client, vercel.json, CLAUDE.md, and an address lookup that calls NYC Open Data. | Kept scope to what the handouts ask for. Map and prediction model left for later weeks. |
| 2 | First approach: send the address to the API exactly as typed. Tested with two real addresses. | "175 W Broadway" and "350 56th St" both returned 0 results. The city stores them as "175 WEST BROADWAY" and "350 56 STREET". | Correction: added `normalizeAddress()` (drops "th/st/nd/rd", spells out W/E/N/S and St/Ave/Rd, removes apartment numbers and anything after a comma). Re-tested: both found. 7 of 7 normalizer test cases pass. |
| 3 | Tested "100 Broadway". | Two different properties came back, one in Manhattan and one in Brooklyn. | Every result card shows the borough (read from the first digit of the BBL) and the summary line says "Check the borough." |

Takeaway for sync: the first draft assumed the data looks like what people type. Checking real API responses caught it before it shipped.
