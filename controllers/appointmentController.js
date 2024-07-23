const db = require("../db/db");

// Get all appointments
exports.getAllAppointments = (req, res) => {
  let sql = "SELECT * FROM Appointment";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("appointments", { appointments: results });
  });
};

// Add an appointment
exports.addAppointment = (req, res) => {
  let sql = "INSERT INTO Appointment SET ?";
  let newAppointment = {
    PatientID: req.body.patientId,
    DoctorID: req.body.doctorId,
    AppointmentDate: req.body.appointmentDate,
    Reason: req.body.reason,
  };
  db.query(sql, newAppointment, (err, result) => {
    if (err) throw err;
    res.redirect("/appointments");
  });
};

// Edit an appointment
exports.editAppointment = (req, res) => {
  let sql = "UPDATE Appointment SET ? WHERE AppointmentID = ?";
  let updatedAppointment = {
    PatientID: req.body.patientId,
    DoctorID: req.body.doctorId,
    AppointmentDate: req.body.appointmentDate,
    Reason: req.body.reason,
  };
  db.query(sql, [updatedAppointment, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/appointments");
  });
};

// Delete an appointment
exports.deleteAppointment = (req, res) => {
  let sql = "DELETE FROM Appointment WHERE AppointmentID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/appointments");
  });
};
