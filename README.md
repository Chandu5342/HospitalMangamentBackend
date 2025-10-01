🏥 Hospital Management System (HMS) – Full Stack

This repository contains the Frontend (React.js) and Backend (Node.js + Express + MySQL) for a Hospital Management System. The system supports multiple roles: Admin, Reception, Doctor, and Lab Staff, with role-based access and secure authentication.

📂 Backend
Features

User authentication with JWT (Login only for this assessment, Registration managed by Admin)

Role-based access control (Admin, Doctor, Reception, Lab Staff)

Reception Module: Add patients, assign doctors, manage patient records, billing

Doctor Module: Dashboard, add treatment, view patient history (with pagination), view lab results

Lab Module: Upload lab results for patients

Admin Module: Manage users, view reports

REST APIs with proper error handling

Folder Structure
backend/
│── controllers/      # API route logic
│── db/               # Database connection (MySQL)
│── middleware/       # Auth & role middleware
│── models/           # DB queries for each module
│── routes/           # Express routes per module
│── server.js         # App entry point

Tech Stack

Node.js + Express.js

MySQL (Prisma ORM optional)

JWT Authentication

Cloud Storage (for lab results, e.g., AWS S3, optional)

PDF generation (frontend via jsPDF)

API Endpoints

Auth

POST /api/auth/login – Authenticate user, return JWT

Reception

POST /api/patients – Add patient

GET /api/patients – Get all patients (with optional search)

PUT /api/patients/assign – Assign doctor to patient

Doctor

GET /api/doctor/patients – Get patients assigned to logged-in doctor

POST /api/doctor/treatment – Add treatment record

GET /api/doctor/history/:patientId – Get patient treatment history (?page=&limit= optional)

GET /api/doctor/lab-results/:patientId – Get lab results for patient

Billing

POST /api/billing/:patientId – Create a bill

GET /api/billing/:patientId – Fetch patient bills

PUT /api/billing/:patientId/pay/:billId – Mark bill as paid

Admin

GET /api/admin/users – List users

POST /api/admin/users – Add user

PUT /api/admin/users/:id – Edit user

DELETE /api/admin/users/:id – Delete user

Deployment

Live Backend API (Render example): https://hospitalmangamentbackend.onrender.com

Run locally:

git clone <backend-repo-url>
cd backend
npm install
npm start

📂 Frontend
Features

React.js with React Bootstrap components

Role-based dashboards:

Reception: Manage patients, assign doctors, create/view bills

Doctor: Dashboard with assigned patients, treatment records, patient history, lab results

Lab: Upload lab reports

Admin: Manage users, dashboards

Pagination, search, and filtering for patients & treatments

PDF generation for bills/treatment reports using jsPDF

JWT authentication for API requests

Folder Structure
frontend/
│── api/              # Axios calls to backend APIs
│── components/       # React components for each module
│── context/          # Auth context for JWT
│── pages/            # Main dashboard pages
│── App.jsx           # Main App
│── main.jsx          # React entry
│── index.css         # Styling

Deployment

Live Frontend: Example https://hospitalfrontend.onrender.com

Run locally:

git clone <frontend-repo-url>
cd frontend
npm install
npm run dev

Screenshots / Demo

Patient Management

Doctor Dashboard

Billing PDF Generation

Lab Result Upload

Admin User Management

Admin Test Account

Use this account to test all modules:

Email: admin@hospital.com

Password: Admin123
