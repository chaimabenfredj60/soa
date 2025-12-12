import React from 'react';
import { Container, Typography } from '@mui/material';

const AdminPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>⚙️ Panneau d'Administration</Typography>
      <Typography>Contenu administratif à venir...</Typography>
    </Container>
  );
};

export default AdminPage;
