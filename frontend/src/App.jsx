import { useCallback, useEffect, useMemo, useState } from 'react'

import { getResume } from './api.js'
import { CV_PATH } from './constants.js'
import { useActiveSection, useScrollProgress } from './hooks.js'
import {
  BackToTop,
  Progress,
  Rail,
  StatusBar,
  TabBar,
} from './components/Chrome.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import {
  IconAward,
  IconBriefcase,
  IconChat,
  IconCube,
  IconDownload,
  IconGithub,
  IconHome,
  IconLayers,
  IconLinkedin,
  IconMail,
  IconUser,
} from './icons.jsx'

import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import Credentials from './sections/Credentials.jsx'
import Contact from './sections/Contact.jsx'

const SECTIONS = [
  { id: 'home', label: 'Home', file: 'home.tsx', Icon: IconHome },
  { id: 'about', label: 'About', file: 'about.md', Icon: IconUser },
  { id: 'experience', label: 'Experience', file: 'experience.json', Icon: IconBriefcase },
  { id: 'skills', label: 'Skills', file: 'skills.yaml', Icon: IconLayers },
  { id: 'projects', label: 'Projects', file: 'projects.sql', Icon: IconCube },
  { id: 'credentials', label: 'Credentials', file: 'credentials.md', Icon: IconAward },
  { id: 'contact', label: 'Contact', file: 'contact.env', Icon: IconMail },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)

function Boot({ error, onRetry }) {
  if (!error) {
    return (
      <div className="boot">
        <div>
          <div className="spinner" />
          GET /api/resume …
        </div>
      </div>
    )
  }

  return (
    <div className="boot">
      <div className="boot__box">
        <h2>The API is not answering</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{error}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 14 }}>
          Start PostgreSQL, then from <code>backend/</code>:
        </p>
        <pre>
{`python -m app.seed
uvicorn app.main:app --reload --port 8000`}
        </pre>
        <button type="button" className="btn btn--ghost" style={{ marginTop: 18 }} onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  // Incremented to ask the floating assistant to open — it lives outside the page flow.
  const [chatSignal, setChatSignal] = useState(0)

  const active = useActiveSection(SECTION_IDS)
  const progress = useScrollProgress()

  const load = useCallback(() => {
    setError(null)
    setData(null)
    getResume()
      .then(setData)
      .catch((err) => setError(err.message))
  }, [])

  useEffect(load, [load])

  const navigate = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Ctrl/Cmd+K opens the palette anywhere on the page.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const commands = useMemo(() => {
    if (!data) return []
    const open = (url) => () => window.open(url, '_blank', 'noopener')

    return [
      ...SECTIONS.map((s) => ({
        label: `Go to ${s.label}`,
        hint: s.file,
        Icon: s.Icon,
        run: () => navigate(s.id),
      })),
      {
        label: 'Ask the résumé a question',
        hint: 'assistant',
        Icon: IconChat,
        run: () => setChatSignal((n) => n + 1),
      },
      { label: 'Download résumé (PDF)', hint: 'file', Icon: IconDownload, run: open(CV_PATH) },
      { label: 'Open GitHub', hint: 'external', Icon: IconGithub, run: open(data.profile.github) },
      {
        label: 'Open LinkedIn',
        hint: 'external',
        Icon: IconLinkedin,
        run: open(data.profile.linkedin),
      },
      {
        label: 'Open HackerRank',
        hint: 'external',
        Icon: IconAward,
        run: open(data.profile.hackerrank),
      },
      {
        label: `Email ${data.profile.email}`,
        hint: 'mailto',
        Icon: IconMail,
        run: () => {
          window.location.href = `mailto:${data.profile.email}`
        },
      },
    ]
  }, [data, navigate])

  if (!data) return <Boot error={error} onRetry={load} />

  const { profile, experience, skills, projects, education, certifications } = data

  const stats = [
    { value: `${profile.years_experience}+`, label: 'Years' },
    { value: experience.length, label: 'Companies' },
    { value: projects.length, label: 'Flagships' },
    { value: skills.length, label: 'Skills' },
  ]

  const activeLabel = SECTIONS.find((s) => s.id === active)?.file ?? ''

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <Progress value={progress} />
      <Rail sections={SECTIONS} active={active} onNavigate={navigate} />

      <div className="shell">
        <TabBar
          sections={SECTIONS}
          active={active}
          onNavigate={navigate}
          onOpenPalette={() => setPaletteOpen(true)}
        />

        <main className="content">
          <Hero profile={profile} stats={stats} onNavigate={navigate} />
          <About profile={profile} experience={experience} />
          <Experience experience={experience} />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Credentials education={education} certifications={certifications} />
          <Contact profile={profile} />
        </main>

        <footer className="footer">
          <div className="footer__in">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            {/* <span>React · FastAPI · PostgreSQL · VS Code “Abyss” palette</span> */}
          </div>
        </footer>
      </div>

      <StatusBar profile={profile} apiOnline={!error} activeLabel={activeLabel} />
      <BackToTop />
      <ChatWidget openSignal={chatSignal} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />
    </>
  )
}
