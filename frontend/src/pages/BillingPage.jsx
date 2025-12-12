import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button } from '@mui/material';

const BillingPage = () => {
  const bills = [
    { id: 1, description: 'Droits de scolarité Semestre 1', amount: 5000, status: 'Payée', date: '2024-01-15' },
    { id: 2, description: 'Droits de scolarité Semestre 2', amount: 5000, status: 'En attente', date: '2024-06-01' },
    { id: 3, description: 'Frais de résidence', amount: 2000, status: 'Payée', date: '2024-01-20' }
  ];

  const totalPaid = bills.filter(b => b.status === 'Payée').reduce((sum, b) => sum + b.amount, 0);
  const totalPending = bills.filter(b => b.status === 'En attente').reduce((sum, b) => sum + b.amount, 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>💳 Facturation</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
        <Box sx={{ p: 2, backgroundColor: '#c8e6c9', borderRadius: 1 }}>
          <Typography variant="body2">Total Payé</Typography>
          <Typography variant="h5"><strong>{totalPaid.toLocaleString()} DH</strong></Typography>
        </Box>
        <Box sx={{ p: 2, backgroundColor: '#ffccbc', borderRadius: 1 }}>
          <Typography variant="body2">En Attente</Typography>
          <Typography variant="h5"><strong>{totalPending.toLocaleString()} DH</strong></Typography>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell align="right"><strong>Montant</strong></TableCell>
              <TableCell align="center"><strong>Statut</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{bill.description}</TableCell>
                <TableCell align="right">{bill.amount.toLocaleString()} DH</TableCell>
                <TableCell align="center">
                  <Box sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    backgroundColor: bill.status === 'Payée' ? '#c8e6c9' : '#ffe0b2',
                    borderRadius: 0.5,
                    fontSize: '0.875rem'
                  }}>
                    {bill.status}
                  </Box>
                </TableCell>
                <TableCell>{bill.date}</TableCell>
                <TableCell align="center">
                  {bill.status === 'En attente' ? (
                    <Button size="small" variant="contained">Payer</Button>
                  ) : (
                    <Button size="small">Télécharger</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BillingPage;
