const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'student-service' });
});

app.get('/api/students/health', (req, res) => {
  res.json({ status: 'OK', service: 'student-service' });
});

// Get all students
app.get('/api/students', (req, res) => {
  const students = [
    { id: 1, name: 'Ahmed Bennani', email: 'ahmed@email.com', matricule: 'STU001' },
    { id: 2, name: 'Fatima Hassan', email: 'fatima@email.com', matricule: 'STU002' }
  ];
  res.json(students);
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Student Name', email: 'student@email.com' });
});

// Create student
app.post('/api/students', (req, res) => {
  res.status(201).json({ message: 'Student created', ...req.body });
});

// Update student
app.put('/api/students/:id', (req, res) => {
  res.json({ message: 'Student updated', ...req.body });
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  res.json({ message: 'Student deleted', id: req.params.id });
});

app.listen(PORT, () => {
  console.log(`✓ Student Service running on port ${PORT}`);
});

module.exports = app;
