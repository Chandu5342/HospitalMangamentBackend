import connection from '../db/connection.js';

// Add new patient
export const createPatient = async ({ name, age, gender, contact, address }) => {
    const [result] = await connection.execute(
        'INSERT INTO patients (name, age, gender, contact, address, createdBy) VALUES (?,?,?,?,?,?)',
        [name, age, gender, contact, address, 1]
    );
    return result;
};

export const getAllPatients = async ({ search, page = 1, limit = 10, doctorId, gender }) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const offset = (pageNum - 1) * limitNum;

  let query = 'SELECT * FROM patients WHERE 1=1';
  const values = [];

  if (search) {
    query += ' AND name LIKE ?';
    values.push(`%${search}%`);
  }

  if (doctorId) {
    const doctorNum = parseInt(doctorId);
    if (!isNaN(doctorNum)) {
      query += ' AND assigned_doctor = ?';
      values.push(doctorNum);
    }
  }

  if (gender) {
    query += ' AND gender = ?';
    values.push(gender);
  }

  // LIMIT and OFFSET must be numbers
  query += ` LIMIT ${limitNum} OFFSET ${offset}`;

  const [rows] = await connection.execute(query, values);

  // Total count for pagination
  let countQuery = 'SELECT COUNT(*) as total FROM patients WHERE 1=1';
  const countValues = [];

  if (search) countQuery += ' AND name LIKE ?' && countValues.push(`%${search}%`);
  if (doctorId) countQuery += ' AND assigned_doctor = ?' && countValues.push(parseInt(doctorId));
  if (gender) countQuery += ' AND gender = ?' && countValues.push(gender);

  const [countRows] = await connection.execute(countQuery, countValues);
  const totalCount = countRows[0].total;
  const totalPages = Math.ceil(totalCount / limitNum);

  return { patients: rows, totalCount, totalPages, currentPage: pageNum };
};


// Assign doctor to patient
export const assignDoctorToPatient = async (patientId, doctorId) => {
    const [result] = await connection.execute(
        'UPDATE patients SET assigned_doctor = ? WHERE id = ?',
        [doctorId, patientId]
    );
    return result;
};
