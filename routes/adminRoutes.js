import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import {
  addUser,
  listUsers,
  removeUser,
  dashboardStats,
  updateUser
} from '../controllers/adminController.js';

const router = express.Router();

// User management
router.post('/users', protect, authorize('admin'), addUser);
router.get('/users', protect, authorize('admin','reception'), listUsers);
router.put('/users/:userId', protect, authorize('admin'), updateUser);
router.delete('/users/:userId', protect, authorize('admin'), removeUser);

// Dashboard stats
router.get('/dashboard', protect, authorize('admin','reception'), dashboardStats);

export default router;
