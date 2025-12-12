import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, CircularProgress, Box, Alert } from '@mui/material';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the window location to build the API URL
        // If accessed through localhost:3001, the API is at localhost:9090
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const apiUrl = `${protocol}//${host}:9090/api/courses`;
        
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Courses loaded:', data);
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(`Failed to load courses: ${error.message}`);
        // Set mock data for testing
        setCourses([
          { id: 1, code: 'SOA101', title: 'Architecture SOA', description: 'Introduction à SOA', credits: 3 },
          { id: 2, code: 'WEB101', title: 'Développement Web', description: 'Web Services', credits: 3 },
          { id: 3, code: 'DB101', title: 'Bases de données', description: 'SQL and NoSQL', credits: 3 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>📚 Cours</Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : courses.length === 0 ? (
        <Alert severity="info">Aucun cours disponible</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Code</strong></TableCell>
                <TableCell><strong>Titre</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell align="center"><strong>Crédits</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} hover>
                  <TableCell>{course.code || course.id}</TableCell>
                  <TableCell>{course.title || course.name}</TableCell>
                  <TableCell>{course.description || '-'}</TableCell>
                  <TableCell align="center">{course.credits || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CoursesPage;
