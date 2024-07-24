const db = require("../db/db");

// Handle contact form submission
exports.submitContact = (req, res) => {
  const { name, email, message } = req.body;

  let sql = "INSERT INTO Contact (Name, Email, Message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact data:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/contact?success=true");
  });
};
