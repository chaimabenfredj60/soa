import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

const StudentManagementPage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmed Bennani', email: 'ahmed@email.com', matricule: 'STU001', programme: 'Informatique' },
    { id: 2, name: 'Fatima Hassan', email: 'fatima@email.com', matricule: 'STU002', programme: 'Génie Civil' },
    { id: 3, name: 'Mohamed Saidi', email: 'mohamed@email.com', matricule: 'STU003', programme: 'Économie' }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', matricule: '', programme: '' });

  const handleOpenDialog = (student = null) => {
    if (student) {
      setSelectedStudent(student);
      setFormData(student);
    } else {
      setSelectedStudent(null);
      setFormData({ name: '', email: '', matricule: '', programme: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const handleSave = () => {
    if (selectedStudent) {
      setStudents(students.map(s => s.id === selectedStudent.id ? formData : s));
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Gestion des Étudiants</Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          ➕ Ajouter un étudiant
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Nom</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Matricule</strong></TableCell>
              <TableCell><strong>Programme</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.matricule}</TableCell>
                <TableCell>{student.programme}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => handleOpenDialog(student)}>✏️ Modifier</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(student.id)}>🗑️ Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedStudent ? 'Modifier un étudiant' : 'Ajouter un étudiant'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Nom complet"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Matricule"
            margin="normal"
            value={formData.matricule}
            onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
          />
          <TextField
            fullWidth
            label="Programme"
            margin="normal"
            value={formData.programme}
            onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentManagementPage;
