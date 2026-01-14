from db.models import User
from sqlalchemy import select

async def find_existing_user(db, email, mobile):
    if db is None:
        raise AttributeError("db session not found")
    
    statement = select(User).where(
        (User.email == email) | (User.mobile == mobile)
    )
    
    result = await db.execute(statement)
    
    return result.scalar_one_or_none()

async def find_user_by_email(db, email):
    if db is None:
        raise AttributeError("db session not found")

    statement = select(User).where(User.email == email)

    result = await db.execute(statement)
    
    return result.scalar_one_or_none()