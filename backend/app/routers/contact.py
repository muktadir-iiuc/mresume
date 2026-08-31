from fastapi import APIRouter, Depends, status
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models import ContactMessage
from ..schemas import ContactIn, ContactOut

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
async def submit_message(payload: ContactIn, db: AsyncSession = Depends(get_db)):
    """Persist an inbound message from the site's contact form."""
    message = ContactMessage(**payload.model_dump())
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return message


@router.get("", response_model=list[ContactOut])
async def list_messages(limit: int = 50, db: AsyncSession = Depends(get_db)):
    """Read back what the form has collected (local/admin use)."""
    result = await db.execute(
        select(ContactMessage).order_by(desc(ContactMessage.created_at)).limit(limit)
    )
    return result.scalars().all()
