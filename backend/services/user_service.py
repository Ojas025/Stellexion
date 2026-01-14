from db.models import User

async def find_existing_user(db, email, mobile):
    result = await db.select(User).where(
        (User.email == email) | (User.mobile == mobile)
    )
    
    return result.scalar_one_or_none()

async def find_user_by_email(db, email):
    result = await db.select(User).where(User.email == email)
    
    return result.scalar_one_or_none()