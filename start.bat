@echo off
cd /d "%~dp0"

set "PYTHON_EXE=C:\ProgramData\anaconda3\python.exe"
if not exist "%PYTHON_EXE%" set "PYTHON_EXE=python"

start "Drug Board Server" cmd /k ""%PYTHON_EXE%" "%~dp0server.py""
timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:8000"
