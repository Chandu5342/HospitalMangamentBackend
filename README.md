# Hospital Management System Backend

This is the backend API for the Hospital Management System built with Node.js, Express, MySQL, and JWT authentication.

## Features
- User authentication (Signup, Login) with JWT and token management 
- Role-based access control (roles: admin, doctor, reception)
- Patient management APIs (CRUD, assign doctor)
- Doctor APIs (dashboard, add treatment, patient history)
- Reception APIs (add patient, assign doctor)
- Billing APIs (create bill, fetch bills, pay)
- Lab results APIs (upload/view lab reports)
- Pagination for patient history and other lists

## Folder Structure

backend/
│── config/         # Database & JWT configuration
│── controllers/    # API business logic
│── middleware/     # Auth and role-based middleware
│── models/         # Database queries/models
│── routes/         # API endpoints
│── server.js       # App entry point

## Tech Stack
- Node.js + Express
- MySQL + mysql2
- JWT Authentication
- bcrypt.js for password hashing

## API Endpoints

### Auth
- POST `/api/auth/signup` → Register a new user
- POST `/api/auth/login` → Login user, returns JWT

### Patients
- GET `/api/patients` → Fetch all patients (filters supported)
- POST `/api/patients` → Add a patient
- PUT `/api/patients/assign` → Assign doctor to patient

### Doctor
- GET `/api/doctor/patients` → Get assigned patients (with search)
- POST `/api/doctor/treatment` → Add treatment record
- GET `/api/doctor/history/:patientId` → Get patient treatment history
- GET `/api/doctor/history/:patientId/paginated?page=1&limit=10` → Paginated history
- GET `/api/doctor/lab-results/:patientId` → Get lab results for patient

### Billing
- POST `/api/billing/:patientId` → Create bill
- GET `/api/billing/:patientId` → Get all bills for patient
- POST `/api/billing/:patientId/:billId/pay` → Pay a bill

### Lab Results
- POST `/api/lab-results/upload` → Upload lab result file
- GET `/api/lab-results/:patientId` → Get lab results for a patient

## Backend Live API
- https://hospitalmangamentbackend.onrender.com

## Admin / Reception / Doctor Test Accounts
- Admin: admin@gmail.com / 123456
- Doctor: doctor1@gmail.com / 123456
- Reception: reception@gmail.com / 123456

## Run Locally
```bash
git clone <your-repo-url>
cd backend
npm install
npm start
