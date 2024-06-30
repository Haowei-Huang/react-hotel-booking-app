import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './authSlice';
import * as React from 'react';
import LoginAndRegisterForm from './Components/LoginAndRegister/LoginRegisterForm';
import { LoginAndRegisterFormProvider } from './Components/LoginAndRegister/LoginAndRegisterFormContext';
import Home from './Components/MainWebsite/Home';
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { Dashboard } from './Components/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ProtectedAdminRoute from './ProtectedAdminRoute';
import BookingHome from './Components/UserViewBooking/BookingHome';
import ProtectedUserRoute from './ProtectedUserRoute';
import MainHeader from './Components/MainWebsite/Header';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth={false} disableGutters>
        <Router>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/Dashboard/*" element={<ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>} />
          </Routes>
        </Router>
      </Container>
    </LocalizationProvider >
  );
}

export default App;
