import { useEffect, useState } from 'react'

import {
  IconArrowUp,
  IconDatabase,
  IconSearch,
} from '../icons.jsx'
import { useReveal } from '../hooks.js'

/* -------------------------------------------------------------- Activity rail */

export function Rail({ sections, active, onNavigate }) {
  return (
    <nav className="rail" aria-label="Section rail">
      <div className="rail__logo" aria-hidden="true">
        M
      </div>
      {sections.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className={`rail__btn${active === id ? ' is-active' : ''}`}
          onClick={() => onNavigate(id)}
          aria-label={label}
          aria-current={active === id ? 'true' : undefined}
        >
          <Icon />
          <span className="rail__tip">{label}</span>
        </button>
      ))}
      <span className="rail__spacer" />
    </nav>
  )
}

/* ------------------------------------------------------------------- Tab bar */

export function TabBar({ sections, active, onNavigate, onOpenPalette }) {
  return (
    <div className="tabbar">
      <div className="tabbar__scroll">
        {sections.map(({ id, file }) => (
          <button
            key={id}
            type="button"
            className={`tab${active === id ? ' is-active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <span className="tab__dot" />
            {file}
          </button>
        ))}
      </div>
      <button type="button" className="tabbar__cmd" onClick={onOpenPalette}>
        <IconSearch style={{ width: 14, height: 14 }} />
        <span className="statusbar__hide-sm">Jump to…</span>
        <span className="kbd">Ctrl K</span>
      </button>
    </div>
  )
}

/* ---------------------------------------------------------------- Status bar */

export function StatusBar({ profile, apiOnline, activeLabel }) {
  const [clock, setClock] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <footer className="statusbar">
      <span className="statusbar__item statusbar__item--accent">
        <IconDatabase style={{ width: 13, height: 13 }} />
        PostgreSQL
      </span>
      <span className="statusbar__item">
        <span className={`dot${apiOnline ? '' : ' dot--off'}`} />
        {apiOnline ? 'FastAPI connected' : 'API offline'}
      </span>
      <span className="statusbar__item statusbar__hide-sm">{activeLabel}</span>
      <span className="statusbar__spacer" />
      <span className="statusbar__item statusbar__hide-sm">{profile.location}</span>
      {/* <span className="statusbar__item statusbar__hide-sm">Abyss</span> */}
      <span className="statusbar__item">
        {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
    </footer>
  )
}

/* ------------------------------------------------------------ Scroll progress */

export function Progress({ value }) {
  return <div className="progress" style={{ transform: `scaleX(${value})` }} aria-hidden="true" />
}

/* -------------------------------------------------------------- Back to top */

export function BackToTop() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`totop${on ? ' is-on' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <IconArrowUp style={{ width: 18, height: 18 }} />
    </button>
  )
}

/* ------------------------------------------------------- Section scaffolding */

export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function SectionHead({ eyebrow, title, accent, lead }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {title} <span className="accent">{accent}</span>
      </h2>
      {lead && <p>{lead}</p>}
    </Reveal>
  )
}
