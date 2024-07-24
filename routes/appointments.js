const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// List all appointments
router.get("/", appointmentController.getAllAppointments);

// Show the form to add a new appointment
router.get("/add", appointmentController.showAddForm);

// Handle the form submission to add a new appointment
router.post("/add", appointmentController.addAppointment);

// Show the form to edit an existing appointment
router.get("/edit/:id", appointmentController.showEditForm);

// Handle the form submission to update an existing appointment
router.post("/edit/:id", appointmentController.updateAppointment);

// Handle the request to delete an appointment
router.get("/delete/:id", appointmentController.deleteAppointment);

module.exports = router;
