function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

//Server

function join(){
  player.id = getCookie("humanity_player_id");
  if (player.id==""){
    player.id = window.prompt("Enter Your Name:", "Name");
    setCookie("humanity_player_id", player.id, 1);
  }
  socket.emit("join", player.id);
  console.log("Joined.");
}

function pick(card){
  console.log("Picked Card.");
  if (card.cardType == "A"){
    socket.emit("submit answer", card.text, id);
  } else {
    socket.emit("submit question", card.text, id);
  }
}

function addCard(id){
  var card = cardByID(id)[0];
  cards.push(card);
  $("#cards").append($("<li>").text(card.text));
  console.log(cards);
}

function point(id){
  for (var i = 0; i<players.length; i++){
    if(players[i].id==id){
      players[i].points+=1;
    }
  }
  console.log(id+" earned a point.");
}

//Filters

function cardByID(id){
  return cardDict.filter(function(data){
    return data.id==id;
  });
}

function questions(d){
  return d.filter(function(data){
    return data.type=="Q";
  });
}

function answers(d){
  return d.filter(function(data){
    return data.type=="A";
  });
}
