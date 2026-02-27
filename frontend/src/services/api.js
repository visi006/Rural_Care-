const BASE_URL = "http://localhost:5000/api";

export const loginPatient = async (data) => {
  const res = await fetch(`${BASE_URL}/patient/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const registerPatient = async (data) => {
  const res = await fetch(`${BASE_URL}/patient/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};