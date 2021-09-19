var numreserva = document.getElementById("numreserva");
var porcpf = document.getElementById("porcpf");
var button = document.getElementById("button");
var erro = document.getElementById("erro");
var textoerro = document.getElementById("textoerro");
var loading = document.getElementById("lding");

var themeColor = window.localStorage.getItem("sessionColor");
var passimg = document.getElementById("passshow");
if(themeColor == "dark") {
  numreserva.classList.remove("inpt-light");
  numreserva.classList.add("inpt-dark");
  porcpf.classList.remove("inpt-light");
  porcpf.classList.add("inpt-dark");
}

var session = window.localStorage.getItem("session");
if(session != null) {
  if(session.length == 50) {
    ifLogged(session);
  }
}

numreserva.focus();

function getValue() {
  var ifNumber1 = parseInt(numreserva.value.split(/\D+/).join(""), 10) + "";
  var ifNumber2 = parseInt(porcpf.value.split(/\D+/).join(""), 10) + "";

  if(ifNumber1 != "" || ifNumber2 != "") {
    if(ifNumber1.length == 17 || ifNumber2.length == 11) {
      var num = "";

      if(ifNumber1.length == 17) {
        num = ifNumber1.slice(0,15) + "-01";
      }
      else if(ifNumber2.length == 11) {
        num = ifNumber2;
      }

      loading.classList.remove("hideloading");
      
      var xhttpResponse = consulta(num);
          
      xhttpResponse.addEventListener("loadend", () => {
        loading.classList.add("hideloading");
        if(xhttpResponse.status == 200) {
          var jsonResp = JSON.parse(xhttpResponse.response);
          erro.classList.remove("azul");
          erro.classList.remove("vermelho");
          erro.classList.add("verde");

          textoerro.textContent="Reserva encontrada!";

          window.location.assign("/src/pages/detalhes.html?u=" + btoa(jsonResp['cpf_locatario']));
        }
        else {
          erro.classList.remove("azul");
          erro.classList.remove("verde");
          erro.classList.add("vermelho");
          textoerro.textContent="Nenhuma reserva encontrada";
          
          numreserva.focus();
        }
      });
      numreserva.value = "";
      porcpf.value = "";
    }
  }
}