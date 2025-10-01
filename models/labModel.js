import connection from '../db/connection.js';

// Upload lab report
export const uploadLabReport = async ({ patient_id, lab_staff_id, file_path, report_name }) => {
    const [result] = await connection.execute(
        'INSERT INTO lab_results (patient_id, lab_staff_id, file_path, report_name) VALUES (?,?,?,?)',
        [patient_id, lab_staff_id, file_path, report_name]
    );
    return result;
};

export const getLabResultsByPatient = async (patientId, limit, offset, id = null) => {
    if (id) {
        const [rows] = await connection.execute(
            'SELECT l.*, u.name as lab_staff_name FROM lab_results l JOIN users u ON l.lab_staff_id = u.id WHERE l.id = ?',
            [id]
        );
        return rows;
    }

    const pid = parseInt(patientId, 10); // Ensure integer

    const [[{ count }]] = await connection.execute(
        'SELECT COUNT(*) as count FROM lab_results WHERE patient_id = ?',
        [pid]
    );

    const [rows] = await connection.query(
        `SELECT l.*, u.name as lab_staff_name 
         FROM lab_results l 
         JOIN users u ON l.lab_staff_id = u.id 
         WHERE l.patient_id = ${pid}
         ORDER BY created_at DESC 
         LIMIT ${limit} OFFSET ${offset}`
    );

    return { data: rows, total: count };
};