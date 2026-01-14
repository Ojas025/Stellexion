from pydantic import BaseModel, ConfigDict

from schemas.user import UserResponse

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    
    model_config = ConfigDict(extra="forbid")
