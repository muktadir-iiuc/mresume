# Portfolio — Mohammad Abdul Moktadir

A single-page portfolio built as a real full-stack app: **React (Vite)** on the front,
**FastAPI** on the back, **PostgreSQL** as the store. Every word on the page — summary,
roles, skills, projects, certifications — is served from the database, not hardcoded in JSX.

The palette is lifted verbatim from the **VS Code "Abyss"** theme you're using
(`theme-abyss/themes/abyss-color-theme.json`), so the site looks like your editor:
`#000c18` editor ground, `#ddbb88` gold accents, `#9966b8` purple, `#22aa44` string green.

---

## Layout

```
Portfolio Website/
├── backend/                  FastAPI + SQLAlchemy 2.0 (async) + asyncpg
│   ├── app/
│   │   ├── main.py           App factory, CORS, router wiring
│   │   ├── config.py         Pydantic settings, reads .env
│   │   ├── database.py       Async engine + session dependency
│   │   ├── models.py         7 tables
│   │   ├── schemas.py        Request/response models
│   │   ├── seed_data.py      Your résumé content — edit here
│   │   ├── seed.py           Creates schema + loads content (idempotent)
│   │   ├── create_db.py      Creates the `portfolio` database
│   │   └── routers/
│   │       ├── resume.py     GET profile / experience / skills / projects / …
│   │       ├── contact.py    POST contact form → PostgreSQL
│   │       └── chat.py       POST natural-language résumé queries
│   ├── requirements.txt
│   └── .env                  DATABASE_URL lives here
└── frontend/                 React 18 + Vite 6, zero UI libraries
    ├── src/
    │   ├── App.jsx           Shell, section registry, command palette wiring
    │   ├── api.js            fetch client
    │   ├── hooks.js          reveal / active-section / progress / typewriter
    │   ├── icons.jsx         Inline SVG icon set
    │   ├── components/       IDE chrome, command palette, floating chat assistant
    │   ├── sections/         Hero, About, Experience, Skills, Projects, …
    │   └── styles/           theme.css (Abyss tokens) + app.css
    └── public/cv/            Résumé PDF served by the download button
```

---

## Setup

### 1. Database

PostgreSQL 18 is already installed and running as `postgresql-x64-18`.
Put your `postgres` password into `backend/.env`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/portfolio
```

### 2. Backend

```powershell
cd backend
py -m venv .venv                      # already created
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m app.create_db   # creates the `portfolio` database
.\.venv\Scripts\python.exe -m app.seed        # creates tables + loads your résumé
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

API docs: <http://127.0.0.1:8000/docs>

### 3. Frontend

```powershell
cd frontend
npm install        # already done
npm run dev
```

Site: <http://localhost:5173> — Vite proxies `/api` to port 8000, so no CORS friction.

Or use the shortcuts from the project root: `.\start-backend.ps1` and `.\start-frontend.ps1`.

---

## API

| Method | Path                    | Purpose                                       |
| ------ | ----------------------- | --------------------------------------------- |
| GET    | `/api/resume`           | Everything the page needs, one round trip     |
| GET    | `/api/profile`          | Headline, contact links, summary              |
| GET    | `/api/experience`       | Roles with highlights and stack               |
| GET    | `/api/skills`           | Skills with category + proficiency            |
| GET    | `/api/projects`         | Projects with metrics and highlights          |
| GET    | `/api/education`        | Degrees                                       |
| GET    | `/api/certifications`   | MCSA, HackerRank                              |
| POST   | `/api/contact`          | Store a contact-form message                  |
| GET    | `/api/contact`          | Read stored messages (local/admin)            |
| POST   | `/api/chat`             | Natural-language résumé question              |
| GET    | `/api/chat/suggestions` | Starter questions                             |
| GET    | `/api/health`           | Liveness — drives the status bar indicator    |

---

## What's interactive

- **Command palette** — `Ctrl` + `K` anywhere: jump to a section, open GitHub/LinkedIn,
  download the CV. Arrow keys + Enter, Escape to dismiss.
- **IDE chrome** — activity rail, editor tabs per section, and a live status bar showing
  API connectivity, the current "file", and a clock.
- **Typewriter hero** cycling your four role titles, over a syntax-highlighted `engineer.py`
  card using the real Abyss token colours.
- **Expandable timeline** — each role opens to reveal what was built there.
- **Skill filtering** by category, with proficiency bars that fill as they scroll in.
- **Project cards** with a cursor-tracked glow, opening into a detail modal.
- **Floating "Ask the résumé" assistant** — a docked bubble in the bottom-right corner,
  reachable from every section rather than living in the nav. POSTs to `/api/chat`; the
  backend resolves the question to a real query over the résumé tables and returns the
  answer plus the rows it used. Deliberately deterministic and local, so it runs with no
  API key — the same shape as your Employee Data Chatbot project. Escape closes it, and
  the command palette can open it.
- **Contact form** writing straight to the `contact_message` table, echoing back the row id.
- Scroll-progress bar, scroll-reveal animations, back-to-top, and full keyboard focus rings.
  All motion respects `prefers-reduced-motion`.

---

## Editing your content

Everything lives in `backend/app/seed_data.py`. Change it, then re-run:

```powershell
.\.venv\Scripts\python.exe -m app.seed
```

The seeder wipes and reloads the content tables on every run; `contact_message` is left
alone so form submissions survive.

---

## Building for production

```powershell
cd frontend
npm run build        # → frontend/dist
```

Serve `dist/` from any static host and point it at the API with a `VITE_API_BASE`
environment variable at build time (e.g. `VITE_API_BASE=https://api.example.com`).
