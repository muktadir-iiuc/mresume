import { useEffect, useRef, useState } from 'react'

/** Adds `is-in` once the element scrolls into view (one-way, so nothing flickers). */
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}

/** Which section id is currently closest to the top of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  return active
}

/** 0 → 1 document scroll progress. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

/** Cycles through phrases with a typewriter effect. */
export function useTypewriter(phrases, { typeMs = 55, eraseMs = 28, holdMs = 1600 } = {}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    if (!phrases.length) return
    const full = phrases[index % phrases.length]

    if (!erasing && text === full) {
      const t = setTimeout(() => setErasing(true), holdMs)
      return () => clearTimeout(t)
    }

    if (erasing && text === '') {
      setErasing(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }

    const t = setTimeout(
      () => setText(erasing ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      erasing ? eraseMs : typeMs,
    )
    return () => clearTimeout(t)
  }, [text, erasing, index, phrases, typeMs, eraseMs, holdMs])

  return text
}

/** Locks body scroll while a modal/palette is open. */
export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
