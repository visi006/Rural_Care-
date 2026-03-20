import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser]               = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    // Get user info from localStorage (saved during login)
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/login');
      return;
    }

    setUser(storedUser);
    fetchAppointments(storedUser.role, token);
  }, [navigate]);

  const fetchAppointments = async (role, token) => {
    try {
      // Both patients and doctors fetch from appointments endpoint
      // The backend uses the JWT token to figure out whose appointments to return
      const response = await fetch('http://localhost:5000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`  // sending JWT token in header
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (err) {
      console.log('Could not fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear everything from localStorage → user is now logged out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-page">

      {/* Top Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="logo-circle small">RC</div>
          <span>RuralCare</span>
        </div>
        <div className="nav-right">
          <span className="nav-user">
            {/* Show role as a badge */}
            <span className={`role-badge ${user.role}`}>{user.role}</span>
            {user.name}
          </span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">

        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h2>Welcome back, {user.name} </h2>
          <p>{user.role === 'patient'
            ? 'Manage your health appointments easily'
            : 'Manage your patient appointments'}
          </p>
        </div>

        {/* PATIENT DASHBOARD */}
        {user.role === 'patient' && (
          <div>
            {/* Quick Action Cards */}
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-num">{appointments.length}</div>
                <div className="stat-label">Total Appointments</div>
              </div>
              <div className="stat-card green">
                <div className="stat-num">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </div>
                <div className="stat-label">Confirmed</div>
              </div>
              <div className="stat-card orange">
                <div className="stat-num">
                  {appointments.filter(a => a.status === 'pending').length}
                </div>
                <div className="stat-label">Pending</div>
              </div>
            </div>

            {/* Book Appointment Button */}
            <div className="action-section">
              <Link to="/book-appointment" className="btn-primary">
                + Book New Appointment
              </Link>
              <Link to="/appointments" className="btn-secondary">
                View All Appointments
              </Link>
            </div>
          </div>
        )}

        {/* DOCTOR DASHBOARD */}
        {user.role === 'doctor' && (
          <div>
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-num">{appointments.length}</div>
                <div className="stat-label">Total Patients</div>
              </div>
              <div className="stat-card green">
                <div className="stat-num">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </div>
                <div className="stat-label">Confirmed Today</div>
              </div>
              <div className="stat-card orange">
                <div className="stat-num">
                  {appointments.filter(a => a.status === 'pending').length}
                </div>
                <div className="stat-label">Pending Review</div>
              </div>
            </div>

            <div className="action-section">
              <Link to="/appointments" className="btn-primary">
                View Patient Appointments
              </Link>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="appointments-section">
          <h3>{user.role === 'doctor' ? 'Your Patient Appointments' : 'Your Appointments'}</h3>

          {loading ? (
            <div className="loading">Fetching appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="empty-state">
              <p>No appointments yet.</p>
              {user.role === 'patient' && (
                <Link to="/book-appointment" className="btn-primary">
                  Book your first appointment
                </Link>
              )}
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((appt) => (
                <div key={appt._id} className="appt-card">
                  <div className="appt-info">
                    <div className="appt-name">
                      {/* Patients see doctor name, doctors see patient name */}
                      {user.role === 'patient'
                        ? `Dr. ${appt.doctorName || 'Unknown'}`
                        : appt.patientName || 'Unknown Patient'}
                    </div>
                    <div className="appt-date">
                      {new Date(appt.date).toLocaleDateString()} at {appt.time}
                    </div>
                    <div className="appt-reason">{appt.reason}</div>
                  </div>
                  <span className={`status-badge ${appt.status}`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default dashboard;
