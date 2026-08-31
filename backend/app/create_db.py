"""Create the `portfolio` database if it does not exist yet.

Connects to the built-in `postgres` database first, because you cannot create a
database from inside the one you are creating.

    python -m app.create_db
"""

import asyncio
import sys
from urllib.parse import urlsplit

import asyncpg

from .config import get_settings


async def main() -> int:
    url = get_settings().database_url
    parts = urlsplit(url.replace("postgresql+asyncpg://", "postgresql://"))
    dbname = parts.path.lstrip("/") or "portfolio"

    try:
        conn = await asyncpg.connect(
            user=parts.username,
            password=parts.password,
            host=parts.hostname or "localhost",
            port=parts.port or 5432,
            database="postgres",
        )
    except Exception as exc:  # noqa: BLE001 - surface the real cause to the operator
        print(f"Could not reach PostgreSQL as '{parts.username}': {exc}")
        print("Check DATABASE_URL in backend/.env, and that the server is running.")
        return 1

    try:
        exists = await conn.fetchval("SELECT 1 FROM pg_database WHERE datname = $1", dbname)
        if exists:
            print(f"Database '{dbname}' already exists.")
        else:
            # asyncpg cannot parameterise an identifier, and dbname comes from our own .env.
            await conn.execute(f'CREATE DATABASE "{dbname}"')
            print(f"Created database '{dbname}'.")
    finally:
        await conn.close()

    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
