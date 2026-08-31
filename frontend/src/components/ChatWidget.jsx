import { useEffect, useRef, useState } from 'react'

import { askChat } from '../api.js'
import { IconChat, IconClose, IconSend } from '../icons.jsx'

const OPENER = {
  role: 'bot',
  text:
    'Ask me anything about his background — experience, a specific technology, projects, ' +
    'education or how to reach him. Same idea as his Employee Data Chatbot: plain English ' +
    'in, a database query out.',
}

const STARTERS = [
  'Experience with Python?',
  'Show me his projects',
  'Which databases?',
  'How to contact him?',
]

/**
 * Floating "ask the résumé" assistant. Docked bottom-right rather than living in
 * the page flow, so it stays reachable from every section.
 */
export default function ChatWidget({ openSignal = 0 }) {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [messages, setMessages] = useState([OPENER])
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [suggestions, setSuggestions] = useState(STARTERS)

  const logRef = useRef(null)
  const inputRef = useRef(null)

  // Let the command palette (or anything else) pop the dock open.
  useEffect(() => {
    if (openSignal > 0) setOpen(true)
  }, [openSignal])

  // A single quiet nudge so visitors notice the assistant exists.
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 4500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open) {
      setNudge(false)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, pending, open])

  const send = async (question) => {
    const q = question.trim()
    if (!q || pending) return

    setMessages((m) => [...m, { role: 'me', text: q }])
    setDraft('')
    setPending(true)

    try {
      const res = await askChat(q)
      setMessages((m) => [
        ...m,
        { role: 'bot', text: res.answer, intent: res.intent, rows: res.data },
      ])
      if (res.suggestions?.length) setSuggestions(res.suggestions)
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'bot', text: `The API did not answer: ${err.message}`, intent: 'error' },
      ])
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <div className={`chatdock${open ? ' is-open' : ''}`} role="dialog" aria-label="Ask the résumé">
        <div className="chatdock__bar">
          <span className="dot" />
          <span className="chatdock__title">Ask the résumé</span>
          <span className="chatdock__route">POST /api/chat</span>
          <button
            type="button"
            className="modal__close"
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
          >
            <IconClose style={{ width: 15, height: 15 }} />
          </button>
        </div>

        <div className="chat__log chatdock__log" ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg msg--${m.role === 'me' ? 'me' : 'bot'}`}>
              {m.role === 'bot' && m.intent && <span className="msg__tag">intent: {m.intent}</span>}
              {m.text}
              {m.rows?.length > 0 && (
                <div className="msg__rows">
                  {m.rows.slice(0, 5).map((row, k) => (
                    <div key={k}>
                      {Object.entries(row).map(([key, val]) => (
                        <span key={key}>
                          <span className="k">{key}</span>
                          {`: ${Array.isArray(val) ? val.join(', ') : val}   `}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {pending && (
            <div className="msg msg--bot">
              <span className="typing">
                <i />
                <i />
                <i />
              </span>
            </div>
          )}
        </div>

        <div className="chat__suggest chatdock__suggest">
          {suggestions.slice(0, 4).map((s) => (
            <button
              key={s}
              type="button"
              className="filter"
              onClick={() => send(s)}
              disabled={pending}
            >
              {s}
            </button>
          ))}
        </div>

        <form
          className="chat__form"
          onSubmit={(e) => {
            e.preventDefault()
            send(draft)
          }}
        >
          <input
            ref={inputRef}
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about his experience…"
            aria-label="Your question"
          />
          <button
            type="submit"
            className="icon-btn"
            disabled={pending || !draft.trim()}
            aria-label="Send question"
          >
            <IconSend style={{ width: 18, height: 18 }} />
          </button>
        </form>
      </div>

      {nudge && !open && (
        <button type="button" className="chatfab__nudge" onClick={() => setOpen(true)}>
          Ask me about his experience
        </button>
      )}

      <button
        type="button"
        className={`chatfab${open ? ' is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close the résumé assistant' : 'Open the résumé assistant'}
      >
        {open ? <IconClose /> : <IconChat />}
        {!open && <span className="chatfab__ping" aria-hidden="true" />}
      </button>
    </>
  )
}
