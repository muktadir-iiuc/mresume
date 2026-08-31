from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Profile(Base):
    __tablename__ = "profile"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    title: Mapped[str] = mapped_column(String(255))
    tagline: Mapped[str] = mapped_column(String(255))
    location: Mapped[str] = mapped_column(String(120))
    phone: Mapped[str] = mapped_column(String(40))
    email: Mapped[str] = mapped_column(String(120))
    linkedin: Mapped[str] = mapped_column(String(255))
    github: Mapped[str] = mapped_column(String(255))
    hackerrank: Mapped[str] = mapped_column(String(255))
    summary: Mapped[str] = mapped_column(Text)
    years_experience: Mapped[int] = mapped_column(Integer, default=15)
    roles: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)


class Experience(Base):
    __tablename__ = "experience"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    role: Mapped[str] = mapped_column(String(160))
    company: Mapped[str] = mapped_column(String(160))
    location: Mapped[str] = mapped_column(String(120))
    period: Mapped[str] = mapped_column(String(80))
    start_year: Mapped[int] = mapped_column(Integer)
    end_year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_current: Mapped[bool] = mapped_column(Boolean, default=False)
    employment_type: Mapped[str] = mapped_column(String(60), default="Full-time")
    stack: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    highlights: Mapped[list[str]] = mapped_column(ARRAY(Text), default=list)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Skill(Base):
    __tablename__ = "skill"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    category: Mapped[str] = mapped_column(String(80))
    name: Mapped[str] = mapped_column(String(80))
    level: Mapped[int] = mapped_column(Integer, default=80)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Project(Base):
    __tablename__ = "project"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(160))
    kind: Mapped[str] = mapped_column(String(60), default="Enterprise")
    summary: Mapped[str] = mapped_column(Text)
    highlights: Mapped[list[str]] = mapped_column(ARRAY(Text), default=list)
    stack: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    link: Mapped[str | None] = mapped_column(String(255), nullable=True)
    metrics: Mapped[dict] = mapped_column(JSONB, default=dict)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Education(Base):
    __tablename__ = "education"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    degree: Mapped[str] = mapped_column(String(160))
    institution: Mapped[str] = mapped_column(String(200))
    period: Mapped[str] = mapped_column(String(60))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Certification(Base):
    __tablename__ = "certification"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(160))
    detail: Mapped[str] = mapped_column(String(255))
    issued: Mapped[str] = mapped_column(String(60))
    credential_id: Mapped[str | None] = mapped_column(String(120), nullable=True)
    url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class ContactMessage(Base):
    __tablename__ = "contact_message"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120))
    subject: Mapped[str] = mapped_column(String(200))
    message: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
