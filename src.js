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

function join(){
  id = getCookie("humanity_player_id");
  console.log(document.cookie)
  if (id==""){
    id = window.prompt("Enter Your Name:", "Name");
    setCookie("humanity_player_id", id, 1);
  }
  socket.emit("player_join", id);
}

function cardByID(id){
  return master.filter(function(data){
    return data.id==id;
  });
}
