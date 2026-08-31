import { IconDatabase, IconPin, IconSpark, IconTerminal } from '../icons.jsx'
import { Reveal, SectionHead } from '../components/Chrome.jsx'

export default function About({ profile, experience }) {
  const yearsAt = experience.reduce(
    (acc, e) => acc + ((e.end_year ?? new Date().getFullYear()) - e.start_year || 1),
    0,
  )

  const facts = [
    { Icon: IconPin, label: 'Based in', value: profile.location },
    { Icon: IconTerminal, label: 'Core stack', value: 'Python · C# · SQL · FastAPI · .NET' },
    { Icon: IconDatabase, label: 'Data', value: 'SQL Server (MCSA) · PostgreSQL' },
    { Icon: IconSpark, label: 'Focus', value: 'LLM-assisted automation & NL-to-SQL' },
  ]

  // Split the résumé summary into readable paragraphs at sentence boundaries.
  const sentences = profile.summary.match(/[^.]+\./g) ?? [profile.summary]
  const half = Math.ceil(sentences.length / 2)
  const paragraphs = [sentences.slice(0, half).join(' '), sentences.slice(half).join(' ')]

  return (
    <section className="section" id="about">
      <SectionHead
        eyebrow="about"
        title="Fifteen years of"
        accent="shipping systems people rely on"
        lead="From factory-floor production systems to US data teams — the through-line is turning tangled business workflows into software that stays maintainable."
      />

      <div className="about">
        <Reveal className="card about__body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="about__quote">
            // {experience.length} roles · {yearsAt}+ accumulated years · enterprise apps used
            daily across multiple departments
          </p>
        </Reveal>

        <div className="about__aside">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 80}>
              <div className="card factrow">
                <span className="factrow__icon">
                  <f.Icon />
                </span>
                <div>
                  <div className="factrow__label">{f.label}</div>
                  <div className="factrow__value">{f.value}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
