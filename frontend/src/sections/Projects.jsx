import { useEffect, useState } from 'react'

import { IconArrowRight, IconClose } from '../icons.jsx'
import { Reveal, SectionHead } from '../components/Chrome.jsx'
import { useBodyLock } from '../hooks.js'

function fileName(title) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.md`
}

function ProjectModal({ project, onClose }) {
  useBodyLock(Boolean(project))

  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="modal-veil" onMouseDown={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal__bar">
          <span className="modal__file">{fileName(project.title)}</span>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <IconClose style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div className="modal__body">
          <div className="project__kind">{project.kind}</div>
          <h3>{project.title}</h3>
          <p className="project__summary">{project.summary}</p>

          {Object.keys(project.metrics).length > 0 && (
            <div className="project__metrics">
              {Object.entries(project.metrics).map(([k, v]) => (
                <div key={k}>
                  <div className="metric__value">{v}</div>
                  <div className="metric__key">{k}</div>
                </div>
              ))}
            </div>
          )}

          <div className="modal__label">What it does</div>
          <ul className="bullets">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

          <div className="modal__label">Built with</div>
          <div className="stack-row">
            {project.stack.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>

          {project.link && (
            <div style={{ marginTop: 26 }}>
              <a className="btn btn--primary" href={project.link} target="_blank" rel="noreferrer">
                Open live project <IconArrowRight />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ projects }) {
  const [selected, setSelected] = useState(null)

  // Cursor-tracked glow, written straight to CSS custom properties.
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="section" id="projects">
      <SectionHead
        eyebrow="projects"
        title="Selected"
        accent="work"
        lead="Systems that went into real daily use — payroll for whole departments, data-quality pipelines, and a chatbot that answers business questions without SQL."
      />

      <div className="project-grid">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 100}>
            <button
              type="button"
              className="card project"
              onMouseMove={onMove}
              onClick={() => setSelected(p)}
              style={{ width: '100%', height: '100%' }}
            >
              <div className="project__kind">{p.kind}</div>
              <h3 className="project__title">{p.title}</h3>
              <p className="project__summary">{p.summary}</p>

              {Object.keys(p.metrics).length > 0 && (
                <div className="project__metrics">
                  {Object.entries(p.metrics)
                    .slice(0, 3)
                    .map(([k, v]) => (
                      <div key={k}>
                        <div className="metric__value">{v}</div>
                        <div className="metric__key">{k}</div>
                      </div>
                    ))}
                </div>
              )}

              <div className="stack-row" style={{ marginTop: 0 }}>
                {p.stack.slice(0, 4).map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="project__foot">
                <span className="project__more">
                  Read the detail <IconArrowRight />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
