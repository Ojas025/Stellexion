from sqlalchemy.ext.asyncio import create_async_engine

from services.config import get_config

config = get_config()

engine = create_async_engine(
    config.db_url,
    echo=False,
    pool_size=10,
    max_overflow=20
)