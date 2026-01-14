from sqlalchemy.ext.asyncio import create_async_engine

engine = None

def init_engine(db_url: str):
    global engine
    
    engine = create_async_engine(
        db_url,
        echo=False,
        pool_size=10,
        max_overflow=20
    )

    return engine