import path from 'path';
import fs from 'fs';
import { uploadLabReport, getLabResultsByPatient } from '../models/labModel.js';

// Upload Lab Report
export const addLabReport = async (req, res) => {
    try {
        const { patient_id, report_name } = req.body;
        if (!req.file) return res.status(400).json({ message: 'File is required' });

        const file_path = `/uploads/${req.file.filename}`;
        await uploadLabReport({ patient_id, lab_staff_id: req.user.id, file_path, report_name });
        res.status(201).json({ message: 'Lab report uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Lab Results with Pagination
export const getLabResults = async (req, res) => {
    try {
        const { patientId } = req.params;
        let { page, limit } = req.query;
        page = parseInt(page, 10) || 1;
        limit = parseInt(limit, 10) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await getLabResultsByPatient(patientId, limit, offset);

        res.json({
            data,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Secure File Download
export const downloadLabReport = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await getLabResultsByPatient(null, null, null, id); // fetch single by id
        if (!results || results.length === 0) return res.status(404).json({ message: 'File not found' });

        const filePath = path.join(process.cwd(), results[0].file_path);
        if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found on server' });

        res.download(filePath, results[0].report_name + path.extname(filePath));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
