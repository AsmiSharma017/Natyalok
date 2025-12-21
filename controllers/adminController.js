


// import User from "../models/User.js";
// import Movie from "../models/Movie.js";
// import Booking from "../models/Booking.js";

// const dashboard = async (req, res) => {
//   // Fetch counts for dashboard
//   const usersCount = await User.countDocuments();
//   const moviesCount = await Movie.countDocuments();
//   const bookingsCount = await Booking.countDocuments();

//   res.render("admin/dashboard", {
//     users: usersCount,
//     movies: moviesCount,
//     bookings: bookingsCount,
//   });
// };

// const getUsers = async (req, res) => {
//   const users = await User.find();
//   res.render("admin/users", { users });
// };

// const getMovies = async (req, res) => {
//   const movies = await Movie.find();
//   res.render("admin/movies", { movies });
// };

// const getBookings = async (req, res) => {
//   const bookings = await Booking.find();
//   res.render("admin/bookings", { bookings });
// };

// export default {
//   dashboard,
//   getUsers,
//   getMovies,
//   getBookings,
// };
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Booking from "../models/Booking.js";

const dashboard = async (req, res) => {
  const usersCount = await User.countDocuments();
  const moviesCount = await Movie.countDocuments();
  const bookingsCount = await Booking.countDocuments();

  res.render("admin/dashboard", {
    users: usersCount,
    movies: moviesCount,
    bookings: bookingsCount,
    user: req.user            // ✅ ADD
  });
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.render("admin/users", {
    users,
    user: req.user            // ✅ ADD
  });
};

const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.render("admin/movies", {
    movies,
    user: req.user            // ✅ ADD
  });
};

const getBookings = async (req, res) => {
    const bookings = await Booking.find()
      .populate("user", "name email")   // 👈 REQUIRED
      .populate("movie", "title");      // 👈 REQUIRED
  
    res.render("admin/bookings", {
      bookings,
      user: req.user
    });
  };
  
export default {
  dashboard,
  getUsers,
  getMovies,
  getBookings,
};

