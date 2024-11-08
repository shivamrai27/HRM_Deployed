import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevents default form submit behavior
    axios
      .post('https://hrm-deployed.vercel.app/employee/login', { email, password }, { withCredentials: true })
      .then((result) => {
        console.log(result);
        if (result.data && result.data.user) {
          localStorage.setItem('user', JSON.stringify(result.data.user));
        }
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        // Error handling
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
          <form onSubmit={handleSubmit}> {/* Added form element */}
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
              type="submit"  // Changed from onClick to type="submit"
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;