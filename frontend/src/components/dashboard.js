import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {role}</h2>

        <button onClick={() => navigate("/book")}>
          Book Appointment
        </button>

        <button onClick={() => navigate("/view")}>
          View Appointments
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;