const db = require("../db/db");

// Get all bills
exports.getAllBills = (req, res) => {
  let sql = "SELECT * FROM Bill";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("bills", { bills: results });
  });
};

// Add a bill
exports.addBill = (req, res) => {
  let sql = "INSERT INTO Bill SET ?";
  let newBill = {
    PatientID: req.body.patientId,
    AppointmentID: req.body.appointmentId,
    Amount: req.body.amount,
    BillingDate: req.body.billingDate,
  };
  db.query(sql, newBill, (err, result) => {
    if (err) throw err;
    res.redirect("/bills");
  });
};

// Edit a bill
exports.editBill = (req, res) => {
  let sql = "UPDATE Bill SET ? WHERE BillID = ?";
  let updatedBill = {
    PatientID: req.body.patientId,
    AppointmentID: req.body.appointmentId,
    Amount: req.body.amount,
    BillingDate: req.body.billingDate,
  };
  db.query(sql, [updatedBill, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/bills");
  });
};

// Delete a bill
exports.deleteBill = (req, res) => {
  let sql = "DELETE FROM Bill WHERE BillID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/bills");
  });
};
