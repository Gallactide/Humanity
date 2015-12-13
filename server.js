var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/src.js', function(req, res){
  res.sendfile('src.js');
});

app.get('/cards.js', function(req, res){
  res.sendfile('cards.js');
});

io.on('connection', function(socket){
  console.log("NEW CONNECTION");

  //Core
  socket.on('join', function(id){
    console.log(id+' Joined');
    io.emit('join', id);
  });

  //Players
  socket.on('point', function(id){
    io.emit('point', id);
    console.log(id+" earned a point.")
  })

  socket.on('ping', function(data){
    console.log('pinged: '+data);
    io.emit('ping', {for:'everyone'});
  });

  socket.on('submit answer', function(answer, id){
    console.log(id+" answered '"+answer+"'");
  });

  socket.on('submit question', function(answer, id){
    console.log(id+" asked '"+answer+"'")
  });
});

var port = 3000;

http.listen(port, function(){
  console.log('listening on *:'+port);
});
