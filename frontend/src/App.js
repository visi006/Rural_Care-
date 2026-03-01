import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import BookAppointment from "./components/BookAppointment";
import ViewAppointments from "./components/ViewAppointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/book" element={<BookAppointment />} />
      <Route path="/view" element={<ViewAppointments />} />
    </Routes>
  );
}

export default App;