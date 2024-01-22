const http = require('http');
const dbCollection = require('./Dbconnection');
const express = require("express");
io = require('socket.io');

const app = express();
app.use(express.json());

let currentRes = null;

app.get("/database/:id", (req, res)=>{
  sendCommands(req.params.id, "show dbs", 'test');
  currentRes = res;

})

let server = http.createServer(app);
server.listen(8080, ()=>{
  console.log("listening at port 8080");
});
io = io(server);
let peers = [];

// Add a connect listener
io.sockets.on('connection', function(socket)
{
  console.log('Client connected.');
  socket.emit("init", "init");
  socket.on("ack", (msg)=>{
    socket.join(msg)
    peers.push(msg);
    console.log("new node added " + msg);
    
  }); 

  socket.on("dbs", (dbs)=>{

    console.log(dbs);
    currentRes.status(200).send({db: dbs});
    currentRes = null;
  });
  // Disconnect listener
  socket.on('disconnect', function() {
  console.log('Client disconnected.');
  });
});



function sendCommands(peer, flag, data){
  io.sockets.in(peer).emit(flag, data);
}
