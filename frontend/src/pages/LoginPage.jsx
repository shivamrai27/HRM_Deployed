import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.post('https://hrm-deployed.vercel.app//employee/login', { email, password }, { withCredentials: true })
      .then(result => {
        console.log(result);
        if (result.data && result.data.user) {
          localStorage.setItem('user', JSON.stringify(result.data.user));
        }
        navigate('/home');
      })
      .catch(err => {
        console.log(err);
        // You might want to show an error message to the user here
      });
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
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'black', '&:hover': { bgcolor: 'grey.800' } }}
            onClick={handleSubmit}  // Changed from type="submit" to onClick
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;