import http from 'http';
import { WebSocketServer  } from "ws" ;

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  console.log('Client connecté');
  socket.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      const { type, data } = parsed;

      console.log("Type:", type);
      console.log("Données reçues:", data);
      // Si c’est une initialisation, on stocke l'idSport
      if (type == 'init') {
        socket.sportId = data.targetSportId; 
        console.log(`Client assigné au sportId ${socket.sportId}`);
        return;
      }
      
      if (type == 'message') {
        if (data.comment[0].sport_who_comment !== data.targetSportId) return
        wss.clients.forEach((client) => {
        if (client.readyState === 1 && client.sportId === data.targetSportId) {
            client.send(JSON.stringify({ type, data: [data.comment[0]] }));
          }
        });

      }
      
    } catch (e) {
      console.error("Erreur de parsing message JSON:", e);
    }
  });



  

  socket.on('close', () => console.log('Client déconnecté'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`WebSocket server running on port ${PORT}`));
