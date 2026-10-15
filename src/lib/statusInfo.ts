// Plain-language labels for the city's codes. Copy rule: never tell anyone their water is "safe".

export type Tone = 'lead' | 'grr' | 'unknown' | 'nonlead' | 'na'
export type Confidence = 1 | 2 | 3

export interface MaterialInfo {
  label: string
  tone: Tone
  meaning: string
  actNow: boolean // show the "what to do now" steps
}

const MATERIALS: Record<string, MaterialInfo> = {
  'Lead': {
    label: 'Lead',
    tone: 'lead',
    meaning: 'City records list a lead service line for this property.',
    actNow: true,
  },
  'Galvanized Service Line Requiring Replacement': {
    label: 'Galvanized, needs replacement',
    tone: 'grr',
    meaning: 'A galvanized steel pipe that is or was connected to lead, so it can carry lead. It is slated for replacement.',
    actNow: true,
  },
  'Unknown - Lead Status Unknown': {
    label: 'Unknown',
    tone: 'unknown',
    meaning: "The city doesn't know what this pipe is made of yet. Treat it as possibly lead until it's checked.",
    actNow: true,
  },
  'Non-Lead': {
    label: 'Not lead, per city records',
    tone: 'nonlead',
    meaning: 'City records list this service line as not lead. Plumbing inside the building can still contain lead.',
    actNow: false,
  },
  'Non-Applicable': {
    label: 'Not applicable',
    tone: 'na',
    meaning: 'The city marks this property as not applicable, usually because there is no water service line to classify.',
    actNow: false,
  },
}

export function materialInfo(material: string): MaterialInfo {
  return MATERIALS[material] ?? { label: material || 'No status', tone: 'na', meaning: 'This is a status we don’t recognize yet.', actNow: true }
}

export interface RecordInfo {
  label: string
  how: string
  confidence: Confidence
}

// Counts from the Jan 30, 2026 inventory (856,912 properties).
export const RECORD_TYPES: Array<RecordInfo & { key: string; count: number }> = [
  { key: 'Excavation', label: 'Excavation', how: 'Crews dug down and saw the pipe.', confidence: 3, count: 74722 },
  { key: 'Field Inspection', label: 'Field inspection', how: 'Someone inspected the pipe in person.', confidence: 3, count: 139102 },
  { key: 'Customer Identification', label: 'Customer identification', how: 'The owner or a resident checked the pipe and reported it.', confidence: 2, count: 178 },
  { key: 'Records', label: 'City records', how: 'Based on historical paperwork, not a recent look at the pipe.', confidence: 2, count: 500822 },
  { key: 'Statistical Analysis/Predictive Model', label: 'Predictive model', how: 'Estimated by a statistical model. Nobody has looked at this pipe.', confidence: 1, count: 39818 },
  { key: 'Other', label: 'Other', how: 'Classified by another method.', confidence: 1, count: 35188 },
  { key: 'Not Verified', label: 'Not verified', how: 'The city has not verified this pipe yet.', confidence: 1, count: 67082 },
]

export function recordInfo(recordType: string): RecordInfo {
  return RECORD_TYPES.find((r) => r.key === recordType) ?? { label: recordType || 'Not stated', how: 'The city did not say how it knows.', confidence: 1 }
}

const BOROUGHS: Record<string, string> = { '1': 'Manhattan', '2': 'Bronx', '3': 'Brooklyn', '4': 'Queens', '5': 'Staten Island' }

export function boroughFromBBL(bbl: string): string {
  return BOROUGHS[bbl?.charAt(0)] ?? 'NYC'
}

export function titleCase(address: string): string {
  return address.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase())
}
