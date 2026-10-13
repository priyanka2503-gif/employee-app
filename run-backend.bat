@echo off
setlocal enabledelayedexpansion

title Employee Management System - Backend (Spring Boot)
echo =========================================================
echo  Starting Employee Management System - Backend Server
echo =========================================================
echo.

cd /d "%~dp0backend"

:: Detect JAVA_HOME if not already set
if not defined JAVA_HOME (
    for /f "tokens=* delims=" %%i in ('where java 2^>nul') do (
        set "JAVA_EXE_PATH=%%~dpi"
        set "JAVA_HOME=!JAVA_EXE_PATH:\bin\=!"
        goto :JavaFound
    )
    if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot" (
        set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
    )
)

:JavaFound
if defined JAVA_HOME (
    echo [OK] Using JAVA_HOME: %JAVA_HOME%
) else (
    echo [WARNING] JAVA_HOME not detected. Ensure Java 17+ is installed and on PATH.
)

echo.
echo [INFO] Spring Boot will launch at: http://localhost:8080
echo [INFO] REST API Endpoint: http://localhost:8080/api/employees
echo.
echo Database Note:
echo   Default configured DB: MySQL (configured in backend/src/main/resources/application.properties)
echo   If MySQL is not currently running, you can test with in-memory profile:
echo   call mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
echo.
echo Starting Spring Boot via Maven Wrapper...
echo ---------------------------------------------------------

call mvnw.cmd spring-boot:run %*

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Backend failed to start.
    echo If this is due to MySQL connection, ensure MySQL service is running
    echo or run with in-memory database:
    echo   mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
    pause
)
