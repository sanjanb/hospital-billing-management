const db = require("../db/db");

// Handle contact form submission
exports.submitContact = (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO Contacts (Name, Email, Message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact message:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/contact/success");
  });
};
