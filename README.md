# MediCare Plus 

MediCare Plus is a role-based healthcare web application developed to support Administrators, Doctors, and Patients within a centralized digital healthcare environment.

This project was developed as an academic assignment for the **Web Application Development Module** at my campus.

---

## Project Overview

MediCare Plus provides an integrated platform where:

- Patients can register, search for doctors, book appointments, access medical reports, communicate securely with doctors, and submit feedback and ratings.
- Doctors can manage schedules, view appointments, respond to patient messages, and upload patient medical reports.
- Administrators can oversee system operations, manage users, control services, and maintain overall data integrity.

The system ensures structured access control using a role-based navigation system, improving clarity and usability for each type of user.

---

## User Roles & Functionalities

### Patient
- Online registration and login
- Search for doctors
- Book and manage appointments
- Access medical reports
- Send secure messages to doctors
- Submit feedback and ratings
- View health tips

### Doctor
- Manage appointment schedules
- View patient bookings
- Respond to patient messages
- Upload and manage medical reports

### Administrator
- Manage users (Doctors & Patients)
- Oversee appointments
- Manage services
- Maintain system operations

---

## Access Control

The application uses a **role-based redirection system**:

- Each user is redirected to their respective dashboard after login.
- Users can only access features relevant to their role.
- Unauthorized access attempts redirect users to the login page with an alert message.
- Restricted services (appointments, reports, messaging) are accessible only to logged-in users.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- XAMPP (Apache Server & phpMyAdmin)
- VS Code

---

##  Database

The system uses a MySQL database to manage:
- User accounts
- Appointments
- Medical reports
- Messages
- Feedback & ratings

The SQL database file (`NediCare_Plus.sql`) is located in the root directory of the project.
---

## How to Run the Project

1. Install XAMPP
2. Place the project folder inside:
3. Start Apache and MySQL from XAMPP Control Panel
4. Import the SQL file into phpMyAdmin
5. Open browser and navigate to: http://localhost/MediCare-Plus/


---

##  Academic Context

This project was developed as part of the **Web Application Development Module** for academic assessment purposes.

---

## Developed By

Anjana Dew


