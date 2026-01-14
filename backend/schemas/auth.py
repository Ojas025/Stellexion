from pydantic import BaseModel, ConfigDict

from schemas.user import UserResponse

class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    
    model_config = ConfigDict(extra="forbid")
