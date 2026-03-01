import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/api";
import "../styles.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerPatient(form);
      alert(data.message || "Registration successful");
      navigate("/");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Patient Registration</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;