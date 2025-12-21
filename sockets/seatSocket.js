





// // sockets/seatSocket.js
// import { Server } from "socket.io";

// /*
// Simple seat lock/unlock broadcast management.
// Clients emit:
//   socket.emit('seat:lock', { movieId, seats: ['A1'], userId })
//   socket.emit('seat:unlock', { movieId, seats: ['A1'], userId })
// Server broadcasts to room `movie:${movieId}`:
//   io.to(`movie:${movieId}`).emit('seat:update', { seats, type, by: userId })
// */

// export const initSeatSocket = (server) => {
//   const io = new Server(server);

//   io.on("connection", (socket) => {
//     // Join movie room for this session
//     socket.on("join:movie", ({ movieId }) => {
//       socket.join(`movie:${movieId}`);
//     });

//     socket.on("seat:lock", ({ movieId, seats, userId }) => {
//       io.to(`movie:${movieId}`).emit("seat:update", {
//         type: "lock",
//         seats,
//         by: userId
//       });
//     });

//     socket.on("seat:unlock", ({ movieId, seats, userId }) => {
//       io.to(`movie:${movieId}`).emit("seat:update", {
//         type: "unlock",
//         seats,
//         by: userId
//       });
//     });
//     socket.on("seat:book", ({ movieId, seats, userId }) => {
//         io.to(`movie:${movieId}`).emit("seat:update", {
//           type: "book",
//           seats,
//           by: userId
//         });
//       });
      

//     socket.on("disconnect", () => {
//       // Optionally handle cleanup
//     });
//   });

//   return io;
// };




// sockets/seatSocket.js - RENDER HTTP POLLING (FIXED)
import express from 'express'; // ✅ ADD THIS IMPORT

const seatLocks = new Map(); // movieId -> { seat: userId }

export const initSeatSocket = (server) => {
  // HTTP seat endpoints - RENDER READY
  server.app.use('/api/seats/:movieId', express.json(), (req, res) => {
    const movieId = req.params.movieId;
    
    if (!seatLocks.has(movieId)) seatLocks.set(movieId, {});
    const movieSeats = seatLocks.get(movieId);

    if (req.method === 'GET') {
      res.json({ locks: Object.entries(movieSeats) });
    } else if (req.method === 'POST') {
      const { action, seats, userId } = req.body;
      seats.forEach(seat => {
        if (action === 'lock' || action === 'book') {
          movieSeats[seat] = userId;
        } else {
          delete movieSeats[seat];
        }
      });
      seatLocks.set(movieId, movieSeats);
      res.json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  });

  // Fake io for Render (no WebSocket needed)
  const io = { emit: () => {} };
  return io;
};
