import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.log("Error loading appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Appointments</h2>

        <button onClick={() => navigate("/dashboard")}>
          Back
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments</p>
        ) : (
          appointments.map((a) => (
            <div key={a._id}>
              <p>{a.doctorName}</p>
              <p>{a.date}</p>
              <p>{a.time}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default ViewAppointments;