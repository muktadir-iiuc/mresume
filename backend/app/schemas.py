from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class ProfileOut(ORMModel):
    id: int
    name: str
    title: str
    tagline: str
    location: str
    phone: str
    email: str
    linkedin: str
    github: str
    hackerrank: str
    summary: str
    years_experience: int
    roles: list[str]


class ExperienceOut(ORMModel):
    id: int
    role: str
    company: str
    location: str
    period: str
    start_year: int
    end_year: int | None
    is_current: bool
    employment_type: str
    stack: list[str]
    highlights: list[str]
    sort_order: int


class SkillOut(ORMModel):
    id: int
    category: str
    name: str
    level: int
    sort_order: int


class ProjectOut(ORMModel):
    id: int
    title: str
    kind: str
    summary: str
    highlights: list[str]
    stack: list[str]
    link: str | None
    metrics: dict[str, Any]
    featured: bool
    sort_order: int


class EducationOut(ORMModel):
    id: int
    degree: str
    institution: str
    period: str
    sort_order: int


class CertificationOut(ORMModel):
    id: int
    name: str
    detail: str
    issued: str
    credential_id: str | None
    url: str | None
    sort_order: int


class ResumeOut(BaseModel):
    """Everything the site needs in a single round trip."""

    profile: ProfileOut
    experience: list[ExperienceOut]
    skills: list[SkillOut]
    projects: list[ProjectOut]
    education: list[EducationOut]
    certifications: list[CertificationOut]


class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=10, max_length=4000)


class ContactOut(ORMModel):
    id: int
    name: str
    email: str
    subject: str
    created_at: datetime


class ChatIn(BaseModel):
    question: str = Field(min_length=2, max_length=500)


class ChatOut(BaseModel):
    answer: str
    intent: str
    data: list[dict[str, Any]] = []
    suggestions: list[str] = []
