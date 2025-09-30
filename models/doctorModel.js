import connection from '../db/connection.js';

// Get all patients assigned to doctor
export const getAssignedPatients = async (doctorId, search) => {
    let query = 'SELECT * FROM patients WHERE assigned_doctor = ?';
    let values = [doctorId];

    if (search) {
        query += ' AND name LIKE ?';
        values.push(`%${search}%`);
    }

    const [rows] = await connection.execute(query, values);
    return rows;
};

// Add treatment record
export const addTreatment = async ({ patient_id, doctor_id, diagnosis, prescription }) => {
    const [result] = await connection.execute(
        'INSERT INTO treatments (patient_id, doctor_id, diagnosis, prescription) VALUES (?,?,?,?)',
        [patient_id, doctor_id, diagnosis, prescription]
    );
    return result;
};

// Get patient treatment history
export const getPatientHistory = async (patientId) => {
    const [rows] = await connection.execute(
        'SELECT t.*, u.name as doctor_name FROM treatments t JOIN users u ON t.doctor_id = u.id WHERE t.patient_id = ? ORDER BY treatment_date DESC',
        [patientId]
    );
    return rows;
};
