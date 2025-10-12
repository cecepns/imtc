-- IMTC Global Training Database Schema
-- Created: 2024
-- Description: Database schema for IMTC training management system

-- Create database
CREATE DATABASE IF NOT EXISTS `imtc_training` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `imtc_training`;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
INSERT INTO `admin_users` (`username`, `email`, `password`) VALUES
('admin', 'admin@imtcglobal.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Create trainings table
CREATE TABLE IF NOT EXISTS `trainings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `short_description` text,
  `description` longtext,
  `category` varchar(100),
  `duration` varchar(50),
  `max_participants` int(11),
  `price` decimal(10,2),
  `location` varchar(255),
  `schedule` varchar(255),
  `requirements` text,
  `certification` text,
  `image` varchar(255),
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  KEY `active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample training data
INSERT INTO `trainings` (`title`, `short_description`, `description`, `category`, `duration`, `max_participants`, `price`, `location`, `schedule`, `requirements`, `certification`) VALUES
('General K3 Training Certification', 'Comprehensive safety training for all industries', '<h3>Training Overview</h3><p>This comprehensive General K3 (Occupational Health and Safety) training program is designed to provide participants with essential knowledge and skills to identify, assess, and control workplace hazards across various industries.</p><h3>Learning Objectives</h3><ul><li>Understand fundamental K3 principles and regulations</li><li>Learn hazard identification techniques</li><li>Master risk assessment methodologies</li><li>Implement effective safety control measures</li><li>Develop emergency response procedures</li></ul>', 'General K3', '3 Days', 20, 2500000.00, 'Jakarta Training Center', 'Every Monday & Wednesday', 'Basic education, willingness to learn safety practices', 'Official K3 Certificate recognized by Ministry of Manpower'),

('Maritime Safety & Emergency Response', 'Specialized maritime safety training for ship crews', '<h3>Maritime Safety Training</h3><p>Specialized training program designed for maritime professionals covering ship safety protocols, emergency procedures, and hazardous materials handling.</p><h3>Course Content</h3><ul><li>Ship safety management systems</li><li>Emergency evacuation procedures</li><li>Fire fighting at sea</li><li>Man overboard procedures</li><li>Hazardous materials handling</li><li>Maritime regulations compliance</li></ul>', 'Maritime K3', '5 Days', 15, 3500000.00, 'Jakarta Training Center', 'First week of each month', 'Maritime experience preferred, basic safety knowledge', 'International Maritime Safety Certificate'),

('Fire Safety & Emergency Management', 'Fire prevention and emergency response training', '<h3>Fire Safety Training</h3><p>Comprehensive fire safety program covering prevention, suppression, and emergency evacuation procedures for workplace environments.</p><h3>Training Components</h3><ul><li>Fire science and behavior</li><li>Fire prevention strategies</li><li>Fire extinguisher operation</li><li>Emergency evacuation planning</li><li>Smoke management systems</li><li>Fire safety audits</li></ul>', 'Fire Safety', '2 Days', 25, 1800000.00, 'Jakarta Training Center', 'Every Tuesday & Thursday', 'No specific requirements', 'Fire Safety Certificate'),

('Scaffold Supervisor Certification', 'Advanced scaffolding safety for supervisors', '<h3>Scaffold Supervisor Training</h3><p>Advanced training program for supervisors responsible for scaffolding safety, assembly, inspection, and maintenance in construction and industrial environments.</p><h3>Key Topics</h3><ul><li>Scaffold design principles</li><li>Safe assembly procedures</li><li>Inspection and maintenance</li><li>Risk assessment techniques</li><li>Regulatory compliance</li><li>Supervisor responsibilities</li></ul>', 'Scaffold', '4 Days', 12, 2800000.00, 'Jakarta Training Center', 'Second week of each month', 'Construction experience, basic safety knowledge', 'Scaffold Supervisor Certificate');

-- Create gallery table
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(100),
  `image` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  KEY `active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample gallery data
INSERT INTO `gallery` (`title`, `description`, `category`) VALUES
('Fire Safety Training Session', 'Participants learning fire extinguisher usage and emergency procedures', 'Fire Safety'),
('Maritime Safety Training', 'Ship safety procedures demonstration and hands-on practice', 'Maritime K3'),
('General K3 Classroom Session', 'Interactive safety awareness training in modern facility', 'General K3'),
('Emergency Response Drill', 'Emergency evacuation procedures and response training', 'Emergency'),
('Safety Equipment Training', 'Proper use and maintenance of personal protective equipment', 'Equipment'),
('Team Building Activities', 'Safety-focused team building exercises and workshops', 'Team Building'),
('Certification Ceremony', 'Graduates receiving their K3 safety certificates', 'Certification'),
('Practical Training Session', 'Hands-on safety equipment operation and procedures', 'Practical');

-- Create settings table
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` longtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default settings
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('company_name', 'IMTC Global Training'),
('company_address', 'Jakarta, Indonesia'),
('company_phone', '+62 21 1234 5678'),
('company_email', 'info@imtcglobal.com'),
('company_maps', 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123'),
('about_us', 'International Maritime Training Center (IMTC) is a leading training provider focused on Occupational Health and Safety (K3) for the maritime and other heavy industries. With over 5 years of experience, we are committed to improving safety awareness and skills for workers across Indonesia.'),
('vision', 'To become the leading Occupational Health and Safety (K3) training center in Asia, focusing on enhancing safety skills and awareness for workers in the maritime and heavy industries.'),
('mission', 'Provide high-quality training with international standards to promote K3 in various industries. Develop training programs that are relevant to current and future industry needs. Raise workplace safety awareness and knowledge through innovative and effective approaches.'),
('facebook_url', 'https://facebook.com/imtcglobal'),
('instagram_url', 'https://instagram.com/imtcglobal'),
('linkedin_url', 'https://linkedin.com/company/imtcglobal');

-- Create indexes for better performance
CREATE INDEX idx_trainings_category ON trainings(category);
CREATE INDEX idx_trainings_active ON trainings(active);
CREATE INDEX idx_trainings_created ON trainings(created_at);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_active ON gallery(active);
CREATE INDEX idx_gallery_created ON gallery(created_at);

-- Show tables
SHOW TABLES;