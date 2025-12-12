-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  credits INTEGER NOT NULL,
  professor VARCHAR(255) NOT NULL
);

-- Insert test users (password is 'password' encrypted with BCrypt)
DELETE FROM users WHERE username IN ('admin', 'student1', 'professor1');

INSERT INTO users (username, password, email, role) VALUES
  ('admin', '$2a$10$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm', 'admin@universite.edu', 'ROLE_ADMIN'),
  ('student1', '$2a$10$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm', 'student@universite.edu', 'ROLE_STUDENT'),
  ('professor1', '$2a$10$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm', 'professor@universite.edu', 'ROLE_PROFESSOR');

-- Insert test courses
DELETE FROM courses WHERE code IN ('SOA101', 'WEB101', 'DB101');

INSERT INTO courses (code, title, description, credits, professor) VALUES
  ('SOA101', 'Architecture SOA', 'Introduction à l''architecture orientée services', 3, 'Dr. Ahmed Bennani'),
  ('WEB101', 'Développement Web', 'Fondamentaux du développement web moderne', 3, 'Dr. Fatima Hassan'),
  ('DB101', 'Bases de données', 'Conception et gestion des bases de données relationnelles', 3, 'Dr. Mohamed Karim');
