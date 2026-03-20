import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Two separate API endpoints for patient vs doctor login
// Adjust these to match your actual backend routes
const API = {
  patient: 'http://localhost:5000/api/patient/login',
  doctor:  'http://localhost:5000/api/doctor/login',
};

function Login() {
  const navigate = useNavigate();

  // role toggles between 'patient' and 'doctor'
  const [role, setRole]       = useState('patient');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();  // stops page reload on form submit
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API[role], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned an error (wrong password, user not found, etc.)
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Save JWT token + user info to localStorage
      // This is how the app "remembers" you're logged in
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ ...data.user, role }));

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError('Cannot connect to server. Is the backend running?');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo / Header */}
        <div className="auth-header">
          <div className="logo-circle">RC</div>
          <h1>RuralCare</h1>
          <p>Telemedicine for everyone</p>
        </div>

        {/* Role Toggle - Patient or Doctor */}
        <div className="role-toggle">
          <button
            className={role === 'patient' ? 'active' : ''}
            onClick={() => setRole('patient')}
          >
            Patient
          </button>
          <button
            className={role === 'doctor' ? 'active' : ''}
            onClick={() => setRole('doctor')}
          >
            Doctor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Show error message if login fails */}
          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${role}`}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default login;
