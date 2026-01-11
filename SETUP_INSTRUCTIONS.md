# Setup Instructions for Stellexion Authentication System

## Frontend Setup

The frontend is already set up. The authentication modal is integrated into the Navigation component.

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Server

**IMPORTANT: Make sure you're in the `backend` directory when running these commands!**

**Option 1: Using Python (Recommended)**
```bash
python main.py
```

**Option 2: Using uvicorn directly**
```bash
# Make sure you're in the backend directory first!
cd backend
uvicorn main:app --reload --port 8000
```

**Option 3: Using the run script**
```bash
python run.py
```

**Option 4: Using the start script**
```bash
# Windows
start.bat

# Mac/Linux
chmod +x start.sh
./start.sh
```

**⚠️ Common Error Fix:**
If you get "could not import module 'app'", make sure:
1. You're in the `backend` directory
2. You're using `uvicorn main:app` (not `uvicorn app:app`)
3. All files (main.py, database.py, models.py) are in the backend directory

**⚠️ IMPORTANT:** The API will be available at:
- `http://localhost:8000` ✅ (Use this in your browser)
- `http://127.0.0.1:8000` ✅ (Alternative)

**DO NOT use:** `http://0.0.0.0:8000` ❌ (This is only for server binding, not browser access)

### 5. API Documentation
Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database

The database file `stellexion.db` will be created automatically in the backend directory when you first run the server.

### To Use PostgreSQL Instead of SQLite

1. Install PostgreSQL
2. Create a database
3. Update `backend/database.py`:
```python
DATABASE_URL = "postgresql://username:password@localhost/stellexion"
```

## Testing the Authentication

1. Start the backend server (port 8000)
2. Start the frontend (port 3000): `npm start`
3. Click "Sign Up" or "Login" in the navigation bar
4. Fill out the form and submit

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- Body:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "mobile": "+1234567890",
  "password": "password123"
}
```

### Login
- **POST** `/api/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User (Protected)
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure:
- Backend is running on port 8000
- Frontend is running on port 3000
- CORS middleware is configured in `backend/main.py`

### Database Issues
- Make sure you have write permissions in the backend directory
- For SQLite, the database file will be created automatically
- For PostgreSQL, ensure the database exists and credentials are correct

### Port Conflicts
- If port 8000 is in use, change it in `backend/main.py` or use: `uvicorn main:app --port 8001`
- Update the API URL in `src/components/AuthModal.jsx` if you change the port

