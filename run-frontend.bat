@echo off
title Employee Management System - Frontend (React + Vite)
echo =========================================================
echo  Starting Employee Management System - Frontend App
echo =========================================================
echo.

cd /d "%~dp0frontend"

:: Check if node_modules exists, install if missing
if not exist "node_modules\" (
    echo [INFO] First time run detected. Installing npm dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install npm dependencies.
        pause
        exit /b 1
    )
)

echo.
echo [INFO] Starting Vite development server...
echo [INFO] Local URL: http://localhost:5173
echo.

call npm run dev
