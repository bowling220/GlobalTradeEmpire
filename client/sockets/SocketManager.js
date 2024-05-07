import io from 'socket.io-client';

class SocketManager {
  constructor() {
    this.socket = io('http://localhost:3000'); // Replace with your server URL
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    this.socket.on('updateClients', clients => {
      console.log('Updated clients:', clients);
      // Update client list in UI or game state
    });
    this.socket.on('gameAction', data => {
      console.log('Received game action:', data);
      // Handle game action received from server
    });
  }

  sendGameAction(data) {
    this.socket.emit('gameAction', data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default SocketManager;
