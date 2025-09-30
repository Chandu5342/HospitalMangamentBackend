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

// Get patients
export const getPatients = async (req, res) => {
    try {
        const { search } = req.query;
        const patients = await getAllPatients(search);
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
