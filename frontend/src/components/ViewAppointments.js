import { useNavigate } from "react-router-dom";

function ViewAppointments() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h2>View Appointments Page</h2>
        <p>Appointments list will come here.</p>

        <button onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default ViewAppointments;