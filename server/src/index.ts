import express from 'express';
import * as http from 'http'
import {Server, Socket} from "socket.io"
import * as dotenv from 'dotenv';
import {chats} from "./data/data"
import cors from "cors"

dotenv.config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT;

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  
  console.log("A user connected");
  io.emit("chat message", "Thanks for connecting");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (msg: string) => {
    console.log("event on server sent from client");
    
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

app.get('/', (req, res ) => {
  res.send('Chat application server http');
});

app.get('/api/chat', (req, res) => {
  res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find(c => c._id === req.params.id);
  res.send(singleChat);
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
