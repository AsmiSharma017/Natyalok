





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




// sockets/seatSocket.js - HTTP POLLING FOR RENDER FREE
import { Server } from "socket.io"; // Keep for compatibility

// In-memory seat storage (per movie)
const seatLocks = new Map(); // movieId -> { seatLabel: userId }

export const initSeatSocket = (server) => {
  // Fake socket.io for Render compatibility
  const io = {
    emit: (event, data) => console.log('FAKE SOCKET:', event, data)
  };

  // HTTP Polling endpoints for seat management
  server.app.use('/api/seats/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    
    if (req.method === 'GET') {
      // Get available seats
      res.json({
        seats: Object.keys(seatLocks.get(movieId) || {}),
        locks: Array.from((seatLocks.get(movieId) || {}).entries())
      });
    } else if (req.method === 'POST') {
      const { action, seats, userId } = req.body; // action: 'lock', 'unlock', 'book'
      
      if (!seatLocks.has(movieId)) seatLocks.set(movieId, {});
      const movieSeats = seatLocks.get(movieId);
      
      seats.forEach(seat => {
        if (action === 'lock' || action === 'book') {
          movieSeats[seat] = userId;
        } else if (action === 'unlock') {
          delete movieSeats[seat];
        }
      });
      
      seatLocks.set(movieId, movieSeats);
      res.json({ success: true });
    }
  });

  return io;
};
