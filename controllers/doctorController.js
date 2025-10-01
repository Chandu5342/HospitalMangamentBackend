import { 
    getAssignedPatients, 
    addTreatment, 
    getPatientHistory, 
    getPatientHistoryPaginated, 
    getLabResultsByPatient 
} from '../models/doctorModel.js';

// Dashboard: patients assigned to logged-in doctor
export const dashboardPatients = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { search } = req.query;
        const patients = await getAssignedPatients(doctorId, search);
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add treatment record
export const addTreatmentRecord = async (req, res) => {
    try {
        const doctor_id = req.user.id;
        const { patient_id, diagnosis, prescription } = req.body;

        if (!patient_id || !diagnosis) {
            return res.status(400).json({ message: 'Patient and diagnosis are required' });
        }

        const result = await addTreatment({ patient_id, doctor_id, diagnosis, prescription });
        res.status(201).json({ 
            message: 'Treatment record added', 
            treatmentId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Patient history → supports pagination if query params exist
export const patientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { page, limit } = req.query;

    if (page && limit) {
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 5;

        const { data, total } = await getPatientHistoryPaginated(patientId, pageNum, limitNum);
        return res.json({
            data,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum)
        });
    }

    const history = await getPatientHistory(patientId);
    res.json(history);
  } catch (error) {
    console.error(error); // log error to backend console
    res.status(500).json({ error: error.message });
  }
};
// Patient lab results
export const labResults = async (req, res) => {
    try {
        const { patientId } = req.params;
        const results = await getLabResultsByPatient(patientId);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
