const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerPatient = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const existing = await Patient.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      name,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.loginPatient = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const patient = await Patient.findOne({ phone });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("JWT SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: "patient" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};