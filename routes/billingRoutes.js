import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createBill, getPatientBills, markBillPaid } from '../controllers/billingController.js';

const router = express.Router();

// Only reception and admin can manage bills
router.post('/:id/bills', protect, authorize('reception','admin'), createBill);
router.get('/:id/bills', protect, authorize('reception','doctor','admin'), getPatientBills);
router.patch('/:id/bills/:billId/pay', protect, authorize('reception','admin'), markBillPaid);

export default router;
