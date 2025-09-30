import { insertBill, fetchBillsByPatient, updateBillStatus } from '../models/billingModel.js';

export const createBill = async (req, res) => {
    try {
        const patientId = req.params.id;
        const { items, totalAmount } = req.body;
        if (!items || !totalAmount) {
            return res.status(400).json({ message: 'Items and totalAmount required' });
        }

        const result = await insertBill(patientId, items, totalAmount);
        res.status(201).json({ message: 'Bill created', billId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPatientBills = async (req, res) => {
    try {
        const patientId = req.params.id;
        const bills = await fetchBillsByPatient(patientId);
        res.json(bills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const markBillPaid = async (req, res) => {
    try {
        const { billId } = req.params;
        await updateBillStatus(billId, 'paid');
        res.json({ message: 'Bill marked as paid' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
