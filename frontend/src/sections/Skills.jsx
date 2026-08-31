import { useEffect, useMemo, useRef, useState } from 'react'

import { SectionHead } from '../components/Chrome.jsx'

/** Fills the proficiency bar only once the card is actually on screen. */
function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFilled(true), Math.min(index, 12) * 45)
          io.unobserve(el)
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="card skill"
      style={{ animationDelay: `${Math.min(index, 14) * 35}ms` }}
    >
      <div className="skill__top">
        <div>
          <div className="skill__name">{skill.name}</div>
          <div className="skill__cat">{skill.category}</div>
        </div>
        <span className="skill__pct">{skill.level}%</span>
      </div>
      <div
        className="bar"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
      >
        <div className="bar__fill" style={{ width: filled ? `${skill.level}%` : 0 }} />
      </div>
    </div>
  )
}

export default function Skills({ skills }) {
  const [filter, setFilter] = useState('All')

  const categories = useMemo(() => {
    const counts = new Map()
    for (const s of skills) counts.set(s.category, (counts.get(s.category) ?? 0) + 1)
    return [['All', skills.length], ...counts.entries()]
  }, [skills])

  const visible = useMemo(
    () => (filter === 'All' ? skills : skills.filter((s) => s.category === filter)),
    [skills, filter],
  )

  return (
    <section className="section" id="skills">
      <SectionHead
        eyebrow="skills"
        title="The toolkit,"
        accent="honestly rated"
        lead="Filter by category. Levels reflect depth of production use, not certificates collected."
      />

      <div className="filters">
        {categories.map(([cat, count]) => (
          <button
            key={cat}
            type="button"
            className={`filter${filter === cat ? ' is-active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
            <span className="filter__count">{count}</span>
          </button>
        ))}
      </div>

      <div className="skill-grid">
        {visible.map((s, i) => (
          <SkillCard key={`${filter}-${s.id}`} skill={s} index={i} />
        ))}
      </div>
    </section>
  )
}
