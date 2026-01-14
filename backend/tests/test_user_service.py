import pytest
from sqlalchemy.exc import MultipleResultsFound

from db.models import User
from services.user_service import (
    find_existing_user,
    find_user_by_email
)
from tests.conftest import *

# find_user_by_email:
#     input params: db, email
#     output: User or None
#     test cases:
#         - user exists
#         - user does not exist
#         - multiple users

# find_existing_user:
#     input params: db, email, mobile
#     output: User or None
#     test cases:
#         - user exists
#         - user does not exist
#         - multiple users       

@pytest.fixture
async def create_user(db_session):
    user = User(
       first_name = "John",
       last_name = "Doe",
       email = "johndoe@gmail.com",
       mobile = "1234567890",
       hashed_password = "password" 
    )
    
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    
    return user

@pytest.mark.asyncio
async def test_find_existing_user_found_when_both_match(db_session, create_user):
    # query user by email, mobile
    
    # both correct
    existing_user = await find_existing_user(
        db_session,
        email="johndoe@gmail.com",
        mobile="1234567890"
    )
    
    # assertions
    assert existing_user is not None
    assert existing_user.email == "johndoe@gmail.com"
    assert existing_user.mobile == "1234567890"
    
@pytest.mark.asyncio
async def test_find_existing_user_when_email_matches(db_session, create_user):
    # only email correct
    existing_user = await find_existing_user(
        db_session,
        email="johndoe@gmail.com",
        mobile="1010101010"
    )
    
    assert existing_user is not None
    assert existing_user.email == "johndoe@gmail.com"
    assert existing_user.mobile != "1010101010"
    
@pytest.mark.asyncio
async def test_find_existing_user_when_mobile_matches(db_session, create_user):
    # only mobile correct
    existing_user = await find_existing_user(
        db_session,
        email="johndoe@example.com",
        mobile="1234567890"
    )
    
    assert existing_user is not None
    assert existing_user.email != "johndoe@example.com"
    assert existing_user.mobile == "1234567890"

@pytest.mark.asyncio
async def test_find_existing_user_not_found(db_session, create_user):
    # query user by email, mobile
    existing_user = await find_existing_user(
        db_session,
        email="johndoe@example.com",
        mobile="1111222290"
    )
    
    assert existing_user is None        

@pytest.mark.asyncio
async def test_find_user_by_email_user_found(db_session, create_user):
    # query user by email
    existing_user = await find_user_by_email(
        db_session,
        email="johndoe@gmail.com"
    )
    
    assert existing_user is not None
    assert existing_user.email == "johndoe@gmail.com"

@pytest.mark.asyncio
async def test_find_user_by_email_user_not_found(db_session, create_user):
    # query user by email
    existing_user = await find_user_by_email(
        db_session,
        email="johndoe@example.com"
    )
    
    assert existing_user is None    