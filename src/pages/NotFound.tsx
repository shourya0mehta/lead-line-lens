import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>
        That page doesn&apos;t exist. <Link to="/check">Check an address</Link> instead.
      </p>
    </section>
  )
}
