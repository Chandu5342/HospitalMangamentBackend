import { getAssignedPatients, addTreatment, getPatientHistory } from '../models/doctorModel.js';

// Get dashboard patients
export const dashboardPatients = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { search } = req.query;
        const patients = await getAssignedPatients(doctorId, search);
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add treatment record
export const addTreatmentRecord = async (req, res) => {
    try {
        const doctor_id = req.user.id;
        const { patient_id, diagnosis, prescription } = req.body;

        if (!patient_id || !diagnosis) {
            return res.status(400).json({ message: 'Patient and diagnosis are required' });
        }

        const result = await addTreatment({ patient_id, doctor_id, diagnosis, prescription });
        res.status(201).json({ message: 'Treatment record added', treatmentId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get patient treatment history
export const patientHistory = async (req, res) => {
    try {
        const { patientId } = req.params;
        const history = await getPatientHistory(patientId);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
