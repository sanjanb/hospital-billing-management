const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getAllPayments);
router.post("/add", paymentController.addPayment);
router.post("/edit/:id", paymentController.editPayment);
router.get("/delete/:id", paymentController.deletePayment);

module.exports = router;
