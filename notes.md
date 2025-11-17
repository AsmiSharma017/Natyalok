## This file contains all the notes related to the code - all of this is hand written

# This is the directory structure

config/
    └── db.js
controllers/
    ├── authController.js
    ├── bookingController.js
    ├── movieController.js
    └── userController.js
logs/
    └── error.log
middleware/
    ├── authMiddleware.js
    └── errorMiddleware.js
models/
    ├── Booking.js
    ├── Movie.js
    └── User.js
node_modules/-this was a lot so didnt paste it
 
            ├── package.json
            └── README.md
        
    └── .package-lock.json
public/
    ├── css/
        └── styles.css
    └── js/
        ├── cache.js
        ├── moviesCache.js
        └── seatSelection.js
routes/
    ├── authRoutes.js
    ├── bookingRoutes.js
    ├── movieRoutes.js
    └── userRoutes.js
scripts/
    └── seedMovies.js
services/
    ├── omdbApi.js
    ├── paymentService.js
    └── redisClient.js
sockets/
    └── seatSocket.js
utils/
    ├── emailService.js
    ├── generateToken.js
    └── pdfGenerator.js
views/
    ├── pages/
        ├── about.ejs
        ├── error.ejs
        ├── home.ejs
        ├── index.ejs
        ├── login.ejs
        ├── movies.ejs
        ├── profile.ejs
        ├── register.ejs
        └── seats.ejs
    └── partials/
        ├── footer.ejs
        └── header.ejs
.env
.gitignore
everything.txt
localhost-key.pem
localhost.pem
notes.md
package-lock.json
package.json
server.js.  






# Syllabus for ce2


Deep dive into authentication and authorization in Express.js, JWT implementation, WebSocket integration, and connecting Express.js with MongoDB. Introduction to version control using Git and GitHub. Relational databases including PostgreSQL and MariaDB (I & II), followed by NoSQL databases such as MongoDB, InfluxDB, Neo4j, and Redis. Database scaling strategies including indexes, sharding, and replication. Covers client-side and server-side caching (Redis), and web security practices including MD5, SHA, HTTPS, and TLS




## Definitions of ce2 syllabus

#  1. Authentication vs Authorization
Authentication

 Verifying who the user is.
(Example: login with email/password)

Authorization

Verifying what the user can access.
(Example: admin can add movies, user cannot) // admin thing is not in our project as of now



# 2. JWT (JSON Web Token)

A secure, signed token stored in cookies or headers used to verify user identity on every request.


# 3. Express.js

A Node.js framework used to build APIs and web servers.

# 4. MongoDB

A NoSQL database that stores documents (JSON-like objects).

# 5. Redis

An in-memory database used for:

Caching

Sessions

Rate limiting

Login attempt limits

Counters

In our project it is used for login attempt limits and counters.


# 6. WebSockets

A protocol that enables real-time communication between client & server.

In our project:
 Used for seat locking during movie seat selection.

# 7. HTTPS & TLS

HTTPS

Full form: HyperText Transfer Protocol Secure
Easy meaning:
It is the safe version of HTTP.
It makes sure the data you send to a website is protected so nobody can read or change it.

TLS

Full form: Transport Layer Security
Easy meaning:
It is the security system that encrypts (locks) your data when you use HTTPS.
So when your browser talks to a website, TLS makes the conversation private and safe.


# 8. Git & Github

Git

Git is a version control system.
It helps you save different versions of your code and track changes over time.

GitHub

Git + Hub (a place to host code)
GitHub is a website where you can store your Git projects online, share them, and work with others.



# 9. Relational Databases (PostgreSQL, MariaDB)

Store data in tables, rows, columns (SQL databases). -> not used in our project


