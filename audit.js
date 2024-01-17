// Load requirements
var http = require('http');
var mongo = require('mongodb');
io = require('socket.io');

// Create server & socket
var server = http.createServer();
server.listen(8080);
io = io(server);

// Add a connect listener
io.sockets.on('connection', function(socket)
{
  console.log('Client connected.');
  socket.emit("init", "init");
  socket.on("ack", (msg)=>{
    console.log("new node added");
  }); 

  socket.on("dbs", (dbs)=>{
    console.log(dbs);
  });

  

  // Disconnect listener
  socket.on('disconnect', function() {
  console.log('Client disconnected.');
  });
});