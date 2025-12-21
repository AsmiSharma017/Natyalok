// // app.js
// import express from "express";
// import https from "https";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import path from "path";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import movieRoutes from "./routes/movieRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import { initSeatSocket } from "./sockets/seatSocket.js";
// import { errorHandler } from "./middleware/errorMiddleware.js";
// import { incrementHomeVisits } from "./services/redisClient.js";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const app = express();

// // connect DB in tests & prod
// await connectDB();

// // view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   res.locals.user = req.user || null;
//   next();
// });

// // routes
// app.use("/auth", authRoutes);
// app.use("/movies", movieRoutes);
// app.use("/bookings", bookingRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/", userRoutes);
// app.use("/admin", adminRoutes);

// app.get("/about", (req, res) => {
//   res.render("pages/about", { user: req.user || null });
// });

// app.get("/", async (req, res, next) => {
//   try {
//     const visitCount = await incrementHomeVisits();
//     res.render("pages/index", { user: req.user || null, visitCount });
//   } catch (err) {
//     next(err);
//   }
// });

// app.use(errorHandler);

// // helper to create https server (used in prod & e2e tests)
// export function createHttpsServer() {
//   const httpsOptions = {
//     key: fs.readFileSync("./localhost-key.pem"),
//     cert: fs.readFileSync("./localhost.pem"),
//   };
//   const server = https.createServer(httpsOptions, app);
//   const io = initSeatSocket(server);

//   app.use((req, res, next) => {
//     req.io = io;
//     next();
//   });

//   return server;
// }


// app.js
import express from "express";
import https from "https";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { initSeatSocket } from "./sockets/seatSocket.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { incrementHomeVisits } from "./services/redisClient.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// connect DB (also used in tests)
await connectDB();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/bookings", bookingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

app.get("/about", (req, res) => {
  res.render("pages/about", { user: req.user || null });
});

app.get("/", async (req, res, next) => {
  try {
    const visitCount = await incrementHomeVisits();
    res.render("pages/index", { user: req.user || null, visitCount });
  } catch (err) {
    next(err);
  }
});

// error handler
app.use(errorHandler);

// helper to create https server (used in prod & e2e)
export function createHttpsServer() {
  const httpsOptions = {
    key: fs.readFileSync("./localhost-key.pem"),
    cert: fs.readFileSync("./localhost.pem"),
  };
  const server = https.createServer(httpsOptions, app);
  const io = initSeatSocket(server);

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  return server;
}
