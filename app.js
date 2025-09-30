import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // <-- add this import

import authRoutes from './routes/auth.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import labRoutes from './routes/labRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/billings', billingRoutes);
app.get('/', (req, res) => {
    res.send('Backend server running!');
});

export default app;
