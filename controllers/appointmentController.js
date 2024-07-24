const db = require("../db/db");

exports.getAllAppointments = (req, res) => {
  const query = "SELECT * FROM appointment";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render("appointments", { appointments: results });
    }
  });
};

exports.showAddForm = (req, res) => {
  res.render("addAppointment");
};

exports.addAppointment = (req, res) => {
  const { patientName, doctorName, date } = req.body;
  const query =
    "INSERT INTO appointment (PatientName, DoctorName, Date) VALUES (?, ?, ?)";
  db.query(query, [patientName, doctorName, date], (err, result) => {
    if (err) {
      console.error("Error adding appointment:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/appointments");
    }
  });
};

exports.showEditForm = (req, res) => {
  const appointmentID = req.params.id;
  const query = "SELECT * FROM appointment WHERE AppointmentID = ?";
  db.query(query, [appointmentID], (err, result) => {
    if (err) {
      console.error("Error fetching appointment:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render("editAppointment", { appointment: result[0] });
    }
  });
};

exports.updateAppointment = (req, res) => {
  const appointmentID = req.params.id;
  const { patientName, doctorName, date } = req.body;
  const query =
    "UPDATE appointment SET PatientName = ?, DoctorName = ?, Date = ? WHERE AppointmentID = ?";
  db.query(
    query,
    [patientName, doctorName, date, appointmentID],
    (err, result) => {
      if (err) {
        console.error("Error updating appointment:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect("/appointments");
      }
    }
  );
};

exports.deleteAppointment = (req, res) => {
  const appointmentID = req.params.id;
  const deleteBillQuery = "DELETE FROM bill WHERE AppointmentID = ?";
  db.query(deleteBillQuery, [appointmentID], (err, result) => {
    if (err) {
      console.error("Error deleting related bills:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const deleteAppointmentQuery =
        "DELETE FROM appointment WHERE AppointmentID = ?";
      db.query(deleteAppointmentQuery, [appointmentID], (err, result) => {
        if (err) {
          console.error("Error deleting appointment:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.redirect("/appointments");
        }
      });
    }
  });
};
