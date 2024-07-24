const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Display contact form
router.get("/", (req, res) => {
  res.render("contact");
});

// Handle form submission
router.post("/submit", contactController.submitContact);

module.exports = router;
