# 🩺 RuralCare  
### Web-Based Telemedicine Platform for Rural Healthcare

![Status](https://img.shields.io/badge/Status-Under%20Development-blue)
![Tech](https://img.shields.io/badge/Tech-MERN-green)
![License](https://img.shields.io/badge/License-MIT-orange)


📌 Overview

RuralCare is a full-stack telemedicine platform designed to improve healthcare accessibility in rural areas.

The current implementation focuses on building a secure authentication system, scalable backend architecture, and frontend integration, forming the foundation for future telemedicine modules.

🏗 Project Structure
RuralCare/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
✨ Implemented Features
🔐 Authentication Module

Patient registration with bcrypt password hashing

Secure login using JWT authentication

Role-based token generation

Protected dashboard rendering

MongoDB-based user data storage

🛠 Tech Stack

Frontend:

React.js

CSS

Fetch API

Backend:

Node.js

Express.js

MongoDB Atlas

JWT Authentication

bcrypt

Tools:

Git

GitHub

🏗 System Architecture

Client (Browser)
↓
React Frontend
↓
Express REST API
↓
MongoDB Database

🚀 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/RuralCare.git
cd RuralCare
2️⃣ Backend Setup
cd backend
npm install
npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm start
🔐 Environment Variables

Create a .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
📈 Future Enhancements

Appointment booking system

Chat-based consultation

Digital prescription module

Admin dashboard
