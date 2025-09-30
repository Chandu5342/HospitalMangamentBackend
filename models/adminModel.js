import connection from '../db/connection.js';
import bcrypt from 'bcrypt';

// Create a new user
export const createUser = async ({ name, email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)',
        [name, email, hashedPassword, role]
    );
    return result;
};

// Get all users
export const getAllUsers = async () => {
    const [rows] = await connection.execute('SELECT id, name, email, role, created_at FROM users');
    return rows;
};

// Delete a user
export const deleteUserById = async (userId) => {
    const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
    return result;
};

// Get hospital stats (optional: total patients, treatments, lab results)
export const getHospitalStats = async () => {
    const [[patients]] = await connection.execute('SELECT COUNT(*) AS totalPatients FROM patients');
    const [[treatments]] = await connection.execute('SELECT COUNT(*) AS totalTreatments FROM treatments');
    const [[labResults]] = await connection.execute('SELECT COUNT(*) AS totalLabReports FROM lab_results');
    return { totalPatients: patients.totalPatients, totalTreatments: treatments.totalTreatments, totalLabReports: labResults.totalLabReports };
};
