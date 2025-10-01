import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { addLabReport, getLabResults, downloadLabReport } from '../controllers/labController.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/upload', protect, authorize('lab'), upload.single('file'), addLabReport);

// Fetch lab results by patientId with pagination
router.get('/:patientId', protect, authorize('lab', 'doctor', 'reception', 'admin'), getLabResults);

// Secure file download
router.get('/download/:id', protect, authorize('lab', 'doctor', 'reception', 'admin'), downloadLabReport);

export default router;
