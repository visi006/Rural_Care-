const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const patientAuthRoutes = require("./routes/patientAuthRoutes");

const app = express();  

app.use(cors());
app.use(express.json());


app.use("/api/patient", patientAuthRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});