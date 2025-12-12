#!/bin/bash

# Wait for postgres to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U postgres; do
  sleep 1
done

echo "PostgreSQL is ready! Creating test data..."

# Create test users
psql -h postgres -U postgres -d soa_db <<EOF

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- Insert test users
DELETE FROM users WHERE username IN ('admin', 'student1', 'professor1');

INSERT INTO users (username, password, email, role) VALUES
  ('admin', '\$2a\$10\$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm', 'admin@universite.edu', 'ROLE_ADMIN'),
  ('student1', '\$2a\$10\$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm', 'student@universite.edu', 'ROLE_STUDENT'),
  ('professor1', '\$2a\$10\$slYQmyNdGzin7olVN3p5Be5nVzN8p7t/m.R5k8U1z1T4RbBJGSEsm', 'professor@universite.edu', 'ROLE_PROFESSOR');

SELECT 'Test users created!' AS result;

EOF

echo "Done!"
