import { useState, type FormEvent } from 'react'

interface Props {
  initialValue?: string
  onSearch: (address: string) => void
  busy?: boolean
  size?: 'large' | 'normal'
}

// Holds its own input state; tells the parent when someone submits an address.
export default function AddressSearch({ initialValue = '', onSearch, busy = false, size = 'normal' }: Props) {
  const [value, setValue] = useState(initialValue)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form className={`address-search ${size}`} onSubmit={handleSubmit} role="search">
      <label htmlFor="address" className="visually-hidden">Street address</label>
      <input
        id="address"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Street address, e.g. 175 W Broadway"
        autoComplete="street-address"
      />
      <button type="submit" disabled={busy || !value.trim()}>
        {busy ? 'Checking…' : 'Check'}
      </button>
    </form>
  )
}
