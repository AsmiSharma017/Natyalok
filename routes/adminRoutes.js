

// import express from "express";
// const router = express.Router();

// import adminController from "../controllers/adminController.js";
// import { protect, authorize } from "../middleware/authMiddleware.js";

// router.get("/admin", protect, authorize("admin"), adminController.dashboard);
// router.get("/admin/users", protect, authorize("admin"), adminController.getUsers);
// router.get("/admin/movies", protect, authorize("admin"), adminController.getMovies);
// router.get("/admin/bookings", protect, authorize("admin"), adminController.getBookings);

// export default router;


import express from "express";
const router = express.Router();

import adminController from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

// ✅ CORRECT ROUTES
router.get("/dashboard", protect, authorize("admin"), adminController.dashboard);
router.get("/users", protect, authorize("admin"), adminController.getUsers);
router.get("/movies", protect, authorize("admin"), adminController.getMovies);
router.get("/bookings", protect, authorize("admin"), adminController.getBookings);

export default router;
