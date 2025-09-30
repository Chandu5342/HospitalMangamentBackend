import { uploadLabReport, getLabResultsByPatient } from '../models/labModel.js';

// Upload lab report
export const addLabReport = async (req, res) => {
    try {
        const lab_staff_id = req.user.id;
        const { patient_id, report_name } = req.body;

        if (!patient_id || !report_name || !req.file) {
            return res.status(400).json({ message: 'Patient, report name, and file are required' });
        }

        // Use relative path for frontend
        const file_path = `/uploads/${req.file.filename}`;

        const result = await uploadLabReport({ patient_id, lab_staff_id, file_path, report_name });
        res.status(201).json({ message: 'Lab report uploaded', reportId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get lab results by patient
export const getLabResults = async (req, res) => {
    try {
        const { patientId } = req.params;
        const results = await getLabResultsByPatient(patientId);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
