// Talks to NYC Open Data (Socrata). Dataset jqfp-uff7: "Lead Service Line Location Coordinates".
// One row per property (BBL). Addresses are stored uppercase, ordinals stripped, words spelled out:
//   "175 WEST BROADWAY", "350 56 STREET", "100 BROADWAY".

const ENDPOINT = 'https://data.cityofnewyork.us/resource/jqfp-uff7.json'
const FIELDS = 'address,tbbl,material,record_ty,city_owned'

export interface ServiceLineRecord {
  address: string
  tbbl: string // borough-block-lot; first digit is the borough
  material: string
  record_ty: string // how the city knows
  city_owned?: string
}

export interface LookupResult {
  query: string // the normalized address we searched for
  records: ServiceLineRecord[]
  exact: boolean
}

const SUFFIXES: Record<string, string> = {
  ST: 'STREET', STR: 'STREET', AVE: 'AVENUE', AV: 'AVENUE', RD: 'ROAD', BLVD: 'BOULEVARD',
  PL: 'PLACE', DR: 'DRIVE', LN: 'LANE', CT: 'COURT', PKWY: 'PARKWAY', HWY: 'HIGHWAY',
  SQ: 'SQUARE', TER: 'TERRACE', TERR: 'TERRACE', EXPY: 'EXPRESSWAY', TPKE: 'TURNPIKE', CIR: 'CIRCLE',
}

const DIRECTIONS: Record<string, string> = { E: 'EAST', W: 'WEST', N: 'NORTH', S: 'SOUTH' }

// Safe to expand anywhere after the house number, so lettered avenues work ("14 Ave A" -> "14 AVENUE A").
// ST is NOT here: in the middle of a name it usually means Saint ("92 ST MARKS PLACE").
const EXPAND_ANYWHERE: Record<string, string> = { AVE: 'AVENUE', AV: 'AVENUE' }

// "175 W Broadway, Apt 4B, New York, NY" -> "175 WEST BROADWAY"
// "175 W Broadway #4B"                  -> "175 WEST BROADWAY"
// "350 56th St"                         -> "350 56 STREET"
export function normalizeAddress(raw: string): string {
  const street = raw.split(',')[0] ?? ''
  const cleaned = street
    .toUpperCase()
    .replace(/(?:\b(?:APT|APARTMENT|UNIT|STE|SUITE|FL|FLOOR)\b|#).*$/, '') // drop apartment/unit info
    .replace(/\./g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const tokens = cleaned.split(' ').filter(Boolean)
  return tokens
    .map((token, i) => {
      let t = token.replace(/^(\d+)(ST|ND|RD|TH)$/, '$1')
      if (i === 1 && DIRECTIONS[t]) t = DIRECTIONS[t]
      if (i > 0 && EXPAND_ANYWHERE[t]) t = EXPAND_ANYWHERE[t]
      else if (i > 0 && i === tokens.length - 1 && SUFFIXES[t]) t = SUFFIXES[t]
      return t
    })
    .join(' ')
}

async function query(where: string): Promise<ServiceLineRecord[]> {
  const params = new URLSearchParams({ $select: FIELDS, $where: where, $order: 'address', $limit: '10' })
  const res = await fetch(`${ENDPOINT}?${params.toString()}`)
  if (!res.ok) throw new Error(`NYC Open Data returned ${res.status}`)
  return (await res.json()) as ServiceLineRecord[]
}

export async function findServiceLines(input: string): Promise<LookupResult> {
  const normalized = normalizeAddress(input)
  if (!normalized) return { query: normalized, records: [], exact: true }

  const safe = normalized.replace(/'/g, "''") // SoQL escapes quotes by doubling them
  const exact = await query(`address = '${safe}'`)
  if (exact.length > 0) return { query: normalized, records: exact, exact: true }

  const close = await query(`starts_with(address, '${safe}')`)
  return { query: normalized, records: close, exact: false }
}
