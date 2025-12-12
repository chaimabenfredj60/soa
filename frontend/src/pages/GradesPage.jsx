import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';

const GradesPage = () => {
  const grades = [
    { id: 1, course: 'Architecture SOA', grade: 16, credits: 3 },
    { id: 2, course: 'Web Services', grade: 15, credits: 4 },
    { id: 3, course: 'Bases de Données', grade: 17, credits: 3 },
    { id: 4, course: 'Sécurité Informatique', grade: 14, credits: 3 }
  ];

  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
  const weightedGrade = (grades.reduce((sum, g) => sum + (g.grade * g.credits), 0) / totalCredits).toFixed(2);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>📊 Relevé de Notes</Typography>

      <Box sx={{ mb: 3, p: 2, backgroundColor: '#e8f5e9', borderRadius: 1 }}>
        <Typography variant="h6">Moyenne Générale: <strong>{weightedGrade}/20</strong></Typography>
        <Typography variant="body2">Basée sur {totalCredits} crédits</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Cours</strong></TableCell>
              <TableCell align="center"><strong>Note</strong></TableCell>
              <TableCell align="center"><strong>Crédits</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.course}</TableCell>
                <TableCell align="center">{grade.grade}/20</TableCell>
                <TableCell align="center">{grade.credits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GradesPage;
