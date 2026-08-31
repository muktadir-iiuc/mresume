import { IconAward, IconGraduation } from '../icons.jsx'
import { Reveal, SectionHead } from '../components/Chrome.jsx'

export default function Credentials({ education, certifications }) {
  return (
    <section className="section" id="credentials">
      <SectionHead
        eyebrow="credentials"
        title="Education &"
        accent="certification"
      />

      <div className="two-col">
        <div>
          <Reveal>
            <div className="modal__label" style={{ marginTop: 0 }}>
              Education
            </div>
          </Reveal>
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 90}>
              <article className="card cred">
                <span className="cred__badge">
                  <IconGraduation />
                </span>
                <div>
                  <div className="cred__title">{e.degree}</div>
                  <div className="cred__detail">{e.institution}</div>
                  <div className="cred__meta">{e.period}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div>
          <Reveal>
            <div className="modal__label" style={{ marginTop: 0 }}>
              Certification
            </div>
          </Reveal>
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <article className="card cred">
                <span className="cred__badge">
                  <IconAward />
                </span>
                <div>
                  <div className="cred__title">{c.name}</div>
                  <div className="cred__detail">{c.detail}</div>
                  <div className="cred__meta">
                    {c.issued}
                    {c.credential_id && ` · MCID ${c.credential_id}`}
                    {c.url && (
                      <>
                        {' · '}
                        <a href={c.url} target="_blank" rel="noreferrer">
                          verify
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
