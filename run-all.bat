@echo off
title Employee Management System - Launcher
echo =========================================================
echo  Launching Full Stack Employee Management System
echo =========================================================
echo.
echo 1. Starting Backend Server in new window...
start "Employee Management Backend" cmd /k "call "%~dp0run-backend.bat""

echo 2. Starting Frontend App in new window...
start "Employee Management Frontend" cmd /k "call "%~dp0run-frontend.bat""

echo.
echo Both servers are launching!
echo  - Frontend: http://localhost:5173
echo  - Backend API: http://localhost:8080/api/employees
echo.
echo You can close this window now.
pause
