import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h2>Book Appointment Page</h2>
        <p>Form will come here.</p>

        <button onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;