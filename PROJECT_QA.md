🔹 1. Project Overview

Q1. What is the Natyalok project about?
Answer:
Natyalok is a backend system for a movie booking platform that supports user authentication, movie management, ticket booking, real-time seat allocation, admin operations, caching, logging, testing, and secure HTTPS communication.

Q2. What technologies are used in this project?
Answer:
Node.js, Express.js, MongoDB, Mongoose, JWT (JSON Web Tokens), Redis, Socket.IO, HTTPS, and Jest.

Q3. What type of architecture does this project follow?
Answer:
The project follows a layered / MVC-style architecture with clear separation of routes, controllers, models, middleware, and services.

🔹 2. Node.js & Express

Q4. Why was Node.js chosen for this project?
Answer:
Node.js is fast, scalable, non-blocking, and well-suited for real-time applications such as movie booking systems.

Q5. What role does Express.js play in the project?
Answer:
Express.js is used to build RESTful APIs, manage routing, handle middleware, and implement server-side logic.

Q6. What is middleware in Express?
Answer:
Middleware is a function that executes between the request and response cycle to perform tasks such as authentication, validation, and error handling.

🔹 3. Authentication & Authorization

Q7. How is authentication implemented in the project?
Answer:
Authentication is implemented using JWT (JSON Web Tokens).

Q8. What is JWT and why is it used?
Answer:
JWT is a token-based authentication mechanism that securely transfers user identity information between the client and the server.

Q9. Where is JWT verified in the project?
Answer:
JWT is verified in the authentication middleware before granting access to protected routes.

Q10. How is authorization handled?
Answer:
Authorization is handled using role-based access control to differentiate between admin and normal user permissions.

🔹 4. MongoDB & Mongoose

Q11. Why is MongoDB used instead of a SQL database?
Answer:
MongoDB is schema-flexible, scalable, and integrates naturally with JSON-based Node.js applications.

Q12. What is Mongoose?
Answer:
Mongoose is an Object Data Modeling (ODM) library that provides schema definition and simplifies interaction with MongoDB.

Q13. What collections exist in this project?
Answer:
Users, Movies, and Bookings.

Q14. How are relationships handled in MongoDB?
Answer:
Relationships are managed using ObjectId references between collections (for example, userId and movieId).

🔹 5. Booking System

Q15. How does the ticket booking process work?
Answer:
The user selects a movie, seat availability is checked, the booking is saved in the database, and real-time updates are sent to connected clients.

Q16. How is double seat booking prevented?
Answer:
Socket.IO is used for real-time seat locking and updates to ensure that a seat cannot be booked by multiple users simultaneously.

🔹 6. Socket.IO (Real-Time Communication)

Q17. Why is Socket.IO used in this project?
Answer:
Socket.IO enables real-time communication for seat availability and booking updates, preventing conflicts during ticket booking.

Q18. What is the difference between HTTP and WebSocket?
Answer:
HTTP follows a request–response model, whereas WebSocket enables continuous, real-time, bidirectional communication.

🔹 7. Redis (Caching)

Q19. Why is Redis used in the project?
Answer:
Redis is used for caching frequently accessed data and tracking visit counts to improve performance.

Q20. What are the advantages of Redis?
Answer:
High-speed in-memory storage, reduced database load, and improved application performance.

🔹 8. Admin Panel (Backend)

Q21. What functionalities does the admin panel provide?
Answer:
The admin panel allows management of movies, users, and bookings.

Q22. How is admin access restricted?
Answer:
Admin access is restricted using role-based authorization enforced through middleware.

🔹 9. Error Handling & Logging

Q23. How are errors handled globally in the project?
Answer:
Errors are handled using centralized error-handling middleware.

Q24. Why is logging important?
Answer:
Logging helps in debugging, monitoring system behavior, and tracking production issues.

Q25. Where are logs stored?
Answer:
Logs are stored in a dedicated logs directory, specifically in an error.log file.

🔹 10. HTTPS & Security

Q26. Why is HTTPS used instead of HTTP?
Answer:
HTTPS encrypts data in transit and protects the application from man-in-the-middle attacks.

Q27. What are PEM files used for?
Answer:
PEM files store SSL certificates and private keys required for HTTPS communication.

🔹 11. Testing

Q28. What testing framework is used in the project?
Answer:
Jest is used as the testing framework.

Q29. Why is testing important?
Answer:
Testing ensures application correctness, reliability, and helps prevent future regressions.

🔹 12. Environment & Configuration

Q30. Why are environment variables used?
Answer:
Environment variables protect sensitive information such as database URLs and secret keys.

Q31. What is dotenv?
Answer:
dotenv is a library used to load environment variables from a .env file into the application.
