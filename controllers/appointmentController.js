const db = require("../db/db");

exports.getAllAppointments = (req, res) => {
  const query = `
    SELECT a.AppointmentID, p.PatientName, d.DoctorName, a.AppointmentDate, a.Reason
    FROM appointment a
    JOIN patient p ON a.PatientID = p.PatientID
    JOIN doctor d ON a.DoctorID = d.DoctorID`;

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
  const { patientName, doctorName, appointmentDate, reason } = req.body;

  // Look up PatientID and DoctorID
  const getPatientIDQuery =
    "SELECT PatientID FROM patient WHERE PatientName = ?";
  const getDoctorIDQuery = "SELECT DoctorID FROM doctor WHERE DoctorName = ?";

  db.query(getPatientIDQuery, [patientName], (err, patientResults) => {
    if (err || patientResults.length === 0) {
      console.error("Error finding patient:", err);
      res.status(400).send("Bad Request: Invalid patient name");
    } else {
      const patientID = patientResults[0].PatientID;

      db.query(getDoctorIDQuery, [doctorName], (err, doctorResults) => {
        if (err || doctorResults.length === 0) {
          console.error("Error finding doctor:", err);
          res.status(400).send("Bad Request: Invalid doctor name");
        } else {
          const doctorID = doctorResults[0].DoctorID;

          const addAppointmentQuery = `
            INSERT INTO appointment (PatientID, DoctorID, AppointmentDate, Reason)
            VALUES (?, ?, ?, ?)`;

          db.query(
            addAppointmentQuery,
            [patientID, doctorID, appointmentDate, reason],
            (err, result) => {
              if (err) {
                console.error("Error adding appointment:", err);
                res.status(500).send("Internal Server Error");
              } else {
                res.redirect("/appointments");
              }
            }
          );
        }
      });
    }
  });
};

exports.showEditForm = (req, res) => {
  const appointmentID = req.params.id;
  const query = `
    SELECT a.AppointmentID, p.PatientName, d.DoctorName, a.AppointmentDate, a.Reason
    FROM appointment a
    JOIN patient p ON a.PatientID = p.PatientID
    JOIN doctor d ON a.DoctorID = d.DoctorID
    WHERE a.AppointmentID = ?`;

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
  const { patientName, doctorName, appointmentDate, reason } = req.body;

  // Look up PatientID and DoctorID
  const getPatientIDQuery =
    "SELECT PatientID FROM patient WHERE PatientName = ?";
  const getDoctorIDQuery = "SELECT DoctorID FROM doctor WHERE DoctorName = ?";

  db.query(getPatientIDQuery, [patientName], (err, patientResults) => {
    if (err || patientResults.length === 0) {
      console.error("Error finding patient:", err);
      res.status(400).send("Bad Request: Invalid patient name");
    } else {
      const patientID = patientResults[0].PatientID;

      db.query(getDoctorIDQuery, [doctorName], (err, doctorResults) => {
        if (err || doctorResults.length === 0) {
          console.error("Error finding doctor:", err);
          res.status(400).send("Bad Request: Invalid doctor name");
        } else {
          const doctorID = doctorResults[0].DoctorID;

          const updateAppointmentQuery = `
            UPDATE appointment
            SET PatientID = ?, DoctorID = ?, AppointmentDate = ?, Reason = ?
            WHERE AppointmentID = ?`;

          db.query(
            updateAppointmentQuery,
            [patientID, doctorID, appointmentDate, reason, appointmentID],
            (err, result) => {
              if (err) {
                console.error("Error updating appointment:", err);
                res.status(500).send("Internal Server Error");
              } else {
                res.redirect("/appointments");
              }
            }
          );
        }
      });
    }
  });
};

exports.deleteAppointment = (req, res) => {
  const appointmentID = req.params.id;

  // Start a transaction to handle related entries
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Delete related bills first
    const deleteBillQuery = "DELETE FROM bill WHERE AppointmentID = ?";
    db.query(deleteBillQuery, [appointmentID], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.error("Error deleting related bills:", err);
          res.status(500).send("Internal Server Error");
        });
      }

      // Then delete the appointment
      const deleteAppointmentQuery =
        "DELETE FROM appointment WHERE AppointmentID = ?";
      db.query(deleteAppointmentQuery, [appointmentID], (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error deleting appointment:", err);
            res.status(500).send("Internal Server Error");
          });
        }

        // Commit the transaction
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error committing transaction:", err);
              res.status(500).send("Internal Server Error");
            });
          }

          res.redirect("/appointments");
        });
      });
    });
  });
};
