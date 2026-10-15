const TEST_KIT = 'https://www.nyc.gov/site/dep/water/lead-in-drinking-water-test-kit.page'
const LEAD_PIPE = 'https://www.nyc.gov/leadpipe'

export default function NextSteps({ urgent }: { urgent: boolean }) {
  if (!urgent) {
    return (
      <p className="next-steps quiet">
        Records can be wrong, and plumbing inside a building can contain lead too. Only a test shows what&apos;s in
        your water: call 311 or <a href={TEST_KIT} target="_blank" rel="noreferrer">request a free test kit</a>.
      </p>
    )
  }

  return (
    <div className="next-steps">
      <span className="eyebrow">What to do now</span>
      <ul>
        <li>Use only cold water for drinking, cooking and baby formula.</li>
        <li>If water has sat in the pipes for hours, run the cold tap for at least 30 seconds, or until it feels cold.</li>
        <li>Use a filter certified for lead reduction (NSF/ANSI 53).</li>
        <li>Get a free lead test kit: call 311 or <a href={TEST_KIT} target="_blank" rel="noreferrer">request one online</a>.</li>
        <li>See the city&apos;s service line map and free replacement program at <a href={LEAD_PIPE} target="_blank" rel="noreferrer">nyc.gov/leadpipe</a>.</li>
      </ul>
    </div>
  )
}
