import type { ServiceLineRecord } from '../lib/serviceLines'
import { boroughFromBBL, materialInfo, recordInfo, titleCase } from '../lib/statusInfo'
import ConfidenceMeter from './ConfidenceMeter'
import NextSteps from './NextSteps'

export default function StatusCard({ record }: { record: ServiceLineRecord }) {
  const status = materialInfo(record.material)
  const how = recordInfo(record.record_ty)

  return (
    <article className={`status-card tone-${status.tone}`}>
      <header className="status-card-head">
        <div>
          <h3>{titleCase(record.address)}</h3>
          <p className="meta">
            {boroughFromBBL(record.tbbl)} · BBL {record.tbbl}
            {record.city_owned === 'Yes' ? ' · City-owned property' : ''}
          </p>
        </div>
        <span className={`badge tone-${status.tone}`}>{status.label}</span>
      </header>

      <p className="meaning">{status.meaning}</p>

      <div className="how-known">
        <div>
          <span className="eyebrow">How the city knows</span>
          <p><strong>{how.label}.</strong> {how.how}</p>
        </div>
        <ConfidenceMeter level={how.confidence} />
      </div>

      <NextSteps urgent={status.actNow || how.confidence === 1} />
    </article>
  )
}
