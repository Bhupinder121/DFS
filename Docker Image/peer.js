import { io } from "socket.io-client";
import dotenv from "dotenv";
import DbConnection from "./database.js";
// Connect to server

dotenv.config();

var socket = io.connect("http://localhost:8080", { reconnect: true });

// Add a connect listener
socket.on("connect", function (socket) {
  console.log("Connected!");
});

let dbConnection;
socket.on("init", (msg) => {
  dbConnection = new DbConnection(
    process.env.HOST,
    process.env.USER,
    process.env.PASSWORD
  );
  
  socket.emit("ack", "connection is established");
});


socket.on("show dbs", ()=>{
  console.log("sending dbs");
  dbConnection.getDatabases().then((data)=>{
    socket.emit("dbs", data);
  }).catch((error)=>{
    socket.emit("error", error);
  });
  
})