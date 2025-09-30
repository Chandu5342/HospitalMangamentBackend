import connection from '../db/connection.js';

export const insertBill = async (patientId, items, totalAmount) => {
    const [result] = await connection.execute(
        'INSERT INTO bills (patient_id, items, total_amount) VALUES (?, ?, ?)',
        [patientId, JSON.stringify(items), totalAmount]
    );
    return result;
};

export const fetchBillsByPatient = async (patientId) => {
    const [rows] = await connection.execute(
        'SELECT * FROM bills WHERE patient_id = ? ORDER BY created_at DESC',
        [patientId]
    );
    return rows;
};

export const updateBillStatus = async (billId, status='paid') => {
    const [result] = await connection.execute(
        'UPDATE bills SET status=? WHERE id=?',
        [status, billId]
    );
    return result;
};
