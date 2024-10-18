"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server);
var port = process.env.PORT;
io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("disconnect", function () {
        console.log("User disconnected");
    });
    socket.on("chat message", function (msg) {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
});
app.get('/', function (req, res) {
    res.send('Chat application server http');
});
server.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
