const db = require("../db/db");

exports.getAllPatients = (req, res) => {
  let sql = "SELECT * FROM Patient";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("patients", { patients: results });
  });
};

exports.addPatient = (req, res) => {
  let sql = "INSERT INTO Patient SET ?";
  let newPatient = {
    PatientName: req.body.name, // Updated to PatientName
    Age: req.body.age,
    Gender: req.body.gender,
    Address: req.body.address,
    ContactNumber: req.body.contactNumber,
  };
  db.query(sql, newPatient, (err, result) => {
    if (err) throw err;
    res.redirect("/patients");
  });
};

exports.editPatient = (req, res) => {
  let sql = "UPDATE Patient SET ? WHERE PatientID = ?";
  let updatedPatient = {
    PatientName: req.body.name, // Updated to PatientName
    Age: req.body.age,
    Gender: req.body.gender,
    Address: req.body.address,
    ContactNumber: req.body.contactNumber,
  };
  db.query(sql, [updatedPatient, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/patients");
  });
};

exports.deletePatient = (req, res) => {
  let sql = "DELETE FROM Patient WHERE PatientID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/patients");
  });
};
