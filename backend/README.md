# Stellexion Backend API

FastAPI backend with SQLAlchemy for user authentication.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at:
- `http://localhost:8000` (Use this in your browser)
- `http://127.0.0.1:8000` (Alternative)

**Note:** `0.0.0.0` in the code is for server binding only - use `localhost` or `127.0.0.1` in your browser.

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- Body: `{ "first_name": "...", "last_name": "...", "email": "...", "mobile": "...", "password": "..." }`
- Returns: Token and user data

### Login
- **POST** `/api/auth/login`
- Body: `{ "email": "...", "password": "..." }`
- Returns: Token and user data

### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`
- Returns: User data

## Database

The database file `stellexion.db` will be created automatically in the backend directory.

To use PostgreSQL instead of SQLite, update `DATABASE_URL` in `database.py`:
```python
DATABASE_URL = "postgresql://user:password@localhost/stellexion"
```

