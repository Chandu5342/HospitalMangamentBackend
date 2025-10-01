# Hospital Management System Backend

This is the backend API for the Hospital Management System built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

## Features

* **User authentication**

  * Signup/Login with JWT
  * Role-based access control (`admin`, `doctor`, `reception`, `lab`)
* **Admin Module**
  * Add, update, list, and remove users
  * add full and paginated,filters for the userlist
  * Dashboard statistics (patients, doctors,reception,lab)
* **Receiption Management**
  * Add patients
  * Assign doctors
  * Fetch patient details(full and paginated,filters)
  * Billing  (create bill, fetch bills, pay)
* **Doctor Module**
  * Fetch assigned patients
  * Add treatment records
  * View patient history (full and paginated,filters)
  * Access lab results for patients
* **Lab Module**
  * Upload lab results
  * Fetch lab results for patients (full and paginated,filters)
* **File Uploads**
  * Serve uploaded files from `/uploads` folder
* **Middleware**
  * JWT authentication
  * Role-based authorization
---

## Folder Structure

```
backend/
│── controllers/    # API business logic
│── middleware/     # Auth and role-based middleware
│── models/         # Database models
│── routes/         # API endpoints
│── uploads/        # Uploaded files
│── app.js          # Express app setup
│── server.js       # Server entry point
│── .env            # Environment variables
```

---

## Tech Stack

* Node.js + Express
* Mysql
* JWT Authentication
* bcrypt.js for password hashing
* File storage: Local `/uploads` folder(multer)
* dotenv for database configuration

## DB configuration (use phpmyadmin)
DB_HOST=sql12.freesqldatabase.com 
DB_USER=sql12800854
DB_PASSWORD=87KppxHxsi
DB_NAME=sql12800854
PORT=5000
JWT_SECRET=secret


## API Endpoints

### Auth

| Method | Endpoint           | Description             | Roles |
| ------ | ------------------ | ----------------------- | ----- |
| POST   | `/api/auth/signup` | Register a new user     | All   |
| POST   | `/api/auth/login`  | Login user, returns JWT | All   |

---

### Admin Routes

| Method | Endpoint                   | Description         | Roles            |
| ------ | -------------------------- | ------------------- | ---------------- |
| POST   | `/api/admin/users`         | Add new user        | admin            |
| GET    | `/api/admin/users`         | List users          | admin, reception |
| PUT    | `/api/admin/users/:userId` | Update user info    | admin            |
| DELETE | `/api/admin/users/:userId` | Delete user         | admin            |
| GET    | `/api/admin/dashboard`     | Get dashboard stats | admin, reception |

---

### Patient Routes

| Method | Endpoint               | Description                            | Roles                    |
| ------ | ---------------------- | -------------------------------------- | ------------------------ |
| GET    | `/api/patients`        | Fetch all patients (filters supported) | reception, doctor, admin |
| POST   | `/api/patients`        | Add a new patient                      | reception, admin         |
| PUT    | `/api/patients/assign` | Assign doctor to patient               | reception, admin         |

---

### Doctor Routes

| Method | Endpoint                                   | Description                         | Roles  |
| ------ | ------------------------------------------ | ----------------------------------- | ------ |
| GET    | `/api/doctor/patients`                     | Get assigned patients (with search) | doctor |
| POST   | `/api/doctor/treatment`                    | Add treatment record                | doctor |
| GET    | `/api/doctor/history/:patientId`           | Get full patient history            | doctor |
| GET    | `/api/doctor/history/:patientId/paginated` | Get paginated patient history       | doctor |
| GET    | `/api/doctor/lab-results/:patientId`       | Get lab results for patient         | doctor |

---

### Billing Routes

| Method | Endpoint                               | Description                 | Roles                    |
| ------ | -------------------------------------- | --------------------------- | ------------------------ |
| POST   | `/api/billings/:patientId`             | Create a bill               | reception, admin         |
| GET    | `/api/billings/:patientId`             | Fetch all bills for patient | reception, doctor, admin |
| POST   | `/api/billings/:patientId/:billId/pay` | Pay a bill                  | reception, admin         |

---

### Lab Routes

| Method | Endpoint              | Description               | Roles              |
| ------ | --------------------- | ------------------------- | ------------------ |
| POST   | `/api/lab/upload`     | Upload lab report         | lab                |
| GET    | `/api/lab/:patientId` | Fetch patient lab results | lab, doctor, admin |

---

### File Uploads

* Uploaded files are served via:

```
http://localhost:5000/uploads/<file-name>
```

---

## Live Backend
  Diployed on render platform
* [Hospital Management System API](https://hospitalmangamentbackend.onrender.com)

---

## Test Accounts

| Role      | Email                                             | Password |
| --------- | ------------------------------------------------- | -------- |
| Admin     | [admin@gmail.com](mailto:admin@gmail.com)         | 123456   |
| Doctor    | [doctor@gmail.com](mailto:doctor1@gmail.com)     | 123456   |
| Reception | [reception@gmail.com](mailto:reception@gmail.com) | 123456   |
| Lab | [lab@gmail.com](mailto:lab@gmail.com) | 123456   |

---

## Run Locally

```bash
git clone (https://github.com/Chandu5342/HospitalMangamentBackend.git)
cd backend
npm install
npm run dev
``

Server will run on: `http://localhost:5000`
