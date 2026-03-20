import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import BookAppointment from './components/BookAppointment';
import ViewAppointments from './components/ViewAppointments';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

     <Route path="/book-appointment" element={<BookAppointment />} />
<Route path="/appointments" element={<ViewAppointments />} />

    </Routes>
  );
}

export default App;