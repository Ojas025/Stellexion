from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
from typing import List
from functools import lru_cache

class Config(BaseSettings):
    """Centralized application configuration"""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore"
    )
    
    # APP
    port: int = 8000
    app_name: str = "Stellexion API"
    version: str = "1.0.0"
    env: str = "development"
    debug: bool = False
    
    # CORS
    cors_origins: str = Field(
        "http://localhost:3000,http://127.0.0.1:3000"
    )
    
    @property
    def cors_origin_list(self) -> List[str]:
        return [x.strip() for x in self.cors_origins.split(",") if x.strip()]

    # DB
    db_url: str = Field(
        ...,
        env="DB_URL",
        description="Database url"
    )
    
    # AUTH
    jwt_secret_key: str = Field(repr=False)
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
@lru_cache    
def get_config() -> Config:
    return Config()