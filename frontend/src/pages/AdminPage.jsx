import React, { useState, useEffect } from 'react';
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
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

const AdminPage = () => {
  // State for Students
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [invoices, setInvoices] = useState([]);
  
  // Loading states
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingGrades, setLoadingGrades] = useState(false);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  
  // Error states
  const [errorStudents, setErrorStudents] = useState('');
  const [errorCourses, setErrorCourses] = useState('');
  const [errorGrades, setErrorGrades] = useState('');
  const [errorInvoices, setErrorInvoices] = useState('');
  
  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // student, course, grade, invoice
  const [formData, setFormData] = useState({});

  // API Base URLs
  const API_GATEWAY = 'http://localhost:9090';
  const API_AUTH = 'http://localhost:8081';
  const API_STUDENT = 'http://localhost:3000';
  const API_COURSE = 'http://localhost:8082';
  const API_GRADE = 'http://localhost:8000';
  const API_BILLING = 'http://localhost:5000';

  // Smart fetch with fallback
  const smartFetch = async (gatewayUrl, directUrl, timeout = 5000) => {
    try {
      const response = await Promise.race([
        fetch(gatewayUrl),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
      ]);
      return response;
    } catch {
      return fetch(directUrl);
    }
  };

  // Fetch Students
  const fetchStudents = async () => {
    setLoadingStudents(true);
    setErrorStudents('');
    try {
      const response = await smartFetch(
        `${API_GATEWAY}/api/students`,
        `${API_STUDENT}/students`
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(Array.isArray(data) ? data : data.data || []);
      } else {
        throw new Error('Failed to fetch students');
      }
    } catch (error) {
      setErrorStudents(error.message || 'Impossible de récupérer les étudiants');
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    setLoadingCourses(true);
    setErrorCourses('');
    try {
      const response = await smartFetch(
        `${API_GATEWAY}/api/courses`,
        `${API_COURSE}/courses`
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : data.data || []);
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (error) {
      setErrorCourses(error.message || 'Impossible de récupérer les cours');
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  // Fetch Grades
  const fetchGrades = async () => {
    setLoadingGrades(true);
    setErrorGrades('');
    try {
      const response = await smartFetch(
        `${API_GATEWAY}/api/grades`,
        `${API_GRADE}/grades`
      );
      if (response.ok) {
        const data = await response.json();
        setGrades(Array.isArray(data) ? data : data.data || []);
      } else {
        throw new Error('Failed to fetch grades');
      }
    } catch (error) {
      setErrorGrades(error.message || 'Impossible de récupérer les notes');
      setGrades([]);
    } finally {
      setLoadingGrades(false);
    }
  };

  // Fetch Invoices
  const fetchInvoices = async () => {
    setLoadingInvoices(true);
    setErrorInvoices('');
    try {
      const response = await smartFetch(
        `${API_GATEWAY}/api/billing/invoices`,
        `${API_BILLING}/api/invoices`
      );
      if (response.ok) {
        const data = await response.json();
        setInvoices(Array.isArray(data) ? data : data.data || []);
      } else {
        throw new Error('Failed to fetch invoices');
      }
    } catch (error) {
      setErrorInvoices(error.message || 'Impossible de récupérer les factures');
      setInvoices([]);
    } finally {
      setLoadingInvoices(false);
    }
  };

  // Load all data on mount
  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchGrades();
    fetchInvoices();
  }, []);

  // Dialog handlers
  const handleOpenDialog = (type, data = null) => {
    setDialogType(type);
    setFormData(data || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
  };

  const handleSave = async () => {
    // TODO: Implement API POST/PUT calls
    console.log('Saving:', dialogType, formData);
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        📋 Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Manage Students */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                👥 Manage Students
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={fetchStudents}
                sx={{ mb: 2 }}
              >
                View All Students
              </Button>
              {errorStudents && <Alert severity="error" sx={{ mb: 2 }}>{errorStudents}</Alert>}
              {loadingStudents ? (
                <Box sx={{ textAlign: 'center', py: 2 }}><CircularProgress size={30} /></Box>
              ) : (
                <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {students.length > 0 ? (
                    <Typography variant="body2">
                      ✓ {students.length} étudiant(s) trouvé(s)
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Aucun étudiant
                    </Typography>
                  )}
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => handleOpenDialog('student')}
                sx={{ mt: 2 }}
              >
                ➕ Add Student
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Courses */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                📚 Manage Courses
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={fetchCourses}
                sx={{ mb: 2 }}
              >
                View All Courses
              </Button>
              {errorCourses && <Alert severity="error" sx={{ mb: 2 }}>{errorCourses}</Alert>}
              {loadingCourses ? (
                <Box sx={{ textAlign: 'center', py: 2 }}><CircularProgress size={30} /></Box>
              ) : (
                <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {courses.length > 0 ? (
                    <Typography variant="body2">
                      ✓ {courses.length} cours trouvé(s)
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Aucun cours
                    </Typography>
                  )}
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => handleOpenDialog('course')}
                sx={{ mt: 2 }}
              >
                ➕ Add Course
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Grades */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                📊 Manage Grades
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={fetchGrades}
                sx={{ mb: 2 }}
              >
                View All Grades
              </Button>
              {errorGrades && <Alert severity="error" sx={{ mb: 2 }}>{errorGrades}</Alert>}
              {loadingGrades ? (
                <Box sx={{ textAlign: 'center', py: 2 }}><CircularProgress size={30} /></Box>
              ) : (
                <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {grades.length > 0 ? (
                    <Typography variant="body2">
                      ✓ {grades.length} note(s) trouvée(s)
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Aucune note
                    </Typography>
                  )}
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => handleOpenDialog('grade')}
                sx={{ mt: 2 }}
              >
                ➕ Add Grade
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Billing */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                💳 Manage Billing
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={fetchInvoices}
                sx={{ mb: 2 }}
              >
                View All Invoices
              </Button>
              {errorInvoices && <Alert severity="error" sx={{ mb: 2 }}>{errorInvoices}</Alert>}
              {loadingInvoices ? (
                <Box sx={{ textAlign: 'center', py: 2 }}><CircularProgress size={30} /></Box>
              ) : (
                <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {invoices.length > 0 ? (
                    <Typography variant="body2">
                      ✓ {invoices.length} facture(s) trouvée(s)
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Aucune facture
                    </Typography>
                  )}
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => handleOpenDialog('invoice')}
                sx={{ mt: 2 }}
              >
                ➕ Create Invoice
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>📈 Quick Stats</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" color="primary">{students.length}</Typography>
              <Typography variant="body2">Étudiants</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" color="primary">{courses.length}</Typography>
              <Typography variant="body2">Cours</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" color="primary">{grades.length}</Typography>
              <Typography variant="body2">Notes</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" color="primary">{invoices.length}</Typography>
              <Typography variant="body2">Factures</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Dialog for adding/editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'student' && 'Ajouter un étudiant'}
          {dialogType === 'course' && 'Ajouter un cours'}
          {dialogType === 'grade' && 'Ajouter une note'}
          {dialogType === 'invoice' && 'Créer une facture'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {dialogType === 'student' && (
            <>
              <TextField
                fullWidth
                label="Student Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Student ID"
                value={formData.matricule || ''}
                onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
              />
            </>
          )}
          {dialogType === 'course' && (
            <>
              <TextField
                fullWidth
                label="Course Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Course Code"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Credits"
                type="number"
                value={formData.credits || ''}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              />
            </>
          )}
          {dialogType === 'grade' && (
            <>
              <TextField
                fullWidth
                label="Student ID"
                value={formData.studentId || ''}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Grade (0-20)"
                type="number"
                value={formData.grade || ''}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Subject/Course"
                value={formData.subject || ''}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </>
          )}
          {dialogType === 'invoice' && (
            <>
              <TextField
                fullWidth
                label="Student ID"
                value={formData.studentId || ''}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status || 'Pending'}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPage;
