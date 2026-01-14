import pytest

from services.auth import (
    verify_password,
    get_password_hash,
)
from services.config import get_config
from tests.conftest import client, sqlite_engine

config = get_config()

def test_password_hash_and_verify_success():
    plain_password = "somepassword"
    hashed_password = get_password_hash(plain_password)
    
    result = verify_password(plain_password, hashed_password)
    
    assert plain_password != hashed_password
    assert result is True

def test_password_hash_and_verify_failure():
    plain_password_correct = "correctpassword"
    plain_password_wrong = "wrongpassword"
    
    hashed_password = get_password_hash(plain_password_correct)
    
    result = verify_password(plain_password_wrong, hashed_password)
    
    assert result is False

@pytest.mark.asyncio
async def test_register_success(client):
    payload = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "mobile": "1234567890",
        "password": "somepassword"
    }
    
    response = await client.post("/api/auth/register", json=payload)
    
    assert response.status_code == 201
    
    data = response.json()
    
    assert "access_token" in data
    assert "user" in data
    assert "token_type" in data
    assert data["user"]["email"] == payload["email"]

@pytest.mark.asyncio
async def test_register_email_already_exists(client):
    payload1 = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "mobile": "1234567890",
        "password": "somepassword"
    }

    payload2 = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "mobile": "1234567899",
        "password": "somepassword"
    }
    
    # first registration
    await client.post("/api/auth/register", json=payload1)

    # register with duplicate email
    response = await client.post("/api/auth/register", json=payload2)
    
    assert response.status_code == 400

@pytest.mark.asyncio
async def test_register_mobile_already_exists(client):
    payload1 = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "mobile": "1234567890",
        "password": "somepassword"
    }

    payload2 = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "mobile": "1234567890",
        "password": "somepassword"
    }
    
    # first registration
    await client.post("/api/auth/register", json=payload1)

    # register with duplicate mobile
    response = await client.post("/api/auth/register", json=payload2)
    
    assert response.status_code == 400

@pytest.mark.asyncio
async def test_login_success(client):
    register_payload = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "mobile": "1234567890",
        "password": "somepassword"
    }
    
    await client.post("/api/auth/register", json=register_payload)

    login_payload = {
        "email": register_payload["email"],
        "password": register_payload["password"]
    }
    
    response = await client.post("/api/auth/login", json=login_payload)
    
    assert response.status_code == 200
    assert "access_token" in response.json()


@pytest.mark.asyncio
async def test_login_failure_wrong_password(client):
    payload = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "mobile": "1234567890",
        "password": "somepassword"
    }
    
    await client.post("/api/auth/register", json=payload)

    login_payload = {
        "email": payload["email"],
        "password": "wrongpassword"
    }

    response = await client.post("/api/auth/login", json=login_payload)

    assert response.status_code == 401

@pytest.mark.asyncio
async def test_login_failure_user_not_found(client):
    response = await client.post(
        "/api/auth/login",
        json={"email": "random@gmail.com", "password": "pass"}
    )

    assert response.status_code == 401