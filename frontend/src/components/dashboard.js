function Dashboard({ setPage }) {
  const role = localStorage.getItem("role");

  return (
    <div className="card">
      <h2>Welcome {role}</h2>
      <button
        onClick={() => {
          localStorage.clear();
          setPage("login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;