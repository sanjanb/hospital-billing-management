USE HospitalBillingSystem;

DELIMITER //

CREATE TRIGGER after_appointment_insert
AFTER INSERT ON Appointment
FOR EACH ROW
BEGIN
    INSERT INTO Bill (PatientID, AppointmentID, Amount, BillingDate)
    VALUES (NEW.PatientID, NEW.AppointmentID, 0.00, CURDATE());
END //

CREATE TRIGGER after_payment_insert
AFTER INSERT ON Payment
FOR EACH ROW
BEGIN
    UPDATE Bill
    SET Amount = Amount + NEW.AmountPaid
    WHERE BillID = NEW.BillID;
END //

CREATE TRIGGER after_payment_update
AFTER UPDATE ON Payment
FOR EACH ROW
BEGIN
    UPDATE Bill
    SET Amount = Amount + NEW.AmountPaid - OLD.AmountPaid
    WHERE BillID = NEW.BillID;
END //

CREATE TRIGGER after_bill_delete
AFTER DELETE ON Bill
FOR EACH ROW
BEGIN
    DELETE FROM Payment
    WHERE BillID = OLD.BillID;
END //

CREATE TRIGGER before_doctor_delete
BEFORE DELETE ON Doctor
FOR EACH ROW
BEGIN
    DECLARE num_appointments INT;
    SELECT COUNT(*) INTO num_appointments
    FROM Appointment
    WHERE DoctorID = OLD.DoctorID;
    IF num_appointments > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete doctor with existing appointments.';
    END IF;
END //

DELIMITER ;
