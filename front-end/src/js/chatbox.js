var chatbox = document.getElementById("chatbox");
var showchatbox = document.getElementById("showchatbox");
var closechat = document.getElementById("closechat");

var inputchatbox = document.getElementById("inputchatbox");
inputchatbox.disabled = true;

inputchatbox.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    if(inputchatbox.value != "") {
      sendMensagem();
    }
  }
});

function getHora() {
  var data = new Date();
  var hora = data.getHours();
  var min = data.getMinutes(); 

  var horaatual = hora + ":" + min + "h";

  if(hora == 0 || min == 0) {
    if(hora == 0 && min == 0) {
      var horaatual = "00" + ":" + "00" + "h";
    }
    else if(hora == 0) {
      var horaatual = "00" + ":" + min + "h";
    }
    else if(min == 0) {
      var horaatual = hora + ":" + "00" + "h";
    }
  }
  else if(hora < 10 || min < 10) {
    if(hora < 10 && min < 10) {
      var horaatual = "0" + hora + ":0" + min + "h";
    }
    else if(hora < 10) {
      var horaatual = "0" + hora + ":" + min + "h";
    }
    else if(min < 10) {
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
  spantxt.classList.add("font-chat");
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
  spantxt.classList.add("font-chat");
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
  document.querySelector(".cards").innerHTML="";
  document.getElementById("chatcontentbox").innerHTML="";
  var teste = showchatbox.classList.contains("chathide");

  if(teste) {
    showchatbox.classList.remove("chathide");

    var horaatual = getHora();

    setTimeout(function() {
      primeirasmensagens(horaatual, "Olá, bem vindo.");
      document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
      setTimeout(function() {
        var newDiv1 = document.createElement("div");
        newDiv1.classList.add("card");
        var newSpan1 = document.createElement("span");
        newSpan1.innerHTML="CPF";

        newDiv1.appendChild(newSpan1);
        document.querySelector(".cards").appendChild(newDiv1);

        var newDiv2 = document.createElement("div");
        newDiv2.classList.add("card");
        var newSpan2 = document.createElement("span");
        newSpan2.innerHTML="RESERVA";

        newDiv2.appendChild(newSpan2);
        document.querySelector(".cards").appendChild(newDiv2);

        newDiv1.addEventListener("click", () => {
          inputchatbox.disabled = true;
          var horaatual = getHora();

          usermensagens(horaatual, "CPF");

          document.querySelector(".cards").classList.add("chathide");
          newDiv1.classList.add("chathide");
          newDiv2.classList.add("chathide");

          setTimeout(function() {
            inputchatbox.disabled = false;
            primeirasmensagens(horaatual, "Tudo bem. Digita seu CPF que eu já verifico pra você.");
            inputchatbox.focus();
            document.getElementById("chatcontentbox").classList.remove("margin2");
            document.getElementById("chatcontentbox").classList.add("margin1");
            document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
          }, 1000);
        })

        newDiv2.addEventListener("click", () => {
          inputchatbox.disabled = true;
          var horaatual = getHora();

          usermensagens(horaatual, "Número da reserva");

          document.querySelector(".cards").classList.add("chathide");
          newDiv1.classList.add("chathide");
          newDiv2.classList.add("chathide");

          setTimeout(function() {
            inputchatbox.disabled = false;
            primeirasmensagens(horaatual, "Tudo bem. Digita o número da sua reserva que eu já verifico pra você.");
            inputchatbox.focus();
            document.getElementById("chatcontentbox").classList.remove("margin2");
            document.getElementById("chatcontentbox").classList.add("margin1");
            document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
          }, 1000);
        })

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
  if(inputchatbox.value != "") {
    document.querySelector(".cards").innerHTML="";
    document.getElementById("chatcontentbox").classList.remove("margin2");
    document.getElementById("chatcontentbox").classList.add("margin1");
    
    var mensagem = inputchatbox;
    var newMsg = mensagem.value;

    var horaatual = getHora();

    usermensagens(horaatual, mensagem.value);
    document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;

    mensagem.value = "";
    inputchatbox.focus();
    setTimeout(function() {
      var getWords = newMsg.toUpperCase().split(" ");
      var ifCPF = getWords.indexOf("CPF");
      var ifRESERVA = getWords.indexOf("RESERVA");

      var ifNumber = parseInt(newMsg.split(/\D+/).join(""), 10) + "";

      if(ifNumber.length == 11) {
        primeirasmensagens(horaatual, "Identifiquei seu CPF. Só um minuto...");
        document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
        var xhttpResponse = consulta(ifNumber);
        
        xhttpResponse.addEventListener("loadend", () => {
          if(xhttpResponse.status == 200) {
            var jsonResp = JSON.parse(xhttpResponse.response);

            var data_locacao = jsonResp['data_locacao'].split('-');
            var hora_locacao = jsonResp['hora_locacao'].split(":");
            var data_retirada = jsonResp['data_retirada'].split('-');
            var hora_retirada = jsonResp['hora_retirada'].split(":");
            var id_locacao = jsonResp['id_locacao'];
            var local_retirada = jsonResp['local_retirada'];

            setTimeout(function() {
              primeirasmensagens(horaatual, "Você possui uma reserva ativa realizada no dia <b>" + data_locacao[2] + "/" + data_locacao[1] + "/" + data_locacao[0] + "</b> às <b>" + hora_locacao[0] + ":" + hora_locacao[1] + "h</b>.");
              document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
              setTimeout(function() {
                primeirasmensagens(horaatual, "Número do seu pedido: <b>#" + id_locacao + "</b>");
                document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
                setTimeout(function() {
                  primeirasmensagens(horaatual, "Você escolheu retirar o veículo na agência <b>" + local_retirada + "</b> às <b>" + hora_retirada[0] + ":" + hora_retirada[1] + "h</b> nesta data: <b> " + data_retirada[2] + "/" + data_retirada[1] + "/" + data_retirada[0] + ".");
                  document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
                  setTimeout(function() {
                    primeirasmensagens(horaatual, "Clique <a href='/src/pages/detalhes.html?u=" + btoa(jsonResp['cpf_locatario']) + "'>aqui</a> para ver mais detalhes.");
                    document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
                  }, 500);
                }, 500);
              }, 500);
            }, 300);
          }
          else {
            setTimeout(function() {
              primeirasmensagens(horaatual, "Não consegui encontar nenhuma reserva no sistema.");
              document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
              setTimeout(function() {
                primeirasmensagens(horaatual, "Clique <a href='#'>aqui</a> para realizar uma.");
                document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
              }, 500);
            }, 500);
          }
        });
      }
      else if(ifNumber.length == 17) {
        var num = ifNumber.slice(0,15) + "-01";

        primeirasmensagens(horaatual, "Identifiquei o número da sua reserva. Só um minuto...");
        document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
        
        var xhttpResponse = consulta(num);
        
        xhttpResponse.addEventListener("loadend", () => {
          if(xhttpResponse.status == 200) {
            var jsonResp = JSON.parse(xhttpResponse.response);

            var data_locacao = jsonResp['data_locacao'].split('-');
            var hora_locacao = jsonResp['hora_locacao'].split(":");
            var data_retirada = jsonResp['data_retirada'].split('-');
            var hora_retirada = jsonResp['hora_retirada'].split(":");
            var id_locacao = jsonResp['id_locacao'];
            var local_retirada = jsonResp['local_retirada'];

            setTimeout(function() {
              primeirasmensagens(horaatual, "Você possui uma reserva ativa realizada no dia <b>" + data_locacao[2] + "/" + data_locacao[1] + "/" + data_locacao[0] + "</b> às <b>" + hora_locacao[0] + ":" + hora_locacao[1] + "h</b>.");
              document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
              setTimeout(function() {
                primeirasmensagens(horaatual, "Você escolheu retirar o veículo na agência <b>" + local_retirada + "</b> às <b>" + hora_retirada[0] + ":" + hora_retirada[1] + "h</b> nesta data: <b> " + data_retirada[2] + "/" + data_retirada[1] + "/" + data_retirada[0] + ".");
                document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
                setTimeout(function() {
                  primeirasmensagens(horaatual, "Clique <a href='/src/pages/detalhes.html?u=" + btoa(jsonResp['cpf_locatario']) + "'>aqui</a> para ver mais detalhes.");
                  document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
                }, 500);
              }, 500);
            }, 300);
          }
          else {
            setTimeout(function() {
              primeirasmensagens(horaatual, "Não consegui encontar nenhuma reserva no sistema.");
              document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
              setTimeout(function() {
                primeirasmensagens(horaatual, "Clique <a href='#'>aqui</a> para realizar uma.");
                document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
              }, 500);
            }, 500);
          }
        });
      }
      else if(newMsg.toUpperCase() == "CPF" || ifCPF >= 0) {
        primeirasmensagens(horaatual, "Tudo bem. Digita seu CPF que eu já verifico pra você.");
        document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
      }
      else if(newMsg.toUpperCase() == "RESERVA" || ifRESERVA >= 0) {
        primeirasmensagens(horaatual, "Tudo bem. Digita o número da sua reserva que eu já verifico pra você.");
        document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
      }
      else {
        primeirasmensagens(horaatual, "Desculpe, não consegui entender...");
        document.getElementById("chatcontentbox").scrollTop = document.getElementById("chatcontentbox").scrollHeight;
      }
    }, 1000);
  }
}