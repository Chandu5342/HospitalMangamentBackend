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

export const getUsersPaginated = async ({ page, limit, offset, search, role }) => {
  try {
    // Base SQL
    let sql = 'SELECT id, name, email, role, created_at FROM users';
    const conditions = [];
    const params = [];

    // Trim input
    search = search?.trim();
    role = role?.trim();
    const validRoles = ['admin','doctor','reception','lab'];

    // Add search condition
    if (search && search.length > 0) {
      conditions.push('(name LIKE ? OR email LIKE ? OR role LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Add role condition
    if (role && validRoles.includes(role)) {
      conditions.push('role = ?');
      params.push(role);
    }

    // Append WHERE if any conditions
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    // COUNT query
    const countSql = `SELECT COUNT(*) as total FROM (${sql}) AS t`;
    const [countRows] = await connection.query(countSql, params);
    const total = countRows[0].total;

    // Add ORDER + LIMIT + OFFSET
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const selectParams = [...params, Number(limit), Number(offset)];

    // DEBUG logs
    console.log('FINAL SQL:', sql);
    console.log('PARAMS:', selectParams);

    // Execute final query using query()
    const [rows] = await connection.query(sql, selectParams);

    return { data: rows, total };
  } catch (error) {
    console.error('getUsersPaginated ERROR:', error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUserById = async (userId) => {
  const [result] = await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
  return result;
};

// Update user by ID
export const updateUserById = async (userId, { name, email, role, password }) => {
  const fields = [];
  const values = [];

  if (name) { fields.push('name=?'); values.push(name); }
  if (email) { fields.push('email=?'); values.push(email); }
  if (role) { fields.push('role=?'); values.push(role); }
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    fields.push('password=?'); values.push(hashed);
  }

  if (fields.length === 0) return;

  values.push(userId);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id=?`;
  await connection.execute(sql, values);
};

// Get hospital dashboard stats
export const getHospitalStats = async () => {
  const [[patients]] = await connection.execute('SELECT COUNT(*) AS totalPatients FROM patients');
  const [[treatments]] = await connection.execute('SELECT COUNT(*) AS totalTreatments FROM treatments');
  const [[labResults]] = await connection.execute('SELECT COUNT(*) AS totalLabReports FROM lab_results');

  return {
    totalPatients: patients.totalPatients,
    totalTreatments: treatments.totalTreatments,
    totalLabReports: labResults.totalLabReports
  };
};
