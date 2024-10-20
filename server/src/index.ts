import express from 'express';
import * as http from 'http'
import {Server, Socket} from "socket.io"
import * as dotenv from 'dotenv';
import cors from "cors"
import connectDB from './config/db';
import userRouter from "./routes/userRoute"
import chatRouter from "./routes/chatRouter"
import { errorHandler, notFound } from './middlewares/errorMiddleware';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
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

app.use('/api/user', userRouter);
app.use('/api/chats', chatRouter)

app.use(notFound)
app.use(errorHandler)

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
