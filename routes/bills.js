const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router.get("/", billController.getAllBills);
router.post("/add", billController.addBill);
router.post("/edit/:id", billController.editBill);
router.get("/delete/:id", billController.deleteBill);

module.exports = router;
