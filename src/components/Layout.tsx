import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="wordmark">
          <span className="wordmark-tile" aria-hidden="true">Pb</span>
          Lead Line Lens
        </Link>
        <nav className="site-nav" aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/check">Check an address</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          Data: NYC DEP service line inventory, via{' '}
          <a href="https://data.cityofnewyork.us/d/jqfp-uff7" target="_blank" rel="noreferrer">NYC Open Data</a>.
          This site shows the city&apos;s records, not a test of your water.
        </p>
      </footer>
    </div>
  )
}
