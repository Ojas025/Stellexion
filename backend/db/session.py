from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
from db.engine import engine

def get_sessionmaker():
    if engine is None:
        raise RuntimeError("Database engine not initialized")
        
    return async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )