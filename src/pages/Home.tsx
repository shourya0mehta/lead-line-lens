import { Link, useNavigate } from 'react-router-dom'
import AddressSearch from '../components/AddressSearch'
import type { Tone } from '../lib/statusInfo'

// Citywide counts from the NYC DEP inventory, updated Jan 30, 2026.
const STATS: Array<{ value: string; label: string; tone: Tone }> = [
  { value: '117,561', label: 'Lead', tone: 'lead' },
  { value: '114,473', label: 'Unknown', tone: 'unknown' },
  { value: '3,050', label: 'Galvanized, needs replacement', tone: 'grr' },
  { value: '582,483', label: 'Not lead, per records', tone: 'nonlead' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <section className="hero">
        <span className="eyebrow">New York City · water service lines</span>
        <h1>Is there a lead pipe under your building?</h1>
        <p className="lede">
          The city keeps a record for every property&apos;s water line, but more than 114,000 are still marked
          unknown. Look yours up in ten seconds.
        </p>
        <AddressSearch size="large" onSearch={(a) => navigate(`/check?address=${encodeURIComponent(a)}`)} />
        <p className="hint">
          Try <Link to="/check?address=175%20W%20Broadway">175 W Broadway</Link> or{' '}
          <Link to="/check?address=350%2056th%20St">350 56th St</Link>
        </p>
      </section>

      <section className="stats" aria-label="Citywide inventory">
        {STATS.map((s) => (
          <div key={s.label} className={`stat tone-${s.tone}`}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>
      <p className="source-note">NYC DEP inventory of 856,912 properties, updated January 30, 2026.</p>

      <section className="steps">
        <h2>How it works</h2>
        <ol>
          <li><strong>Look up your address.</strong> We pull the city&apos;s official record for your property.</li>
          <li><strong>See how sure the city is.</strong> A pipe a crew dug up is different from a guess based on old paperwork.</li>
          <li><strong>Know what to do next.</strong> Free test kits, the right filter, and the city&apos;s replacement program.</li>
        </ol>
      </section>
    </>
  )
}
