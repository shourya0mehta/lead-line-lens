import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AddressSearch from '../components/AddressSearch'
import StatusCard from '../components/StatusCard'
import { findServiceLines, type LookupResult } from '../lib/serviceLines'

type RequestState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'done'; result: LookupResult }
  | { kind: 'error'; message: string }

export default function Check() {
  const [params, setParams] = useSearchParams()
  const address = params.get('address') ?? ''
  const [state, setState] = useState<RequestState>({ kind: 'idle' })

  // The address lives in the URL (?address=...), so results are shareable and the back button works.
  useEffect(() => {
    if (!address) {
      setState({ kind: 'idle' })
      return
    }
    let cancelled = false
    setState({ kind: 'loading' })
    findServiceLines(address)
      .then((result) => !cancelled && setState({ kind: 'done', result }))
      .catch((err: unknown) =>
        !cancelled && setState({ kind: 'error', message: err instanceof Error ? err.message : 'Unknown error' }),
      )
    return () => {
      cancelled = true
    }
  }, [address])

  return (
    <section className="check">
      <h1>Check an address</h1>
      <p className="lede">
        Type a street address in any of the five boroughs. You&apos;ll see the city&apos;s official record for that
        property&apos;s water service line.
      </p>
      <AddressSearch
        key={address}
        initialValue={address}
        busy={state.kind === 'loading'}
        onSearch={(a) => setParams({ address: a })}
      />

      <div className="results" aria-live="polite">
        {state.kind === 'loading' && <p className="status-line">Checking city records…</p>}
        {state.kind === 'error' && (
          <p className="status-line error">Couldn&apos;t reach NYC Open Data ({state.message}). Try again in a minute.</p>
        )}
        {state.kind === 'done' && <Results result={state.result} />}
      </div>
    </section>
  )
}

function Results({ result }: { result: LookupResult }) {
  const n = result.records.length

  if (n === 0) {
    return (
      <div className="empty">
        <p><strong>No match for “{result.query}”.</strong></p>
        <p>The city lists one main address per property. Try the building&apos;s main street address, without an apartment number.</p>
      </div>
    )
  }

  let summary = `1 property matches “${result.query}”.`
  if (!result.exact) summary = `No exact match for “${result.query}”. Closest addresses:`
  else if (n > 1) summary = `${n} properties match “${result.query}”. Check the borough.`

  return (
    <>
      <p className="status-line">{summary}</p>
      {result.records.map((r) => (
        <StatusCard key={`${r.tbbl}-${r.address}`} record={r} />
      ))}
    </>
  )
}
