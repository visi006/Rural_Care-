const Appointment = require("../models/Appointment");

// CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
  try {
    const { doctorName, date, time } = req.body;

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorName,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// GET APPOINTMENTS OF LOGGED-IN PATIENT
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id,
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
