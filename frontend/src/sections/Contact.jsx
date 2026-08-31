import { useState } from 'react'

import { sendContact } from '../api.js'
import {
  IconGithub,
  IconLinkedin,
  IconMail,
  IconPhone,
  IconPin,
  IconSend,
  IconTerminal,
} from '../icons.jsx'
import { Reveal, SectionHead } from '../components/Chrome.jsx'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState(null) // { kind: 'ok' | 'err', text }
  const [sending, setSending] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    try {
      const saved = await sendContact(form)
      setStatus({
        kind: 'ok',
        text: `Message #${saved.id} stored. Thanks ${saved.name.split(' ')[0]} — he'll reply to ${saved.email}.`,
      })
      setForm(EMPTY)
    } catch (err) {
      setStatus({ kind: 'err', text: err.message })
    } finally {
      setSending(false)
    }
  }

  const links = [
    { Icon: IconMail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { Icon: IconPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    {
      Icon: IconLinkedin,
      label: 'LinkedIn',
      value: 'mohammad-abdul-moktadir',
      href: profile.linkedin,
    },
    { Icon: IconGithub, label: 'GitHub', value: 'muktadir-iiuc', href: profile.github },
    { Icon: IconTerminal, label: 'HackerRank', value: 'muktadir_iiuc', href: profile.hackerrank },
    { Icon: IconPin, label: 'Location', value: profile.location, href: null },
  ]

  return (
    <section className="section" id="contact">
      <SectionHead
        eyebrow="contact"
        title="Let's build"
        accent="something solid"
        lead="Open to senior backend, data engineering and AI automation roles — remote or Chattogram-based. Messages land in PostgreSQL through the API."
      />

      <div className="contact">
        <div className="contact__links">
          {links.map((l, i) => {
            const body = (
              <>
                <span className="linkrow__icon">
                  <l.Icon />
                </span>
                <div>
                  <div className="linkrow__label">{l.label}</div>
                  <div className="linkrow__value">{l.value}</div>
                </div>
              </>
            )

            return (
              <Reveal key={l.label} delay={i * 70}>
                {l.href ? (
                  <a
                    className="card linkrow"
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="card linkrow">{body}</div>
                )}
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={120}>
          <form className="card form" onSubmit={submit}>
            <div className="field--split">
              <div className="field">
                <label htmlFor="c-name">Your name</label>
                <input
                  id="c-name"
                  className="input"
                  value={form.name}
                  onChange={set('name')}
                  required
                  minLength={2}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  required
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-subject">Subject</label>
              <input
                id="c-subject"
                className="input"
                value={form.subject}
                onChange={set('subject')}
                required
                minLength={2}
                placeholder="Senior backend role — FastAPI"
              />
            </div>

            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                className="textarea"
                value={form.message}
                onChange={set('message')}
                required
                minLength={10}
                placeholder="A few lines about the role or project…"
              />
            </div>

            {status && (
              <div className={`form__note form__note--${status.kind === 'ok' ? 'ok' : 'err'}`}>
                {status.text}
              </div>
            )}

            <div>
              <button type="submit" className="btn btn--primary" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'} <IconSend />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
