const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Array to store connected clients
let clients = [];

// Handle incoming socket connections
io.on('connection', socket => {
  console.log('New client connected:', socket.id);
  
  // Add new client to the list
  clients.push(socket.id);
  
  // Send the client list to all clients
  io.emit('updateClients', clients);

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    // Remove disconnected client from the list
    clients = clients.filter(client => client !== socket.id);
    
    // Send updated client list to all clients
    io.emit('updateClients', clients);
  });

  // Handle game actions from clients
  socket.on('gameAction', data => {
    // Broadcast the game action to all other clients
    socket.broadcast.emit('gameAction', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
