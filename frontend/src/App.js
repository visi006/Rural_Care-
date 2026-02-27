import { useState } from "react";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import "./styles.css";

function App() {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(token ? "dashboard" : "login");

  if (page === "register") return <Register setPage={setPage} />;
  if (page === "dashboard") return <Dashboard setPage={setPage} />;
  return <Login setPage={setPage} />;
}

export default App;