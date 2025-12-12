import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DashboardPage = () => {
  const auth = useSelector(state => state.auth);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    averageGrade: 0,
    pendingBills: 0
  });
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simuler les données du dashboard
      setStats({
        totalStudents: 1250,
        totalCourses: 45,
        averageGrade: 14.5,
        pendingBills: 32
      });

      setGradesData([
        { month: 'Jan', moyenne: 12 },
        { month: 'Fev', moyenne: 13 },
        { month: 'Mar', moyenne: 12.5 },
        { month: 'Avr', moyenne: 14 },
        { month: 'Mai', moyenne: 14.5 },
        { month: 'Jun', moyenne: 15 }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon }) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5">
          {icon} {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        👋 Bienvenue, {auth.user?.name}!
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Étudiants" value={stats.totalStudents} icon="👥" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Cours" value={stats.totalCourses} icon="📚" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Moyenne" value={stats.averageGrade} icon="📊" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Factures en attente" value={stats.pendingBills} icon="💳" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Évolution des moyennes
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gradesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="moyenne" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Répartition des notes
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="moyenne" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
