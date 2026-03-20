import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const navigate = useNavigate();

  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorName,
          date,
          time,
          reason,
        }),
      });

      if (res.ok) {
        alert("Appointment booked");
        navigate("/dashboard");
      } else {
        alert("Failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="book-page">
      <div className="book-card">

        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit} className="book-form">

          <input
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <input
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            Book Appointment
          </button>

        </form>

        <button
          className="btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default BookAppointment;