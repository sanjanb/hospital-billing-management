const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Display contact form
router.get("/", (req, res) => {
  res.render("contact", { success: false });
});

// Handle form submission
router.post("/submit", contactController.submitContact);

// Display success message
router.get("/success", (req, res) => {
  res.render("success");
});

module.exports = router;
