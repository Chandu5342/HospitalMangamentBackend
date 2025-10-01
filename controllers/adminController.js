import { createUser, getUsersPaginated, deleteUserById, getHospitalStats, updateUserById } from '../models/adminModel.js';

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) 
      return res.status(400).json({ message: 'All fields required' });

    const result = await createUser({ name, email, password, role });
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List users with pagination, search, role filter
export const listUsers = async (req, res) => {
  try {
    let { page, limit, search, role } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const { data, total } = await getUsersPaginated({ page, limit, offset, search, role });
    res.json({
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, role, password } = req.body;

    if (!name && !email && !role && !password) 
      return res.status(400).json({ message: 'At least one field required' });

    await updateUserById(userId, { name, email, role, password });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
export const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await deleteUserById(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dashboard stats
export const dashboardStats = async (req, res) => {
  try {
    const stats = await getHospitalStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
