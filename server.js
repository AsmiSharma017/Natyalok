




//the notes are all handwritten 

//basic imports 
import express from "express";
import https from "https";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



//imports from modules 
import connectDB from "./config/db.js"; // connect to MongoDB
// all endpoints
import authRoutes from "./routes/authRoutes.js"; 
import movieRoutes from "./routes/movieRoutes.js"; 
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//WebSocket for live seat updates
import { initSeatSocket } from "./sockets/seatSocket.js";

//global error catching
import { errorHandler } from "./middleware/errorMiddleware.js";

//Redis counter done on home page
import { incrementHomeVisits } from "./services/redisClient.js";


//it allows us to use environment variables from a .env file
dotenv.config();


//we are initializing path since es modueles do not have __dirname and __filename by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connecting to mongodb
await connectDB();

//made express app
const app = express();

//loading local certificate using mkcert (I (Asmi) used it for mac)
const httpsOptions = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

// Create HTTPS server
const server = https.createServer(httpsOptions, app);

// Initialize socket.io-This sets up WebSocket communication using Socket.io on your HTTPS server.
const io = initSeatSocket(server);

// Attach io to req for controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// View engine, this mean we are telling express that we are using ejs
app.set("view engine", "ejs");
//this means my ejs files are stored in the views folder
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // to parse URL-encoded bodies
app.use(cookieParser()); // to parse cookies
app.use(express.static(path.join(__dirname, "public")));  // to serve static files

// Routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/bookings", bookingRoutes);       // web
app.use("/api/bookings", bookingRoutes);   // API
app.use("/", userRoutes);

//about page
app.get("/about", (req, res) => {
  res.render("pages/about", { user: req.user || null });
});



// homepage visit counter - Redis increments visits each reload.
app.get("/", async (req, res) => {
  const visitCount = await incrementHomeVisits();
  res.render("pages/index", { user: req.user || null, visitCount });
});


// Error handler
app.use(errorHandler);

// Start HTTPS server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🔒 HTTPS server running at https://localhost:${PORT}`);
});
