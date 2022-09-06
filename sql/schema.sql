DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    dept VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL

);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT,
    FOREIGN KEY (roleId)
    REFERENCES roles(id),
    managerId INT,
    FOREIGN KEY (managerId)
    REFERENCES employees(id)
    ON DELETE SET NULL,
    dept VARCHAR(30),
    salary DECIMAL
)

