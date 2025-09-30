import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { addPatient, getPatients, assignDoctor ,} from '../controllers/patientController.js';

const router = express.Router();

router.post('/', protect, authorize('reception', 'admin'), addPatient);


router.get('/', protect, authorize('reception', 'doctor', 'admin'), getPatients);

router.put('/assign', protect, authorize('reception', 'admin'), assignDoctor);

export default router;
