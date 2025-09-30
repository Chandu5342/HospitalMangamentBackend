import connection from '../db/connection.js';

// Add new patient
export const createPatient = async ({ name, age, gender, contact, address }) => {
    const [result] = await connection.execute(
        'INSERT INTO patients (name, age, gender, contact, address,createdBy) VALUES (?,?,?,?,?,?)',
        [name, age, gender, contact, address,1]
    );
    return result;
};

// Get patients (with optional search)
export const getAllPatients = async (search) => {
    let query = 'SELECT * FROM patients';
    let values = [];

    if (search) {
        query += ' WHERE name LIKE ?';
        values.push(`%${search}%`);
    }

    const [rows] = await connection.execute(query, values);
    return rows;
};

// Assign doctor to patient
export const assignDoctorToPatient = async (patientId, doctorId) => {
    const [result] = await connection.execute(
        'UPDATE patients SET assigned_doctor = ? WHERE id = ?',
        [doctorId, patientId]
    );
    return result;
};
