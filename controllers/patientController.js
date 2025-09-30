import { createPatient, getAllPatients, assignDoctorToPatient } from '../models/patientModel.js';

// Register patient
export const addPatient = async (req, res) => {
    try {
        const { name, age, gender, contact, address } = req.body;
        if (!name || !age || !gender || !contact) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const result = await createPatient({ name, age, gender, contact, address });
        res.status(201).json({ message: 'Patient registered successfully', patientId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get patients with filters & pagination
export const getPatients = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 10, doctorId, gender } = req.query;

        const data = await getAllPatients({ search, page, limit, doctorId, gender });

        // Always return patients as an array
        res.json({
            patients: Array.isArray(data.patients) ? data.patients : [],
            totalCount: data.totalCount || 0,
            totalPages: data.totalPages || 1,
            currentPage: data.currentPage || parseInt(page) || 1
        });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({
            patients: [], // fallback empty array
            totalCount: 0,
            totalPages: 1,
            currentPage: parseInt(req.query.page) || 1,
            error: error.message
        });
    }
};

// Assign doctor
export const assignDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;
        if (!patientId || !doctorId) {
            return res.status(400).json({ message: 'PatientId and DoctorId required' });
        }

        await assignDoctorToPatient(patientId, doctorId);
        res.json({ message: 'Doctor assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
