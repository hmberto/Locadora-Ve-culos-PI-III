var chatbox = document.getElementById("chatbox");
var showchatbox = document.getElementById("showchatbox");
var closechat = document.getElementById("closechat");

var inputchatbox = document.getElementById("inputchatbox");
inputchatbox.disabled = true;

inputchatbox.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    sendMensagem();
  }
});

function getHora() {
  var data = new Date();
  var hora = data.getHours();
  var min = data.getMinutes(); 

  var horaatual = hora + ":" + min + "h";

  if(hora == 0 || min == 0) {
    if(hora == 0) {
      var horaatual = "00" + ":" + min + "h";
    }
    if(min == 0) {
      var horaatual = hora + ":" + "00" + "h";
    }
  }
  else if(hora < 10 || min < 10) {
    if(hora < 10) {
      var horaatual = "0" + hora + ":" + min + "h";
    }
    if(min < 10) {
      var horaatual = hora + ":0" + min + "h";
    }
  }

  return horaatual;
}

function primeirasmensagens(horaatual, mensagem) {
  var div = document.createElement("div");
  div.classList.add("divmessagechat");
  div.classList.add("azul");
  div.classList.add("font-white1");

  var spantxt = document.createElement("span");
  spantxt.innerHTML=mensagem;
  div.appendChild(spantxt);

  var divhora = document.createElement("div");
  divhora.classList.add("divhora");
  div.appendChild(divhora);

  var spanhora = document.createElement("span");
  spanhora.innerHTML=horaatual
  spanhora.classList.add("hora");
  divhora.appendChild(spanhora);

  document.getElementById("chatcontentbox").appendChild(div);
}

function usermensagens(horaatual, mensagem) {
  var div = document.createElement("div");
  div.classList.add("divmessageuser");
  div.classList.add("font-white1");

  var spantxt = document.createElement("span");
  spantxt.innerHTML=mensagem;
  div.appendChild(spantxt);

  var divhora = document.createElement("div");
  divhora.classList.add("divhora");
  div.appendChild(divhora);

  var spanhora = document.createElement("span");
  spanhora.innerHTML=horaatual
  spanhora.classList.add("hora");
  divhora.appendChild(spanhora);

  document.getElementById("chatcontentbox").appendChild(div);
}

chatbox.addEventListener("click", () => {
  var teste = showchatbox.classList.contains("chathide");

  if(teste) {
    showchatbox.classList.remove("chathide");

    var horaatual = getHora();

    setTimeout(function() {
      primeirasmensagens(horaatual, "Olá, bem vindo.");
      document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
      setTimeout(function() {
        primeirasmensagens(horaatual, "Digite o número da sua reserva caso queira realizar uma consulta.");
        inputchatbox.disabled = false;
        document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
        inputchatbox.focus();
      }, 1000);
    }, 1000);
  }
  else {
    showchatbox.classList.add("chathide");
    document.getElementById("chatcontentbox").innerHTML="";
  }
});

closechat.addEventListener("click", () => {
  showchatbox.classList.add("chathide");
  document.getElementById("chatcontentbox").innerHTML="";
});

function sendMensagem() {
  var mensagem = inputchatbox;

  var horaatual = getHora();

  usermensagens(horaatual, mensagem.value);
  document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;

  mensagem.value = "";

  inputchatbox.focus();
  setTimeout(function() {
    primeirasmensagens(horaatual, "Serviço Indisponível. Tente mais tarde!");
    document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
  }, 1000);
}