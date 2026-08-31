"""A small natural-language layer over the resume tables.

The same idea as the Employee Data Chatbot project: a visitor asks a business
question in plain English and the API resolves it to a query, so nobody has to
write SQL. Intent matching is deterministic and local -- no external LLM key
required to run the site.
"""

import re

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import Certification, Education, Experience, Profile, Project, Skill
from ..schemas import ChatIn, ChatOut

router = APIRouter(prefix="/api/chat", tags=["chat"])

SUGGESTIONS = [
    "What is his experience with Python?",
    "Show me his projects",
    "Which databases does he know?",
    "How many years of experience?",
    "Where did he study?",
    "How can I contact him?",
]

INTENTS: list[tuple[str, tuple[str, ...]]] = [
    ("contact", ("contact", "email", "phone", "reach", "hire", "linkedin", "github")),
    ("certification", ("certif", "mcsa", "microsoft certified", "hackerrank", "credential")),
    ("education", ("education", "study", "studied", "university", "degree", "graduat", "b.sc")),
    ("projects", ("project", "built", "portfolio piece", "chatbot", "hris", "payroll", "data health")),
    ("experience", ("experience", "work", "job", "company", "role", "career", "employ", "dominion", "kds", "taqniyah")),
    ("skills", ("skill", "tech", "stack", "know", "expert", "language", "database", "framework", "tool")),
    ("summary", ("about", "who is", "summary", "introduce", "tell me")),
]


def _detect(question: str) -> str:
    q = question.lower()
    if re.search(r"\b(hi|hello|hey|salam|assalam)\b", q):
        return "greeting"
    if re.search(r"how many years|years of experience|how long", q):
        return "years"
    for intent, keywords in INTENTS:
        if any(k in q for k in keywords):
            return intent
    return "unknown"


async def _matching_skills(db: AsyncSession, question: str) -> list[Skill]:
    q = question.lower()
    skills = (await db.execute(select(Skill).order_by(Skill.sort_order))).scalars().all()
    hits = [s for s in skills if s.name.lower() in q or s.category.lower() in q]
    if not hits:
        # Loose match on the first token of each skill name, e.g. "sql" -> "SQL Server".
        hits = [s for s in skills if s.name.lower().split()[0] in q]
    return hits


@router.get("/suggestions", response_model=list[str])
async def suggestions() -> list[str]:
    return SUGGESTIONS


@router.post("", response_model=ChatOut)
async def ask(payload: ChatIn, db: AsyncSession = Depends(get_db)) -> ChatOut:
    question = payload.question.strip()
    intent = _detect(question)
    profile = (await db.execute(select(Profile).limit(1))).scalar_one_or_none()
    name = profile.name if profile else "He"

    # A named technology beats a generic intent -- "experience with Python" is a skill question.
    named = await _matching_skills(db, question)
    if named and intent in {"skills", "experience", "unknown", "summary"}:
        top = named[:8]
        listed = ", ".join(f"{s.name} ({s.level}%)" for s in top)
        return ChatOut(
            answer=f"Yes - {listed}. Those sit in: "
            + ", ".join(sorted({s.category for s in top}))
            + ".",
            intent="skills",
            data=[{"name": s.name, "category": s.category, "level": s.level} for s in top],
            suggestions=SUGGESTIONS,
        )

    if intent == "greeting":
        return ChatOut(
            answer=f"Hello. Ask me anything about {name}'s experience, skills, "
            "projects, education or how to get in touch.",
            intent=intent,
            suggestions=SUGGESTIONS,
        )

    if intent == "years" and profile:
        return ChatOut(
            answer=f"{profile.years_experience}+ years building enterprise software - "
            "backend, data engineering and application modernisation.",
            intent=intent,
            data=[{"years": profile.years_experience}],
            suggestions=SUGGESTIONS,
        )

    if intent == "experience":
        rows = (
            await db.execute(select(Experience).order_by(Experience.sort_order))
        ).scalars().all()
        return ChatOut(
            answer=f"{len(rows)} roles across {rows[-1].start_year}-{rows[0].end_year or 'present'}: "
            + "; ".join(f"{r.role} at {r.company} ({r.period})" for r in rows),
            intent=intent,
            data=[
                {
                    "role": r.role,
                    "company": r.company,
                    "period": r.period,
                    "stack": r.stack,
                }
                for r in rows
            ],
            suggestions=SUGGESTIONS,
        )

    if intent == "projects":
        rows = (await db.execute(select(Project).order_by(Project.sort_order))).scalars().all()
        return ChatOut(
            answer="Featured work: "
            + "; ".join(f"{p.title} ({', '.join(p.stack[:3])})" for p in rows),
            intent=intent,
            data=[{"title": p.title, "kind": p.kind, "stack": p.stack} for p in rows],
            suggestions=SUGGESTIONS,
        )

    if intent == "education":
        rows = (await db.execute(select(Education).order_by(Education.sort_order))).scalars().all()
        return ChatOut(
            answer="; ".join(f"{e.degree}, {e.institution} ({e.period})" for e in rows),
            intent=intent,
            data=[{"degree": e.degree, "institution": e.institution} for e in rows],
            suggestions=SUGGESTIONS,
        )

    if intent == "certification":
        rows = (
            await db.execute(select(Certification).order_by(Certification.sort_order))
        ).scalars().all()
        return ChatOut(
            answer="; ".join(f"{c.name} - {c.detail} ({c.issued})" for c in rows),
            intent=intent,
            data=[{"name": c.name, "detail": c.detail, "issued": c.issued} for c in rows],
            suggestions=SUGGESTIONS,
        )

    if intent == "contact" and profile:
        return ChatOut(
            answer=f"Email {profile.email} or call {profile.phone}. "
            f"He is based in {profile.location}, and open to remote work.",
            intent=intent,
            data=[
                {
                    "email": profile.email,
                    "phone": profile.phone,
                    "linkedin": profile.linkedin,
                    "github": profile.github,
                }
            ],
            suggestions=SUGGESTIONS,
        )

    if intent == "summary" and profile:
        return ChatOut(
            answer=profile.summary,
            intent=intent,
            suggestions=SUGGESTIONS,
        )

    return ChatOut(
        answer="I can answer questions about experience, skills, projects, education, "
        "certifications and contact details. Try one of the suggestions below.",
        intent="unknown",
        suggestions=SUGGESTIONS,
    )
