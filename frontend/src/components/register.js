import { useState } from "react";
import { registerPatient } from "../services/api";

function Register({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerPatient(form);
    alert(data.message || "Registration completed");;
    setPage("login");
  };

  return (
    <div className="card">
      <h2>Patient Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />
        <input
          placeholder="Phone"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => setPage("login")}>
        Back to Login
      </button>
    </div>
  );
}

export default Register;