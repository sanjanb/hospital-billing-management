const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/db");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
const indexRouter = require("./routes/index");
const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");
const billsRouter = require("./routes/bills");
const paymentsRouter = require("./routes/payments");
const contactRouter = require("./routes/contact");

app.use("/", indexRouter);
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/bills", billsRouter);
app.use("/payments", paymentsRouter);
app.use("/contact", contactRouter); // Add this line

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
