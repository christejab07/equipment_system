CREATE DATABASE equipment_db;
USE equipment_db;

CREATE TABLE employee_laptops(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    nationalIdentity VARCHAR(16) NOT NULL UNIQUE,
    telephone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    laptop_manufacturer VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    serial_number VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
)