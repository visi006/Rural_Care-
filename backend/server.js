const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const patientAuthRoutes = require("./routes/patientAuthRoutes");
const doctorAuthRoutes = require("./routes/doctorAuthRoutes");

app.use("/api/patient", patientAuthRoutes);
app.use("/api/doctor", doctorAuthRoutes);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("RuralCare API is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});