# Troubleshooting Guide

## Error: "could not import module 'app'"

This error occurs when uvicorn can't find the module. Here's how to fix it:

### Solution 1: Make sure you're in the correct directory
```bash
# Navigate to the backend directory first
cd backend

# Then run uvicorn
uvicorn main:app --reload --port 8000
```

### Solution 2: Use the correct module name
The file is `main.py`, so use:
```bash
uvicorn main:app --reload
```

**NOT:**
```bash
uvicorn app:app --reload  # ❌ Wrong - file is main.py, not app.py
```

### Solution 3: Use Python to run directly
```bash
cd backend
python main.py
```

### Solution 4: Check your current directory
```bash
# Windows
cd
dir

# Mac/Linux
pwd
ls
```

Make sure you see `main.py`, `database.py`, and `models.py` in the current directory.

## Error: "ModuleNotFoundError: No module named 'database'"

This means Python can't find the database module. Solutions:

1. **Make sure you're in the backend directory:**
```bash
cd backend
python main.py
```

2. **Check that all files exist:**
```bash
ls  # or dir on Windows
# Should show: main.py, database.py, models.py, requirements.txt
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

## Error: "No module named 'fastapi'"

Install the required packages:
```bash
pip install -r requirements.txt
```

Or install individually:
```bash
pip install fastapi uvicorn sqlalchemy python-jose passlib pydantic
```

## Error: "Port 8000 already in use"

1. **Find what's using the port:**
```bash
# Windows
netstat -ano | findstr :8000

# Mac/Linux
lsof -i :8000
```

2. **Kill the process or use a different port:**
```bash
# Change port in main.py or use:
uvicorn main:app --port 8001
```

## Quick Start Checklist

- [ ] Navigated to `backend` directory
- [ ] Created virtual environment: `python -m venv venv`
- [ ] Activated virtual environment: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
- [ ] Installed dependencies: `pip install -r requirements.txt`
- [ ] Running from backend directory: `python main.py`
- [ ] Server shows: "Uvicorn running on http://0.0.0.0:8000"

## Still Having Issues?

1. **Verify file structure:**
```
backend/
├── __init__.py
├── main.py
├── database.py
├── models.py
├── requirements.txt
└── README.md
```

2. **Check Python version:**
```bash
python --version  # Should be Python 3.7+
```

3. **Reinstall dependencies:**
```bash
pip install --upgrade -r requirements.txt
```

4. **Check for syntax errors:**
```bash
python -m py_compile main.py database.py models.py
```

