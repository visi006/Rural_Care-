const Appointment = require("../models/Appointment");
const jwt = require("jsonwebtoken");

// CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { doctorName, date, time } = req.body;

    const appointment = await Appointment.create({
      patientId: decoded.id,
      doctorName,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET APPOINTMENTS OF LOGGED-IN PATIENT
exports.getAppointments = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const appointments = await Appointment.find({
      patientId: decoded.id,
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};