const express = require("express");
const db = require("../db/db"); // Ensure this path is correct
const router = express.Router();
const patientController = require("../controllers/patientController");

// Route to get all patients
router.get("/", patientController.getAllPatients);

// Route to add a new patient
router.post("/add", patientController.addPatient);

// Route to edit a patient's details
router.post("/edit/:id", patientController.editPatient);

// Route to delete a patient
router.get("/delete/:id", patientController.deletePatient);

module.exports = router;
