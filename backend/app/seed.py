"""Create the schema and load the resume content into PostgreSQL.

Run from the backend/ folder:  python -m app.seed
"""

import asyncio

from sqlalchemy import delete, select

from . import seed_data as data
from .database import SessionLocal, init_models
from .models import (
    Certification,
    Education,
    Experience,
    Profile,
    Project,
    Skill,
)


async def seed() -> None:
    await init_models()

    async with SessionLocal() as db:
        # Idempotent: wipe the content tables, keep contact_message intact.
        for model in (Skill, Experience, Project, Education, Certification, Profile):
            await db.execute(delete(model))

        db.add(Profile(**data.PROFILE))
        db.add_all(Experience(**row) for row in data.EXPERIENCE)
        db.add_all(
            Skill(id=i, category=cat, name=name, level=level, sort_order=i)
            for i, (cat, name, level) in enumerate(data.SKILLS, start=1)
        )
        db.add_all(Project(**row) for row in data.PROJECTS)
        db.add_all(Education(**row) for row in data.EDUCATION)
        db.add_all(Certification(**row) for row in data.CERTIFICATIONS)

        await db.commit()

        counts = {
            "profile": len((await db.execute(select(Profile))).scalars().all()),
            "experience": len((await db.execute(select(Experience))).scalars().all()),
            "skills": len((await db.execute(select(Skill))).scalars().all()),
            "projects": len((await db.execute(select(Project))).scalars().all()),
            "education": len((await db.execute(select(Education))).scalars().all()),
            "certifications": len((await db.execute(select(Certification))).scalars().all()),
        }

    print("Seeded PostgreSQL:")
    for table, n in counts.items():
        print(f"  {table:<16} {n}")


if __name__ == "__main__":
    asyncio.run(seed())
