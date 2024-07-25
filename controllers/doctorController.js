const db = require("../db/db");

// Get all doctors
exports.getAllDoctors = (req, res) => {
  let sql = "SELECT * FROM Doctor";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("doctors", { doctors: results });
  });
};

// Add a doctor
exports.addDoctor = (req, res) => {
  let sql = "INSERT INTO Doctor SET ?";
  let newDoctor = {
    DoctorName: req.body.name, // Updated to DoctorName
    Specialty: req.body.specialty,
    ContactNumber: req.body.contactNumber,
  };
  db.query(sql, newDoctor, (err, result) => {
    if (err) throw err;
    res.redirect("/doctors");
  });
};

// Edit a doctor
exports.editDoctor = (req, res) => {
  let sql = "UPDATE Doctor SET ? WHERE DoctorID = ?";
  let updatedDoctor = {
    DoctorName: req.body.name, // Updated to DoctorName
    Specialty: req.body.specialty,
    ContactNumber: req.body.contactNumber,
  };
  db.query(sql, [updatedDoctor, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/doctors");
  });
};

// Delete a doctor
exports.deleteDoctor = (req, res) => {
  let sql = "DELETE FROM Doctor WHERE DoctorID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/doctors");
  });
};
