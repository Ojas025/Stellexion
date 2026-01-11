from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.db.database import engine, Base
from backend.services.config import get_config

config = get_config()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title=config.app_name, version=config.version)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routing
@app.get("/")
def read_root():
    return {"message": "Stellexion API is running"}

from api.auth import router as auth_router

app.include_router(auth_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)