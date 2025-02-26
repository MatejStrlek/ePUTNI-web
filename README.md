# ePUTNI Web - Digital Travel Warrant Management System (Web Application)

## About the Project
**ePUTNI Web** is a web-based component of the **ePUTNI** system, a software solution designed to digitize and automate the travel warrant process for student association [eSTUDENT](https://www.estudent.hr). The web application enables the finance and accounting team to review, approve, and manage travel warrants submitted through the [mobile app - ePUTNI](https://github.com/MatejStrlek/ePUTNI).

This project was developed as part of a final thesis at **Algebra University** by **Matej Galić**, under the mentorship of **Danijel Kučak**.

## Features
- **Web Application for Finance Team**
  - Secure login using Google Authentication
  - Review and approve travel warrants
  - View detailed warrant information and scanned receipts
  - Filter and manage travel warrants by user
  - Generate travel warrant reports in PDF format

- **Cloud-based Backend**
  - Real-time synchronization with mobile application data
  - Secure authentication and data management

## Modules
- **Authentication Module:** Handles user login via Google Authentication, ensuring only authorized users can access the system
- **Travel Warrant Review Module:** Allows finance team members to view and approve/reject submitted travel warrants
- **Receipt Management Module:** Displays receipts uploaded by mobile app users and enables their validation
- **Data Synchronization Module:** Ensures real-time updates between the mobile app and web application
- **PDF Generation Module:** Generates travel warrant reports for record-keeping and auditing

## Technologies Used
- **Frontend:** React.js
- **Backend:** Firebase Authentication, Firestore Database, Firebase Cloud Functions
- **Development Tools:** Visual Studio Code
