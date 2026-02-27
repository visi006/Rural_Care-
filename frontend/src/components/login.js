import { useState } from "react";
import { loginPatient } from "../services/api";

function Login({ setPage }) {
  const [form, setForm] = useState({ phone: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginPatient(form);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setPage("dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="card">
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setPage("register")}>
        Switch to Register
      </button>
    </div>
  );
}

export default Login;