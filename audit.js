// Load requirements
var http = require('http'),
io = require('socket.io');

// Create server & socket
var server = http.createServer();
server.listen(8080);
io = io(server);

// Add a connect listener
io.sockets.on('connection', function(socket)
{
  console.log('Client connected.');

  // Disconnect listener
  socket.on('disconnect', function() {
  console.log('Client disconnected.');
  });
});