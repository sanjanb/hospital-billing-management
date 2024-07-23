const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/", appointmentController.getAllAppointments);
router.post("/add", appointmentController.addAppointment);
router.post("/edit/:id", appointmentController.editAppointment);
router.get("/delete/:id", appointmentController.deleteAppointment);

module.exports = router;
