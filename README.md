# 🚀 Full Stack Employee Management System

A production-ready full-stack **Employee Management System** built with **React (Vite)** on the frontend and **Java Spring Boot 3** on the backend, backed by **MySQL**.

---

## 📁 Project Architecture & Structure

```
employee-app/
├── backend/                                # Spring Boot 3 Application
│   ├── .mvn/wrapper/                       # Maven Wrapper (zero install required)
│   ├── mvnw.cmd                            # Windows Maven wrapper executable
│   ├── pom.xml                             # Dependencies: Web, Data JPA, Validation, MySQL
│   └── src/
│       └── main/
│           ├── java/com/example/employeeapp/
│           │   ├── EmployeeAppApplication.java    # App entry point & sample data seeder
│           │   ├── config/
│           │   │   └── CorsConfig.java            # CORS configuration for frontend
│           │   ├── controller/
│           │   │   └── EmployeeController.java    # REST API endpoints
│           │   ├── exception/
│           │   │   ├── GlobalExceptionHandler.java # Uniform JSON error formatting
│           │   │   └── ResourceNotFoundException.java
│           │   ├── model/
│           │   │   └── Employee.java              # JPA Entity (id, name, email, department)
│           │   ├── repository/
│           │   │   └── EmployeeRepository.java    # Spring Data JPA queries
│           │   └── service/
│           │       └── EmployeeService.java       # Business logic & validation
│           └── resources/
│               ├── application.properties         # MySQL DB connection placeholders
│               ├── application-dev.properties     # Optional in-memory H2 profile
│               └── schema.sql                     # MySQL database creation & seed script
│
├── frontend/                               # React + Vite Application
│   ├── index.html                          # Entry HTML
│   ├── package.json                        # React 18, Axios, Lucide-react, Vite
│   ├── vite.config.js                      # Dev server & API proxy config
│   └── src/
│       ├── App.jsx                         # Main dashboard state & handlers
│       ├── main.jsx                        # React root render
│       ├── index.css                       # Modern responsive design system
│       ├── api/
│       │   └── employeeService.js          # Axios API client
│       └── components/
│           ├── Navbar.jsx                  # Top navigation & action triggers
│           ├── StatsCards.jsx              # Summary metrics cards
│           ├── SearchBar.jsx               # Search, department & sort filter
│           ├── EmployeeList.jsx            # Employee table & mobile card view
│           ├── EmployeeModal.jsx           # Add & Edit modal form
│           ├── ConfirmModal.jsx            # Delete confirmation modal
│           └── Toast.jsx                   # Notification alert feedback
│
├── run-backend.bat                         # Quick launcher for Spring Boot on Windows
├── run-frontend.bat                        # Quick launcher for React Vite on Windows
├── run-all.bat                             # One-click launcher for both servers
└── README.md                               # Project documentation
```

---

## 🗄️ Database Setup (MySQL)

### 1. Database Credentials
Open `backend/src/main/resources/application.properties` and replace the placeholders with your MySQL server settings:

```properties
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/${DB_NAME:employee_db}?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
spring.datasource.username=${DB_USER:root}
spring.datasource.password=${DB_PASSWORD:your_mysql_password}
```

Alternatively, you can provide environment variables on Windows:
- `set DB_HOST=localhost`
- `set DB_PORT=3306`
- `set DB_NAME=employee_db`
- `set DB_USER=root`
- `set DB_PASSWORD=your_password`

### 2. Schema (Optional manual run)
Hibernate will automatically create or update tables on start (`spring.jpa.hibernate.ddl-auto=update`).
If you prefer running manual SQL, see `backend/src/main/resources/schema.sql`.

---

## ⚡ Quick Start on Windows

### Option A: Launch Both with One Click
Double-click or run:
```cmd
run-all.bat
```
This opens two dedicated command windows: one for the backend and one for the frontend.

---

### Option B: Run Separately

#### 1. Start Backend (Spring Boot)
Run the batch file:
```cmd
run-backend.bat
```
Or manually in terminal:
```cmd
cd backend
mvnw.cmd spring-boot:run
```
> **Tip for running without MySQL:** If MySQL is not running on your machine, you can run the in-memory test profile:
> ```cmd
> mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
> ```
> Backend will be live at: **http://localhost:8080**

#### 2. Start Frontend (React + Vite)
Run the batch file:
```cmd
run-frontend.bat
```
Or manually in terminal:
```cmd
cd frontend
npm install
npm run dev
```
> Frontend will be live at: **http://localhost:5173**

---

## 🔌 REST API Endpoints

All endpoints are hosted at `http://localhost:8080/api/employees`:

| Method | Endpoint | Description | Sample Request Body / Param |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/employees` | Get all employees (or filter) | `?search=engineering` |
| **GET** | `/api/employees/{id}` | Get single employee by ID | None |
| **POST** | `/api/employees` | Create a new employee | `{"name":"John Doe","email":"john@example.com","department":"Engineering"}` |
| **PUT** | `/api/employees/{id}` | Update an existing employee | `{"name":"John Doe","email":"john@example.com","department":"Product"}` |
| **DELETE**| `/api/employees/{id}` | Delete employee by ID | None |

---

## ✨ Frontend Features

- **Employee Table & Responsive View:** Full employee list with employee ID, colored initials avatar, email (clickable mailto), department tag, and quick Edit / Delete buttons.
- **Search & Filter:** Real-time search across Name, Email, and Department, with a Department filter dropdown and Sort ordering (Name, ID, Department).
- **Add & Edit Modal:** Modal form with live validation for required fields and valid email format.
- **Delete Confirmation:** Modal dialog to prevent accidental deletion of employee records.
- **Toast Notifications:** Automatic feedback for actions (created, updated, deleted, or error status).
- **Axios HTTP Client:** Connected to Spring Boot REST endpoints with error handling and timeout protection.
