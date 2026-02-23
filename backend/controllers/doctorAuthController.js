const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerDoctor = async (req, res) => {
  try {
    const { name, phone, password, specialization } = req.body;

    const existing = await Doctor.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Doctor.create({
      name,
      phone,
      specialization,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.loginDoctor = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const doctor = await Doctor.findOne({ phone });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: "doctor" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};