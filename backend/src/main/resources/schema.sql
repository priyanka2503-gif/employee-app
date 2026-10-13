-- Employee Management System - MySQL Schema

CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data (Optional)
INSERT INTO employees (name, email, department) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'Engineering'),
('Bob Smith', 'bob.smith@example.com', 'Marketing'),
('Charlie Davis', 'charlie.davis@example.com', 'Human Resources'),
('Diana Prince', 'diana.prince@example.com', 'Finance'),
('Evan Wright', 'evan.wright@example.com', 'Operations');
