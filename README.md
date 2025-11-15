🐾 Pet Marketplace – Frontend

A modern MERN-based pet marketplace web app built with React, featuring user authentication (Signup/Login) and Google OAuth integration via Passport.js.

🚀 Features

✅ User signup and login
✅ Google login (OAuth 2.0)
✅ Protected routes (dashboard, user profile, etc.)
✅ Axios-based API communication
✅ Context-based authentication state (React Context)
✅ Responsive UI built with React Router and TailwindCSS

🧱 Project Structure
frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Footer.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── SellPet.jsx
│   │   └── PetDetail.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── axiosInstance.js
│
├── .env
├── package.json
└── vite.config.js

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/yourusername/pet-marketplace-frontend.git
cd pet-marketplace-frontend

2️⃣ Install dependencies
npm install

3️⃣ Create environment file

Create a .env file in the root directory and add:

VITE_BACKEND_URL=http://localhost:9000


This should point to your backend server.

4️⃣ Start the development server
npm run dev


The app will start at
👉 http://localhost:5173

🔐 Google Login Flow (How It Works)
Step-by-step process:

User clicks “Continue with Google” in the React app.

The frontend redirects to:

window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/google`;


The backend (via Passport.js) sends the user to Google’s OAuth screen.

Google authenticates the user and redirects to your backend callback route:
http://localhost:9000/api/v1/users/google/callback

The backend:

Checks if the user exists or creates a new user

Generates a JWT token

Sends it back as JSON { token, user }

The frontend receives the token via Axios and saves it in localStorage.

The user stays logged in for all protected routes.

🔑 Example: Axios setup for authentication
// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;


Usage example:

import axios from "../axiosInstance";

const res = await axios.post("/api/v1/users/login", {
  email,
  password,
});

🔄 Example: Google Login Button
import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;

🧠 Tech Stack

Frontend:

React (Vite)

React Router

Axios

Context API

TailwindCSS / CSS Modules

Backend:

Node.js + Express

MongoDB + Mongoose

Passport.js (Google OAuth)

JWT Authentication

📁 Related Backend Repo

👉 Pet Marketplace Backend

Contains the Express + Passport + MongoDB logic for handling Google OAuth and JWT authentication.

💡 Future Enhancements

Pet listing and filtering

Seller dashboard and analytics

Secure image uploads (Cloudinary or Firebase)

Passwordless login with Google only

Role-based access (admin / seller / buyer)
