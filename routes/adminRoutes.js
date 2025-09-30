import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { addUser, listUsers, removeUser, dashboardStats } from '../controllers/adminController.js';

const router = express.Router();

// Only admin can manage users and dashboard
router.post('/users', protect, authorize('admin'), addUser);
router.get('/users', protect, authorize('admin','reception'), listUsers);
router.delete('/users/:userId', protect, authorize('admin'), removeUser);
router.get('/dashboard', protect, authorize('admin'), dashboardStats);

export default router;
