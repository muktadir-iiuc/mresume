import { useState } from 'react'

import { IconChevronRight } from '../icons.jsx'
import { Reveal, SectionHead } from '../components/Chrome.jsx'

export default function Experience({ experience }) {
  // The most recent role starts expanded.
  const [open, setOpen] = useState(() => new Set([experience[0]?.id]))

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <section className="section" id="experience">
      <SectionHead
        eyebrow="experience"
        title="Where the work"
        accent="has happened"
        lead="Click any role to expand what was actually built there."
      />

      <div className="timeline">
        {experience.map((job, i) => {
          const isOpen = open.has(job.id)
          return (
            <Reveal key={job.id} delay={i * 90}>
              <article className={`card tl-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="tl-head"
                  onClick={() => toggle(job.id)}
                  aria-expanded={isOpen}
                >
                  <span className="tl-meta">
                    <IconChevronRight className="tl-chevron" style={{ width: 16, height: 16 }} />
                  </span>

                  <span className="tl-head__main">
                    <span className="tl-role">{job.role}</span>
                    <span className="tl-company">
                      {job.company} · {job.location}
                    </span>
                  </span>

                  <span className="tl-meta">
                    <span className="chip">{job.employment_type}</span>
                    {job.period}
                  </span>
                </button>

                <div className="tl-panel">
                  <div className="tl-panel__inner">
                    <div className="tl-body">
                      <ul className="bullets">
                        {job.highlights.map((h, k) => (
                          <li key={k}>{h}</li>
                        ))}
                      </ul>
                      <div className="stack-row">
                        {job.stack.map((t) => (
                          <span className="chip" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
