var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){


  socket.on('player_join', function(id){
    console.log('_Joined: '+id);
  });

  socket.on('test', function(){
    console.log('_test');
  });


});




io.on('test', function(){
  console.log('_test');
});

var port = 3000;

http.listen(port, function(){
  console.log('listening on *:'+port);
});
