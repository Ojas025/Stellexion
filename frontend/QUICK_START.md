# Quick Start Guide - Stellexion Backend

## Step-by-Step Setup

### 1. Open Terminal/Command Prompt
Navigate to the project root directory.

### 2. Go to Backend Directory
```bash
cd backend
```

### 3. Create Virtual Environment (First Time Only)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies (First Time Only)
```bash
pip install -r requirements.txt
```

### 5. Start the Server
```bash
python main.py
```

You should see output like:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 6. Access the API

**✅ Use these URLs in your browser:**
- `http://localhost:8000` - Main API
- `http://localhost:8000/docs` - Swagger UI (Interactive API docs)
- `http://localhost:8000/redoc` - ReDoc (Alternative API docs)

**❌ DO NOT use:** `http://0.0.0.0:8000` (This won't work in browsers)

### 7. Test the API

Open your browser and go to:
```
http://localhost:8000
```

You should see:
```json
{"message": "Stellexion API is running"}
```

### 8. Check API Documentation

Visit:
```
http://localhost:8000/docs
```

This will show you all available endpoints and let you test them directly.

## Common Issues

### "This site can't be reached"
- Make sure the server is running (you should see the INFO messages)
- Use `localhost` or `127.0.0.1`, NOT `0.0.0.0`
- Check if port 8000 is already in use

### "Module not found" errors
- Make sure you're in the `backend` directory
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt`

### Port already in use
- Close other applications using port 8000
- Or change the port in `main.py`:
  ```python
  uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
  ```

## Next Steps

1. ✅ Backend running on `http://localhost:8000`
2. Start frontend: `npm start` (in project root)
3. Frontend will run on `http://localhost:3000`
4. Click "Sign Up" or "Login" in the navigation bar
5. Test authentication!

