import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { logout } from '../slices/authSlice';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Étudiants', path: '/students', icon: '👥' },
    { label: 'Cours', path: '/courses', icon: '📚' },
    { label: 'Notes', path: '/grades', icon: '📈' },
    { label: 'Facturation', path: '/billing', icon: '💳' },
    ...(auth.user?.role === 'ADMIN' ? [{ label: 'Admin', path: '/admin', icon: '⚙️' }] : [])
  ];

  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            🎓 Système Universitaire SOA
          </Typography>
          <Button color="inherit" onClick={() => setDrawerOpen(true)}>☰ Menu</Button>
          <Button color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>👤 {auth.user?.name}</Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem disabled>Profil</MenuItem>
            <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={`${item.icon} ${item.label}`} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
