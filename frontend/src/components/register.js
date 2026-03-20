import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API = {
  patient: 'http://localhost:5000/api/patient/register',
  doctor:  'http://localhost:5000/api/doctor/register',
};

function Register() {
  const navigate = useNavigate();

  const [role, setRole]               = useState('patient');
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [specialisation, setSpec]     = useState('');
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Build request body — doctors also send specialisation
    const body = role === 'doctor'
      ? { name, email, password, specialisation }
      : { name, email, password };

    try {
      const response = await fetch(API[role], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      // Registration successful → go to login
      alert('Account created! Please login.');
      navigate('/login');

    } catch (err) {
      setError('Cannot connect to server. Is the backend running?');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="logo-circle">RC</div>
          <h1>Create Account</h1>
          <p>Join RuralCare today</p>
        </div>

        {/* Role Toggle */}
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

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Extra field only shown for doctors */}
          {role === 'doctor' && (
            <div className="form-group">
              <label>Specialisation</label>
              <input
                type="text"
                placeholder="e.g. General Physician, Cardiologist"
                value={specialisation}
                onChange={(e) => setSpec(e.target.value)}
                required
              />
            </div>
          )}

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : `Register as ${role}`}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
