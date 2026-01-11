from pydantic import BaseModel, ConfigDict

from schemas.user import UserResponse
from db.models import User

class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    
    model_config = ConfigDict(extra="forbid")