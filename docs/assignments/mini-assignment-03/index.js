var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Public Assets
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/templates/index.html');
});
app.get('/display', function(req, res){
  res.sendFile(__dirname + '/templates/display.html');
});
http.listen(8888, function(){
  console.log('listening on *:8888');
});
io.on('connection', function(socket){
  socket.on('color', function(msg){
    //CHECK if message send is a color
    var isOk  = /^#[0-9A-F]{6}$/i.test(msg)
    if(isOk){
      io.emit('color', msg);
    }
  });
});