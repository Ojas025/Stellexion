from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import timedelta

from schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse
)
from db.database import get_db
from db.models import User
from backend.services.auth import (
    create_access_token,
    get_current_user,
    get_password_hash,
    verify_password
)
from backend.services.config import get_config
from schemas.auth import (
    AuthResponse
)

config = get_config()
router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/api/auth/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)) -> AuthResponse:
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user_data.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if mobile already exists
    db_user_mobile = db.query(User).filter(User.mobile == user_data.mobile).first()
    if db_user_mobile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mobile number already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        email=user_data.email,
        mobile=user_data.mobile,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token_expires = timedelta(minutes=config.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": db_user.id}, expires_delta=access_token_expires
    )
    
    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user=db_user
    )

@router.post("/api/auth/login", response_model=AuthResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)) -> AuthResponse:
    # Find user by email
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=config.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user=user
    )

@router.get("/api/auth/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)) -> User:
    return current_user