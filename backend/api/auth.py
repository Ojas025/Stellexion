from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError

from schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse
)
from db.deps import get_db
from db.models import User
from services.auth import (
    create_access_token,
    get_current_user,
    get_password_hash,
    verify_password
)
from services.config import get_config
from schemas.auth import (
    AuthResponse
)
from services.user_service import (
    find_existing_user,
    find_user_by_email
)

config = get_config()
router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)) -> AuthResponse:
    # Check if user already exists
    existing_user = await find_existing_user(db,user_data.email, user_data.mobile)

    if existing_user:
        detail = (
            "Email already registered"
            if existing_user.email == user_data.email
            else "Mobile number already registered"
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
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
    
    try:
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
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

@router.post("/login", response_model=AuthResponse)
async def login(user_data: UserLogin, db: AsyncSession = Depends(get_db)) -> AuthResponse:
    # Find user by email
    user = await find_user_by_email(db, user_data.email)

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

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)) -> User:
    return current_user