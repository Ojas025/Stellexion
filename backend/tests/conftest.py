import pytest
from db.base import Base
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.pool import StaticPool
from sqlalchemy import text
from httpx import AsyncClient, ASGITransport
from main import app
from db.deps import get_db
import db.engine as engine_module 
import db.session as session_module

TEST_DB_URL = "sqlite+aiosqlite:///:memory:"

@pytest.fixture(scope="session")
async def sqlite_engine():
    engine = create_async_engine(
        TEST_DB_URL,
        echo=False,
        future=True,
        poolclass=StaticPool,
        connect_args={"check_same_thread": False},
    )

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    engine_module.engine = engine
    session_module.engine = engine

    yield engine

    await engine.dispose()     
    
@pytest.fixture(scope="session")
def test_app(sqlite_engine):
    """
    App instance with DB dependency overridden
    """

    async def get_test_db():
        from sqlalchemy.ext.asyncio import AsyncSession
        from sqlalchemy.orm import sessionmaker

        async_session = sessionmaker(
            bind=sqlite_engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )

        async with async_session() as session:
            yield session

    app.dependency_overrides[get_db] = get_test_db
    return app    

@pytest.fixture
async def db_session(sqlite_engine):
    """Create new AsyncSession"""

    test_session = async_sessionmaker(
        bind=sqlite_engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    
    async with test_session() as session:
        yield session

        await session.execute(text("DELETE FROM users"))
        await session.commit()

@pytest.fixture
async def client(test_app):
    transport = ASGITransport(app=test_app)
    
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c