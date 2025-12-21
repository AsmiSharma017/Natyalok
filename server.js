
// import express from "express";
// import https from "https";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import path from "path";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// // imports from modules
// import connectDB from "./config/db.js"; // connect to MongoDB

// // all endpoints
// import authRoutes from "./routes/authRoutes.js";
// import movieRoutes from "./routes/movieRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// // WebSocket for live seat updates
// import { initSeatSocket } from "./sockets/seatSocket.js";

// // global error catching
// import { errorHandler } from "./middleware/errorMiddleware.js";

// // Redis counter done on home page
// import { incrementHomeVisits } from "./services/redisClient.js";


// // Load environment variables
// dotenv.config();

// // Initialize __dirname and __filename
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Make express app
// const app = express();

// // Connect to MongoDB
// await connectDB();

// // Load local certificate using mkcert
// const httpsOptions = {
//   key: fs.readFileSync("./localhost-key.pem"),
//   cert: fs.readFileSync("./localhost.pem"),
// };

// // Create HTTPS server
// const server = https.createServer(httpsOptions, app);

// // Initialize socket.io
// const io = initSeatSocket(server);

// // Attach io to req
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // View engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // 🔽 ADD EXACTLY HERE
// app.use((req, res, next) => {
//   res.locals.user = req.user || null;
//   next();
// });


// // Routes
// app.use("/auth", authRoutes);
// app.use("/movies", movieRoutes);
// app.use("/bookings", bookingRoutes);       // web
// app.use("/api/bookings", bookingRoutes);   // API
// app.use("/", userRoutes);
// app.use("/admin", adminRoutes);            // admin routes under /admin

// // About page
// app.get("/about", (req, res) => {
//   res.render("pages/about", { user: req.user || null });
// });

// // Homepage visit counter
// app.get("/", async (req, res, next) => {
//   try {
//     const visitCount = await incrementHomeVisits();
//     res.render("pages/index", { user: req.user || null, visitCount });
//   } catch (err) {
//     next(err);
//   }
// });

// // Error handler
// app.use(errorHandler);

// // Start HTTPS server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`🔒 HTTPS server running at https://localhost:${PORT}`);
// });


// server.js
import dotenv from "dotenv";
import { createHttpsServer } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = createHttpsServer();

server.listen(PORT, () => {
  console.log(`🔒 HTTPS server running at https://localhost:${PORT}`);
});

export default server;
