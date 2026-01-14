from db.session import get_sessionmaker

async def get_db():
    session = get_sessionmaker()
    async with session() as s:
        try:
            yield s
        finally:
            await s.close()