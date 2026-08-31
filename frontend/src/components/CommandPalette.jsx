import { useEffect, useMemo, useRef, useState } from 'react'

import { useBodyLock } from '../hooks.js'

export default function CommandPalette({ open, onClose, commands }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)

  useBodyLock(open)

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      // Focus after the mount paint so the caret actually lands in the field.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q),
    )
  }, [query, commands])

  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(results.length - 1, 0)))
  }, [results.length])

  if (!open) return null

  const run = (cmd) => {
    onClose()
    cmd?.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') return onClose()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (c + 1) % Math.max(results.length, 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1))
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      run(results[cursor])
    }
  }

  return (
    <div className="palette-veil" onMouseDown={onClose} role="presentation">
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="palette__input"
          value={query}
          placeholder="Go to section, open a link, download the CV…"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className="palette__list">
          {results.length === 0 && <div className="palette__empty">No matching commands</div>}
          {results.map((cmd, i) => (
            <button
              key={cmd.label}
              type="button"
              className={`palette__row${i === cursor ? ' is-sel' : ''}`}
              onMouseEnter={() => setCursor(i)}
              onClick={() => run(cmd)}
            >
              <cmd.Icon />
              <span>{cmd.label}</span>
              {cmd.hint && <span className="palette__hint">{cmd.hint}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
