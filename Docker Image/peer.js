import { io } from "socket.io-client";
import dotenv from "dotenv";
import DbConnection from "./database.js";
import { v4 as uuidv4 } from 'uuid'

dotenv.config();

const id = uuidv4();


var socket = io.connect(`http://${process.env.IP}:${process.env.PORT}`, { reconnect: true });

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
  console.log("database intiztize");
  socket.emit("ack", id);
});


socket.on("show dbs", ()=>{
  console.log("sending dbs");
  dbConnection.getDatabases().then((data)=>{
    socket.emit("dbs", data);
  }).catch((error)=>{
    socket.emit("error", error);
  });
  
})