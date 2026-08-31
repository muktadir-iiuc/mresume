from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import Certification, Education, Experience, Profile, Project, Skill
from ..schemas import (
    CertificationOut,
    EducationOut,
    ExperienceOut,
    ProfileOut,
    ProjectOut,
    ResumeOut,
    SkillOut,
)

router = APIRouter(prefix="/api", tags=["resume"])


async def _all(db: AsyncSession, model, *order_by):
    result = await db.execute(select(model).order_by(*order_by))
    return result.scalars().all()


@router.get("/profile", response_model=ProfileOut)
async def get_profile(db: AsyncSession = Depends(get_db)):
    profile = (await db.execute(select(Profile).limit(1))).scalar_one_or_none()
    if profile is None:
        raise HTTPException(404, "Profile not seeded. Run: python -m app.seed")
    return profile


@router.get("/experience", response_model=list[ExperienceOut])
async def get_experience(db: AsyncSession = Depends(get_db)):
    return await _all(db, Experience, Experience.sort_order)


@router.get("/skills", response_model=list[SkillOut])
async def get_skills(db: AsyncSession = Depends(get_db)):
    return await _all(db, Skill, Skill.sort_order)


@router.get("/projects", response_model=list[ProjectOut])
async def get_projects(db: AsyncSession = Depends(get_db)):
    return await _all(db, Project, Project.sort_order)


@router.get("/education", response_model=list[EducationOut])
async def get_education(db: AsyncSession = Depends(get_db)):
    return await _all(db, Education, Education.sort_order)


@router.get("/certifications", response_model=list[CertificationOut])
async def get_certifications(db: AsyncSession = Depends(get_db)):
    return await _all(db, Certification, Certification.sort_order)


@router.get("/resume", response_model=ResumeOut)
async def get_resume(db: AsyncSession = Depends(get_db)):
    """Everything the single-page site needs, in one request."""
    profile = (await db.execute(select(Profile).limit(1))).scalar_one_or_none()
    if profile is None:
        raise HTTPException(404, "Profile not seeded. Run: python -m app.seed")

    return ResumeOut(
        profile=profile,
        experience=await _all(db, Experience, Experience.sort_order),
        skills=await _all(db, Skill, Skill.sort_order),
        projects=await _all(db, Project, Project.sort_order),
        education=await _all(db, Education, Education.sort_order),
        certifications=await _all(db, Certification, Certification.sort_order),
    )
