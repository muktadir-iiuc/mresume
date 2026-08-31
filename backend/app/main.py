import logging
from contextlib import asynccontextmanager

from asyncpg.exceptions import PostgresError
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from .config import get_settings
from .database import engine, init_models
from .routers import chat, contact, resume

settings = get_settings()
log = logging.getLogger("portfolio")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables if they do not exist; content is loaded by `python -m app.seed`.
    # A missing database must not stop the server -- the frontend shows a setup hint
    # instead, and /api/health keeps reporting what is wrong.
    try:
        await init_models()
        log.info("Connected to PostgreSQL.")
    except Exception as exc:  # noqa: BLE001 - any driver error should degrade, not crash
        log.warning("Database unavailable at startup: %s", exc)
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.app_name,
    description="Portfolio API for Mohammad Abdul Moktadir - FastAPI + PostgreSQL.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)
app.include_router(contact.router)
app.include_router(chat.router)


async def database_error(request: Request, exc: Exception):
    """Turn a driver failure into an actionable 503 rather than an opaque 500."""
    log.error("Database error on %s: %s", request.url.path, exc)
    return JSONResponse(
        status_code=503,
        content={
            "detail": "Cannot reach the portfolio database. Check DATABASE_URL in "
            "backend/.env, then run: python -m app.create_db and python -m app.seed"
        },
    )


# asyncpg raises its own errors on connect (bad password, server down); SQLAlchemy
# wraps the rest. Register both so either path degrades the same way.
for error_type in (SQLAlchemyError, PostgresError, OSError):
    app.add_exception_handler(error_type, database_error)


@app.get("/api/health", tags=["meta"])
async def health():
    """Liveness plus a real database round trip -- drives the site's status bar."""
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "postgresql", "connected": True}
    except Exception as exc:  # noqa: BLE001
        return {
            "status": "degraded",
            "database": "postgresql",
            "connected": False,
            "detail": str(exc),
        }
