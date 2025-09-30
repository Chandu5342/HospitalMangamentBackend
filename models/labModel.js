import connection from '../db/connection.js';

// Upload lab report
export const uploadLabReport = async ({ patient_id, lab_staff_id, file_path, report_name }) => {
    const [result] = await connection.execute(
        'INSERT INTO lab_results (patient_id, lab_staff_id, file_path, report_name) VALUES (?,?,?,?)',
        [patient_id, lab_staff_id, file_path, report_name]
    );
    return result;
};

// Get all lab results for a patient
export const getLabResultsByPatient = async (patientId) => {
    const [rows] = await connection.execute(
        'SELECT l.*, u.name as lab_staff_name FROM lab_results l JOIN users u ON l.lab_staff_id = u.id WHERE l.patient_id = ? ORDER BY created_at DESC',
        [patientId]
    );
    return rows;
};
