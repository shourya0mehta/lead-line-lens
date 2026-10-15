import type { Confidence } from '../lib/statusInfo'

const LABELS: Record<Confidence, string> = { 1: 'Low', 2: 'Medium', 3: 'High' }

export default function ConfidenceMeter({ level }: { level: Confidence }) {
  return (
    <div className="confidence" aria-label={`How sure the city is: ${LABELS[level]}`}>
      <span className="eyebrow">How sure</span>
      <span className="confidence-bars" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className={n <= level ? 'on' : ''} />
        ))}
      </span>
      <span className="confidence-label">{LABELS[level]}</span>
    </div>
  )
}
