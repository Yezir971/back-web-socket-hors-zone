import http from 'http';

import { WebSocketServer } from 'ws';


const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  console.log('Client connecté');

  socket.on('message', (message) => {
    console.log(`Message reçu : ${message}`);
    socket.send(`Echo: ${message}`);
  });

  socket.on('close', () => console.log('Client déconnecté'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`WebSocket server running on port ${PORT}`));
