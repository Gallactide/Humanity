var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {});
var path = require('path');

var MAX_ROOMS = 10;
var VERBOSE = false;

var names = [];
var rooms = [];
var room;

app.get('/room/:roomName', function(req, res){
  var name = req.params.roomName;
  if (names.indexOf(name)==-1){
    if (names.length==MAX_ROOMS){
      console.log("MAX ROOMS");
      res.sendFile("no_room.html", { root : __dirname});
      return;
    }
    console.log("NEW ROOM: "+name);
    io.sockets.to(name).emit("czar");
    names.push(name);
  }
  res.sendFile('index.html', { root : __dirname});
});

app.get('/:file', function(req, res){
  console.log("GET Request: "+req.params.file);
  res.sendFile(__dirname+"/"+req.params.file);
});

app.get('/css/:style', function(req, res){
  console.log("GET Request: "+req.params.style);
  res.sendFile(__dirname+"/css/"+req.params.style);
});

//Basic

io.on('connection', function(socket){
  room = socket.handshake.headers.referer.split("/").pop();
  if (VERBOSE) {console.log("CONNECTION > "+room);};
  socket.join(room);

  //Broadcasts
  socket.on('point', function(id){
    socket.broadcast.to(room).emit('point', id);
    console.log(" earned a point.")
  })

  socket.on('update', function(data){
    socket.broadcast.to(room).emit('update', data);
  });

  //Players
  socket.on('submit answer', function(answer, id){
    //console.log(id+" answered '"+answer+"'");
    socket.broadcast.to(room).emit('submit answer', answer, id);
  });

  socket.on('submit question', function(answer, id){
    socket.broadcast.to(room).emit('submit question', answer, id);
  });

  socket.on('join', function(id){
    console.log(id+' Joined');
    socket.broadcast.to(room).emit('join', id);
  });

  socket.on('test', function(){
    socket.emit("debug");
    console.log("SOCKET IN:");
    console.log(socket.rooms);
  });

  socket.on('czar', function(player){
    socket.broadcast.to(room).emit('czar', player);
  })
});

var port = 3000;

http.listen(port, function(){
  console.log('listening on *:'+port);
});
