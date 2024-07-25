const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Route to get all doctors
router.get("/", doctorController.getAllDoctors);

// Route to add a new doctor
router.post("/add", doctorController.addDoctor);

// Route to edit a doctor's details
router.post("/edit/:id", doctorController.editDoctor);

// Route to delete a doctor
router.get("/delete/:id", doctorController.deleteDoctor);

module.exports = router;
