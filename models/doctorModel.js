import connection from '../db/connection.js';

// Get patients assigned to doctor (with optional search)
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

// Get patient history (all)
export const getPatientHistory = async (patientId) => {
    const [rows] = await connection.execute(
        `SELECT t.*, u.name as doctor_name 
         FROM treatments t 
         JOIN users u ON t.doctor_id = u.id 
         WHERE t.patient_id = ? 
         ORDER BY treatment_date DESC`,
        [patientId]
    );
    return rows;
};

export const getPatientHistoryPaginated = async (patientId, page, limit) => {
    // Ensure page and limit are numbers >= 1
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 5;
    const offset = (pageNum - 1) * limitNum;

    // Fetch paginated history
    const [rows] = await connection.execute(
        `SELECT t.*, u.name as doctor_name 
         FROM treatments t 
         JOIN users u ON t.doctor_id = u.id 
         WHERE t.patient_id = ? 
         ORDER BY treatment_date DESC
         LIMIT ${limitNum} OFFSET ${offset}`, // Inject numbers directly
        [patientId] // Only patientId is parameterized
    );

    // Get total count for pagination
    const [[{ count }]] = await connection.execute(
        'SELECT COUNT(*) as count FROM treatments WHERE patient_id = ?',
        [patientId]
    );

    return { data: rows, total: count };
};
// Get lab results for patient
export const getLabResultsByPatient = async (patientId) => {
    const [rows] = await connection.execute(
        `SELECT lr.*, u.name as lab_staff 
         FROM lab_results lr 
         JOIN users u ON lr.lab_staff_id = u.id 
         WHERE lr.patient_id = ? 
         ORDER BY lr.created_at DESC`,
        [patientId]
    );
    return rows;
};
