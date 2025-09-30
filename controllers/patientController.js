import connection from '../db/connection.js';


export const addPatient = async (req, res) => {
    try {
        const { name, age, gender, contact, address } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO patients (name, age, gender, contact, address) VALUES (?, ?, ?, ?, ?)',
            [name, age, gender, contact, address]
        );

        res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all patients (with optional search)
export const getPatients = async (req, res) => {
    try {
        const { search } = req.query;
        let query = 'SELECT * FROM patients';
        let values = [];

        if (search) {
            query += ' WHERE name LIKE ? OR contact LIKE ?';
            values = [`%${search}%`, `%${search}%`];
        }

        const [rows] = await connection.execute(query, values);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const assignDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;
        await connection.execute(
            'UPDATE patients SET assignedDoctorId = ? WHERE id = ?',
            [doctorId, patientId]
        );

        res.json({ message: 'Patient assigned to doctor successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
