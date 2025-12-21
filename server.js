
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
// server.js - FIXED for Render + HTTPS

// server.js - COMPLETE NATYALOK MOVIE BOOKING SYSTEM
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seats: [String],
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Admin Middleware (demo - bypass for now)
const requireAdmin = (req, res, next) => {
  req.user = { role: 'admin' }; // Demo bypass
  next();
};

// Routes

// Home/Dashboard
app.get('/', async (req, res) => {
  try {
    const [users, movies, bookings] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments(),
      Booking.countDocuments()
    ]);
    res.render('dashboard', { users, movies, bookings });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Admin Routes
app.get('/admin/dashboard', requireAdmin, async (req, res) => {
  try {
    const [users, movies, bookings] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments(),
      Booking.countDocuments()
    ]);
    res.render('admin/dashboard', { users, movies, bookings });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/admin/users', requireAdmin, async (req, res) => {
  const users = await User.find({});
  res.render('admin/users', { users });
});

app.post('/admin/users/:id/update', requireAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/users');
});

app.post('/admin/users/:id/delete', requireAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/admin/users');
});

app.get('/admin/movies', requireAdmin, async (req, res) => {
  const movies = await Movie.find({});
  res.render('admin/movies', { movies });
});

app.post('/admin/movies/create', requireAdmin, async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.redirect('/admin/movies');
});

app.post('/admin/movies/:id/update', requireAdmin, async (req, res) => {
  await Movie.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/movies');
});

app.post('/admin/movies/:id/delete', requireAdmin, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/admin/movies');
});

app.get('/admin/bookings', requireAdmin, async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user')
    .populate('movie');
  res.render('admin/bookings', { bookings });
});

app.post('/admin/bookings/:id/update', requireAdmin, async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.redirect('/admin/bookings');
});

app.post('/admin/bookings/:id/delete', requireAdmin, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.redirect('/admin/bookings');
});

// 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Render Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Natyalok LIVE on port ${PORT}`);
});
