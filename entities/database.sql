-- PostgreSQL Database Schema and Data for EasyWrittingShop Project
-- Based on entities: CompanyInfo, Project, Service, TeamMember, User

-- Create Database
CREATE DATABASE easywritingshop;

-- Note: run the following schema and data statements after connecting to the `easywritingshop` database.

-- Enum types
CREATE TYPE companyinfo_type AS ENUM ('contact', 'social', 'about', 'objective');
CREATE TYPE project_field AS ENUM ('economics', 'medicine', 'psychology', 'engineering', 'business', 'law', 'education', 'other');
CREATE TYPE project_level AS ENUM ('college', 'undergraduate', 'postgraduate');
CREATE TYPE service_category AS ENUM ('college', 'undergraduate', 'postgraduate', 'research');
CREATE TYPE teammember_department AS ENUM ('leadership', 'research', 'editing', 'support');
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- CompanyInfo Table
CREATE TABLE companyinfo (
    id TEXT PRIMARY KEY,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    type companyinfo_type NOT NULL,
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP,
    updated_date TIMESTAMP,
    created_by TEXT
);

-- Project Table
CREATE TABLE project (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    field project_field NOT NULL,
    level project_level NOT NULL,
    year INT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP,
    updated_date TIMESTAMP,
    created_by TEXT
);

-- Service Table
CREATE TABLE service (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    category service_category,
    is_active BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 0,
    created_date TIMESTAMP,
    updated_date TIMESTAMP,
    created_by TEXT
);

-- TeamMember Table
CREATE TABLE teammember (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    email TEXT,
    linkedin TEXT,
    department teammember_department,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP,
    updated_date TIMESTAMP,
    created_by TEXT
);

-- Users Table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    role user_role NOT NULL,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_date TIMESTAMP,
    updated_date TIMESTAMP,
    created_by TEXT
);

-- Insert CompanyInfo Data
INSERT INTO companyinfo (icon, is_active, type, value, key, id, created_date, updated_date, created_by) VALUES
('', true, 'contact', '+155454545454', '0', '69dfba894469471891223086', '2026-04-15 16:19:21', '2026-04-15 16:19:21', 'oskrito567@gmail.com');

-- Insert Project Data
INSERT INTO project (is_active, field, level, year, image_url, description, title, is_featured, id, created_date, updated_date, created_by) VALUES
(true, 'economics', 'postgraduate', 2024, 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', 'Comprehensive study on market dynamics and economic policy effects in emerging markets focusing on international trade agreements.', 'Economic Impact Analysis of Trade Policies', true, '699bb5f457808fcd987f1003', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
(true, 'psychology', 'postgraduate', 2024, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80', 'In-depth analysis of cognitive behavioral therapy outcomes in adolescent patients with anxiety disorders.', 'Clinical Psychology: CBT Outcomes Study', true, '699bb5f457808fcd987f1004', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
(true, 'medicine', 'undergraduate', 2024, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80', 'Statistical analysis of patient health records and treatment outcomes using machine learning approaches.', 'Healthcare Data Analytics Framework', true, '699bb5f457808fcd987f1005', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
(true, 'business', 'postgraduate', 2023, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', 'Strategic analysis of market entry strategies for multinational corporations expanding into developing economies.', 'Corporate Strategy in Emerging Markets', false, '699bb5f457808fcd987f1006', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
(true, 'law', 'undergraduate', 2023, 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', 'Comparative analysis of intellectual property laws and their enforcement across different jurisdictions.', 'Intellectual Property Law Comparative Study', false, '699bb5f457808fcd987f1007', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com');

-- Insert Service Data
INSERT INTO service (icon, description, is_active, title, category, order_index, id, created_date, updated_date, created_by) VALUES
('FileText', 'Comprehensive analytical and investigative research papers across all academic fields. Our team of experts delivers thoroughly researched content with proper citations and methodology.', true, 'Research Papers', 'research', 1, '699bb5f457808fcd987f1008', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
('Search', 'In-depth analysis and synthesis of existing research and scholarly articles. We help you understand the current state of knowledge in your field.', true, 'Literature Reviews', 'research', 2, '699bb5f457808fcd987f1009', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
('PenTool', 'Complete thesis development support from proposal to final submission. We guide you through every chapter with expert feedback.', true, 'Thesis Writing', 'postgraduate', 3, '699bb5f457808fcd987f100a', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
('GraduationCap', 'Comprehensive assistance for doctoral dissertations including research design, data collection, analysis, and writing.', true, 'Dissertation Support', 'postgraduate', 4, '699bb5f457808fcd987f100b', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
('BarChart3', 'Statistical analysis and interpretation using SPSS, R, Python, and other advanced tools. We handle both quantitative and qualitative data.', true, 'Data Analysis', 'research', 5, '699bb5f457808fcd987f100c', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
('Users', 'Professional editing and proofreading to ensure your work meets the highest academic standards and publication requirements.', true, 'Academic Editing', 'college', 6, '699bb5f457808fcd987f100d', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com');

-- Insert TeamMember Data
INSERT INTO teammember (is_active, image_url, name, bio, position, linkedin, department, email, order_index, id, created_date, updated_date, created_by) VALUES
(true, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', 'Dr. Sarah Mitchell', 'PhD in Economics from Harvard University with 15 years of academic research experience. Dr. Mitchell founded EasyWorkShop with a vision to make academic excellence accessible to all.', 'CEO & Founder', 'https://linkedin.com', 'leadership', 'sarah@easyworkshop.com', 1, '699bb5f457808fcd987f100e', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
(true, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', 'Prof. James Anderson', 'Former university professor with expertise in quantitative research methods. Prof. Anderson leads our research team with over 20 years of experience.', 'Head of Research', 'https://linkedin.com', 'research', 'james@easyworkshop.com', 2, '699bb5f457808fcd987f100f', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
(true, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', 'Dr. Emily Chen', 'Expert in academic writing and publication standards. Dr. Chen ensures all our deliverables meet the highest quality standards.', 'Lead Editor', 'https://linkedin.com', 'editing', 'emily@easyworkshop.com', 3, '699bb5f457808fcd987f1010', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com'),
(true, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', 'Michael Torres', 'Dedicated to ensuring exceptional client experiences. Michael oversees our support team and maintains strong client relationships.', 'Client Relations Director', 'https://linkedin.com', 'support', 'michael@easyworkshop.com', 4, '699bb5f457808fcd987f1011', '2026-02-23 02:05:40', '2026-02-23 02:05:40', 'oskrito567@gmail.com');

-- Insert User Data
INSERT INTO users (id, role, email, full_name, password, created_date, updated_date, created_by) VALUES
('admin-user-001', 'admin', 'admin@easyworkshop.com', 'Administrator', 'admin', '2026-04-15 12:00:00', '2026-04-15 12:00:00', 'system'),
('user-001', 'user', 'john.doe@example.com', 'John Doe', 'user123', '2026-04-15 12:00:00', '2026-04-15 12:00:00', 'system');