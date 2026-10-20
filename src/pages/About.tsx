import ConfidenceMeter from '../components/ConfidenceMeter'
import { RECORD_TYPES } from '../lib/statusInfo'

export default function About() {
  return (
    <div className="about">
      <section>
        <span className="eyebrow">Why this exists</span>
        <h1>NYC doesn&apos;t know what 114,473 water pipes are made of</h1>
        <p className="lede">
          In 2017, a model built by university researchers told Flint which homes most likely had lead pipes. Crews
          following it found lead at about 70% of the homes they dug up. In 2018 the city&apos;s contractor stopped
          using the model and dug every house on the block instead. The hit rate fell to 15%.
        </p>
        <p>
          New York has the same question at a bigger scale: 114,473 properties are still marked unknown. Lead Line
          Lens starts by making the city&apos;s own records easy to read, including how sure the city actually is.
        </p>
      </section>

      <section>
        <h2>How the city knows</h2>
        <p>Every record says how the city decided what the pipe is made of. Some ways are much more reliable than others.</p>
        <table className="record-table">
          <thead>
            <tr><th>Method</th><th>What it means</th><th>How sure</th><th className="num">Properties</th></tr>
          </thead>
          <tbody>
            {RECORD_TYPES.map((r) => (
              <tr key={r.key}>
                <td>{r.label}</td>
                <td>{r.how}</td>
                <td><ConfidenceMeter level={r.confidence} /></td>
                <td className="num">{r.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="source-note">NYC DEP service line inventory, updated January 30, 2026.</p>
      </section>

      <section>
        <h2>What&apos;s next</h2>
        <p>
          A map of every property, then a model that estimates how likely each unknown line is to be lead. It will
          learn from the roughly 208,000 properties where someone saw the pipe, and it will be graded the way
          Flint&apos;s was: when a crew digs where the model points, how often is there lead?
        </p>
      </section>
    </div>
  )
}
