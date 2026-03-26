-- ============================================
--  Portfolio Project - Database Setup Script
-- ============================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS portfolio_db;

-- Step 2: Use the database
USE portfolio_db;

-- Step 3: Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id      INT          AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    email   VARCHAR(150) NOT NULL,
    message TEXT         NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- To run this file:
--   mysql -u root -p < database.sql
-- ============================================
