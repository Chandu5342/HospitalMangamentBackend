import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) 
    {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
};
