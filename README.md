📌 Project Features

User authentication using JSON Web Tokens (JWT)

Role-based access control for Admin and User roles

Movie management system

Ticket booking with real-time seat allocation

Backend admin panel for managing movies, users, and bookings

Redis caching to improve performance and reduce database load

Real-time communication using Socket.IO

Centralized error handling and logging mechanism

Secure HTTPS configuration using SSL certificates

Unit and integration testing using Jest

🏗 Project Architecture

This project follows a layered / MVC-style architecture, ensuring clear separation of concerns and maintainability.

Routes – Define API endpoints and handle request routing

Controllers – Contain business logic and request handling

Models – Define MongoDB schemas using Mongoose

Middleware – Handle authentication, authorization, and error processing

Services – Manage Redis caching and reusable logic

Sockets – Handle real-time seat booking and updates

Utilities – Provide helper functions and shared logic

📁 Folder Structure
Natyalok/
├── config/          # Database and environment configuration
├── controllers/     # Application business logic
├── models/          # MongoDB schemas
├── routes/          # API route definitions
├── middleware/      # Authentication and error handling
├── services/        # Redis and caching logic
├── sockets/         # Real-time seat booking
├── utils/           # Helper and utility functions
├── logs/            # Application logs
├── tests/           # Unit and integration tests
├── app.js           # Application entry point
└── README.md        # Project documentation

🔐 Security Practices

JWT-based authentication mechanism

Role-based authorization using middleware

Secure handling of sensitive data through environment variables

HTTPS enabled using SSL certificates

Centralized error handling to prevent information leakage

🧪 Testing

Unit and integration testing implemented using Jest

Ensures reliability, correctness, and maintainability of the application

📘 Additional Documentation

Project Q&A: PROJECT_QA.md

This document contains detailed technical and conceptual questions related to the project, useful for interviews, viva, and project evaluations.
