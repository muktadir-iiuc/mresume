import { IconArrowRight, IconDownload, IconMail } from '../icons.jsx'
import { useTypewriter } from '../hooks.js'
import { Reveal } from '../components/Chrome.jsx'
import { CV_PATH } from '../constants.js'

function Terminal({ profile }) {
  const lines = [
    <>
      <span className="tk-key">from</span> <span className="tk-fg">fastapi</span>{' '}
      <span className="tk-key">import</span> <span className="tk-cls">FastAPI</span>
    </>,
    <>
      <span className="tk-com"># 15+ years of enterprise engineering</span>
    </>,
    <>
      <span className="tk-type">class</span> <span className="tk-cls">Engineer</span>
      <span className="tk-fg">:</span>
    </>,
    <>
      {'    '}
      <span className="tk-var">name</span> <span className="tk-fg">=</span>{' '}
      <span className="tk-str">"{profile.name.split(' ').slice(-1)[0]}"</span>
    </>,
    <>
      {'    '}
      <span className="tk-var">stack</span> <span className="tk-fg">= [</span>
      <span className="tk-str">"Python"</span>
      <span className="tk-fg">, </span>
      <span className="tk-str">"C#"</span>
      <span className="tk-fg">, </span>
      <span className="tk-str">"SQL"</span>
      <span className="tk-fg">]</span>
    </>,
    <>
      {'    '}
      <span className="tk-var">years</span> <span className="tk-fg">=</span>{' '}
      <span className="tk-num">{profile.years_experience}</span>
    </>,
    <>{' '}</>,
    <>
      {'    '}
      <span className="tk-type">def</span> <span className="tk-fn">ship</span>
      <span className="tk-fg">(</span>
      <span className="tk-var">self</span>
      <span className="tk-fg">, </span>
      <span className="tk-var">problem</span>
      <span className="tk-fg">):</span>
    </>,
    <>
      {'        '}
      <span className="tk-key">return</span> <span className="tk-str">"scalable, maintainable"</span>
    </>,
  ]

  return (
    <div className="terminal">
      <div className="terminal__bar">
        <span className="terminal__dot" style={{ background: '#ff5f57' }} />
        <span className="terminal__dot" style={{ background: '#febc2e' }} />
        <span className="terminal__dot" style={{ background: '#28c840' }} />
        <span className="terminal__name">engineer.py</span>
      </div>
      <div className="terminal__body">
        {lines.map((content, i) => (
          <div className="ln" key={i}>
            <span className="nr">{i + 1}</span>
            <span style={{ whiteSpace: 'pre' }}>{content}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero({ profile, stats, onNavigate }) {
  const typed = useTypewriter(profile.roles)

  return (
    <header className="hero" id="home">
      <Reveal>
        <span className="hero__badge">
          <span className="dot" /> Open to senior backend &amp; AI engineering roles
        </span>

        <h1>{profile.name}</h1>

        <div className="hero__role">
          {typed}
          <span className="caret">|</span>
        </div>

        <p className="hero__lead">
          I build enterprise backends, data pipelines and internal tools that hold up in
          production — {profile.years_experience}+ years across Python, .NET and SQL Server, now
          focused on AI-assisted automation that lets business users query data in plain language.
        </p>

        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={() => onNavigate('projects')}>
            View selected work <IconArrowRight />
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => onNavigate('contact')}>
            <IconMail /> Get in touch
          </button>
          <a className="btn btn--ghost" href={CV_PATH} download>
            <IconDownload /> Résumé
          </a>
        </div>

        <div className="hero__stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140}>
        <Terminal profile={profile} />
      </Reveal>
    </header>
  )
}
