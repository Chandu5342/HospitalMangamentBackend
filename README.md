🏥 Hospital Management System (HMS)
Overview

A full-stack Hospital Management System for Doctors, Receptionists, Lab Staff, and Admins.
Implemented using React.js, Node.js + Express, MySQL, and JWT authentication.

Modules implemented:

Reception (Patient registration, assign doctor, billing)

Doctor (Dashboard, treatment records, patient history, lab results)

Admin (User management)

Lab (Upload lab reports)

⚙ Backend
Features

REST API with role-based access control

Patient CRUD, treatment records, lab results

JWT authentication

Pagination for patient history

JSON responses for frontend consumption

Environment Variables
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hospital_db
PORT=5000
JWT_SECRET=your_jwt_secret

Installation
cd backend
npm install

Run Server
npm run dev


Runs on http://localhost:5000

API endpoints are prefixed with /api

Key Routes

Patients

POST   /api/patients           → Add patient
GET    /api/patients           → Get all patients (supports search, pagination)
PUT    /api/patients/assign    → Assign doctor to patient


Doctor

GET    /api/doctor/patients                 → Get patients assigned to doctor
POST   /api/doctor/treatment               → Add treatment record
GET    /api/doctor/history/:patientId      → Get patient history (supports ?page=1&limit=10)
GET    /api/doctor/lab-results/:patientId  → Get lab results for patient


Lab

POST   /api/lab/upload     → Upload lab report (requires file)
GET    /api/lab/patient/:id → Get patient lab reports


Admin

POST   /api/admin/users       → Add new user
GET    /api/admin/users       → Get all users
PUT    /api/admin/users/:id   → Edit user
DELETE /api/admin/users/:id   → Delete user

💻 Frontend
Features

React.js dashboard per role

Bootstrap + React-Bootstrap for UI

Tabs for Reception dashboard (Add Patient, Patient List, Assign Doctor, Billing)

Doctor dashboard with:

Assigned patients

Add treatment record

Patient history (pagination optional)

Lab results display

Billing component with dynamic PDF generation using jsPDF

Installation
cd frontend
npm install

Run Frontend
npm start


Runs on http://localhost:3000

Connects to backend via Axios (VITE_API_URL or http://localhost:5000/api)

Key Components

Reception

ReceptionDashboard.jsx → main layout

AddPatient.jsx

PatientList.jsx

AssignDoctor.jsx

AddBill.jsx

BillList.jsx

Doctor

DoctorDashboard.jsx → assigned patients

AddTreatment.jsx

PatientHistory.jsx

LabResults.jsx → display lab files/reports

PDFReport.jsx → generate PDF of treatments

Admin

AdminDashboard.jsx → user management

AddUser.jsx, UserList.jsx

🛠 Tech Stack

Frontend: React.js, Bootstrap, React-Bootstrap, jsPDF

Backend: Node.js, Express.js, MySQL, Prisma optional

Authentication: JWT

File Storage: Local / AWS S3 (optional)

PDF Generation: jsPDF

⚡ Next Steps / TODOs

Implement pagination & filtering across modules

Integrate PDF generation for Doctor treatment reports (currently frontend only)

Add role-based dashboards for Lab & Admin

Optional: Deploy backend (Render/Heroku) and frontend (Vercel)
