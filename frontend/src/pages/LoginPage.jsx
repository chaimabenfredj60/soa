import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginSuccess } from '../slices/authSlice';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      let endpoint = '';
      
      try {
        // Try API Gateway first (port 9090)
        endpoint = 'Gateway';
        response = await Promise.race([
          axios.post('http://localhost:9090/api/auth/login', { email, password }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]);
      } catch (gatewayError) {
        // Fallback to direct Auth Service (port 8081)
        console.log('Gateway unavailable, trying direct Auth Service:', gatewayError.message);
        endpoint = 'Direct';
        response = await axios.post('http://localhost:8081/login', { email, password });
      }

      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update Redux store
      dispatch(loginSuccess({ token, user }));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur de connexion';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          🎓 Système Universitaire
        </Typography>
        <Paper elevation={3} sx={{ padding: 4, width: '100%', marginTop: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
            Connexion
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
              type="submit"
            >
              {loading ? <CircularProgress size={24} /> : 'Se connecter'}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Vous n'avez pas de compte?
              </Typography>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  S'inscrire
                </Button>
              </Link>
            </Box>
          </form>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
          <Typography variant="caption">
            Compte de test: test@universite.com / password
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Utilisateur de test: admin@universite.com / password123
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
