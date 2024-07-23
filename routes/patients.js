const express = require("express");
const db = require("../db/db"); // Adjust this path based on the actual location of db.js
const router = express.Router();
const patientController = require("../controllers/patientController");

router.get("/", patientController.getAllPatients);
router.post("/add", patientController.addPatient);
router.post("/edit/:id", patientController.editPatient);
router.get("/delete/:id", patientController.deletePatient);

module.exports = router;
