import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { dashboardPatients, addTreatmentRecord, patientHistory } from '../controllers/doctorController.js';

const router = express.Router();

// Only doctors
router.get('/patients', protect, authorize('doctor'), dashboardPatients);
router.post('/treatment', protect, authorize('doctor'), addTreatmentRecord);
router.get('/history/:patientId', protect, authorize('doctor'), patientHistory);

export default router;
