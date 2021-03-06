function getDigit(x, a){
  return (a >= x.length) ? "0" : x.charAt(x.length - a - 1)
}

function prefixZeros(a, b){
  var c = a;
  for (var i = 0; i < b; i++){
    c="0" + c
  }
  return c
}

function add(x, y){
  var a = Math.max(x.length, y.length);
  var b = "";
  var c = 0;
  var d = 0;
  for (var i = 0; i < a; i++){
    var e = Number(getDigit(x, i));
    var f = Number(getDigit(y, i));
    var g = e + f + c;
    c = 0;
    while(g >= 10){
      g -= 10;
      c++
    }
    if (g === 0){
      d++
    } else {
      b = String(g) + prefixZeros(b,d);
      d = 0
    }
  }
  if (c > 0) {
    b = String(c) + b
  }
  return b
}

function getId(a){
  var b = "76561197960265728";
  var c = a.attributes.getNamedItem('data-miniprofile').value;
  return add(b, c)
}

function setVacation(e) {
  var f = j[e.SteamId];
  f.forEach(function(a) {
    var index = h.indexOf(a)
    var vacSpan = cm[index].querySelector('#vacSpan')
	  if (vacSpan !== null) return
  
    var c = document.createElement('span');
	  c.style.fontWeight='bold';
    c.style.display='block';
    c.id = "vacSpan"
    if (e.NumberOfVACBans || e.NumberOfGameBans){
      var d = '';
      if (e.NumberOfGameBans){
        d += e.NumberOfGameBans+' OW bans'
      }
      if (e.NumberOfVACBans){
        d += (d === '' ? '' : ', ') + e.NumberOfVACBans + ' VAC bans'
      }
      d += ' ' + e.DaysSinceLastBan + ' days ago.';
      c.style.color = 'rgb(255, 73, 73)';
      c.innerHTML = d
    }else{
      c.style.color = 'rgb(43, 203, 64)';
      c.innerHTML = 'No Bans for this player.'
    }
    
    cm[index].appendChild(c);
  })
}

function onData(a) {
  if (a.readyState === XMLHttpRequest.DONE && a.status===200) {
    var b = JSON.parse(a.responseText);
    b.players.forEach(setVacation)
  }
}

function makeApiCall(a) {
  var b = new XMLHttpRequest();
  var c = 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=12A1D1DE83F9932934EDD6DF2BA00463&steamids=';
  var d = c + a.join(',');
  b.onreadystatechange = function(){ onData(b) };
  b.open('GET',d,true);
  b.send()
}

function fetchInfo() {
  cm = [].slice.call(document.querySelectorAll('.commends_inner_name'));
  cm.splice(0, 1)
  h = [].slice.call(document.querySelectorAll('.linkTitle'));
  j = {};
  h.forEach(function(a) {
    var b = getId(a);
    if (!j[b]) {
      j[b] = []
    }
    j[b].push(a)
  });

  var k = Object.keys(j);
  while(k.length > 0) {
    var l = k.splice(0,100);
    makeApiCall(l)
  }
}

function clickHandler(){
  console.log('click')
  setTimeout(fetchInfo, 3500)
}

var cm = []
var h = [];
var j = {};
fetchInfo()
var element = document.getElementById('load_more_button');
element.addEventListener('click', clickHandler);