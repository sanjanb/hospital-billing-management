const db = require("../db/db");

// Get all payments
exports.getAllPayments = (req, res) => {
  let sql = "SELECT * FROM Payment";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("payments", { payments: results });
  });
};

// Add a payment
exports.addPayment = (req, res) => {
  let sql = "INSERT INTO Payment SET ?";
  let newPayment = {
    BillID: req.body.billId,
    PaymentDate: req.body.paymentDate,
    AmountPaid: req.body.amountPaid,
    PaymentMethod: req.body.paymentMethod,
  };
  db.query(sql, newPayment, (err, result) => {
    if (err) throw err;
    res.redirect("/payments");
  });
};

// Edit a payment
exports.editPayment = (req, res) => {
  let sql = "UPDATE Payment SET ? WHERE PaymentID = ?";
  let updatedPayment = {
    BillID: req.body.billId,
    PaymentDate: req.body.paymentDate,
    AmountPaid: req.body.amountPaid,
    PaymentMethod: req.body.paymentMethod,
  };
  db.query(sql, [updatedPayment, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/payments");
  });
};

// Delete a payment
exports.deletePayment = (req, res) => {
  let sql = "DELETE FROM Payment WHERE PaymentID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/payments");
  });
};
