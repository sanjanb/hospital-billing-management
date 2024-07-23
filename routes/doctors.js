const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

router.get("/", doctorController.getAllDoctors);
router.post("/add", doctorController.addDoctor);
router.post("/edit/:id", doctorController.editDoctor);
router.get("/delete/:id", doctorController.deleteDoctor);

module.exports = router;
