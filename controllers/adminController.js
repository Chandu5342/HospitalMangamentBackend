import { createUser, getAllUsers, deleteUserById, getHospitalStats } from '../models/adminModel.js';

// Create new user
export const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await createUser({ name, email, password, role });
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
export const listUsers = async (req, res) => {
    try {
        console.log("hai")
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
export const removeUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await deleteUserById(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hospital dashboard stats
export const dashboardStats = async (req, res) => {
    try {
        const stats = await getHospitalStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
