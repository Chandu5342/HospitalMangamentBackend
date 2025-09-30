import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashpsw = await bcrypt.hash(password, 10);
        const result = await createUser({ name, email, password: hashpsw, role });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'User is not registered' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid  password' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.status(200).json({ token, role: user.role, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
