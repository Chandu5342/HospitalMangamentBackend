import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { 
  dashboardPatients, 
  addTreatmentRecord, 
  patientHistory, 
  labResults 
} from '../controllers/doctorController.js';

const router = express.Router();

// Only doctors
router.get('/patients', protect, authorize('doctor'), dashboardPatients);
router.post('/treatment', protect, authorize('doctor'), addTreatmentRecord);

// History: supports both full & paginated with query params
router.get('/history/:patientId', protect, authorize('doctor'), patientHistory);

// Lab results of a patient
router.get('/lab-results/:patientId', protect, authorize('doctor'), labResults);

export default router;
