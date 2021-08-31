var loading = document.getElementById("lding");
var check = document.getElementById("check");

const urlParams = new URLSearchParams(window.location.search);
const urlParam = urlParams.get('carId');

var localRetiradDB = "";

function getCars() {
  var session = sessionStorage.getItem("session");
  if(session != null) {
    if(session.length == 50) {
      ifLogged(session);
    }
  }
  
  loading.classList.remove("hideloading");

  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/veiculos/consulta";
  var jsonCar = '{ "carId": \"' + urlParam + '\" }';

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(jsonCar);

  xhttp.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if (xhttp.status == 200) {
      loading.classList.add("hideloading");
      
      var resp = JSON.parse(xhttp.response);
      
      document.title = resp['modelo'] + ' - Locadora de Veículos';

      var cambio = "";

      if(resp['cambioAutomatico'] == 0) {
        cambio = "Manual";
      }
      else if(resp['cambioAutomatico'] == 1) {
        cambio = "Automático";
      }
      else {
        cambio = resp['cambioAutomatico'];
      }

      if(resp['availableCar'] == 1) {
        document.querySelector(".disp").classList.add("hideloading");
      }
      else {
        document.querySelector(".disp").textContent="Veículo Indisponível";
      }

      localRetiradDB = resp['localRetirada'];

      document.getElementById("carimg").setAttribute("src", resp['imgPath']);
      document.querySelector(".description").innerHTML=resp['subtitles'];
      document.getElementById("name").textContent=resp['modelo'];
      document.querySelector(".showmodelo").textContent=resp['modelo'];
      document.querySelector(".showmarca").textContent=resp['marca'];
      document.querySelector(".showportas").textContent=resp['numeroPortas'];
      document.querySelector(".showano").textContent=resp['ano'];
      document.querySelector(".showmotor").textContent=resp['motor'];
      document.querySelector(".showcambio").textContent=cambio;
      document.querySelector(".showcombustivel").textContent=resp['combustivel'];
      document.getElementById("localret").textContent="(" + resp['localRetirada'] + ")";
    }
    else {
      document.getElementById("erro").classList.remove("esconde-erro");
      document.getElementById("showCar").classList.add("hideloading");
    }
  });
}

getCars();

function validateCheckTermo() {
  var verify1 = check.checked;
  var verify2 = document.querySelector(".disp").textContent;

  if(!verify1 || verify2 == "Veículo Indisponível") {
    document.getElementById("reservar").disabled = true;
  }
  else {
    var localRetirada = sessionStorage.getItem("localRetirada");
    var dataRetirada = sessionStorage.getItem("dataRetirada");
    var horaRetirada = sessionStorage.getItem("horaRetirada");
    var localDevolucao = sessionStorage.getItem("localDevolucao");
    var dataDevolucao = sessionStorage.getItem("dataDevolucao");
    var horaDevolucao = sessionStorage.getItem("horaDevolucao");

    if(localRetirada != null && dataRetirada != null && horaRetirada != null && localDevolucao != null && dataDevolucao != null && horaDevolucao != null) {
      var button = document.getElementById("reservar");

      if(localRetiradDB != localRetirada) {
        var button = document.getElementById("reservar");

        var json = '{ "localRetirada":"' + localRetirada + '", "dataRetirada": "' +  dataRetirada + '", "horaRetirada": "' + horaRetirada + '", "localDevolucao":"' + localDevolucao + '", "dataDevolucao": "' +  dataDevolucao + '", "horaDevolucao": "' + horaDevolucao + '" }';
        var parse = btoa(json);

        document.querySelector(".disp").textContent="Veículo disponível em um local diferente do que você buscou. Clique no botão para ver carros em " + localRetirada + ".";
        document.querySelector(".disp").classList.remove("hideloading");
        
        button.textContent="ENCONTRAR";
  
        button.addEventListener("click", () => {
          window.location.replace("/src/pages/search.html?search=" + parse);
        });
  
        button.disabled = false;
      }
      else  {
        var session = sessionStorage.getItem("session");
        if(session != null) {
          if(session.length == 50) {
            var url = "/src/pages/reserva.html?carId=" + urlParam;
            button.addEventListener("click", () => {
              window.location.replace(url);
            });

            button.disabled = false;
          }
          else {
            document.querySelector(".disp").textContent="Você não está logado. Clique para fazer login.";
            document.querySelector(".disp").classList.remove("hideloading");
            
            button.textContent="LOGIN";
      
            button.addEventListener("click", () => {
              window.location.replace("/src/pages/login.html?carId=" + urlParam);
            });
      
            button.disabled = false;
          }
        }
        else {
          document.querySelector(".disp").textContent="Você não está logado. Clique para fazer login.";
          document.querySelector(".disp").classList.remove("hideloading");
          
          button.textContent="LOGIN";
    
          button.addEventListener("click", () => {
            window.location.replace("/src/pages/login.html?carId=" + urlParam);
          });
    
          button.disabled = false;
        }
      }
    }
    else {
      var button = document.getElementById("reservar");

      document.querySelector(".disp").textContent="Você não selecionou local para retirada. Clique no botão para buscar.";
      document.querySelector(".disp").classList.remove("hideloading");
      
      button.textContent="BUSCAR";

      button.addEventListener("click", () => {
        window.location.replace("/");
      });

      button.disabled = false;
    }
  }
}

document.querySelector(".termos").addEventListener("click", () => {
  if(check.checked) {
    check.checked = false;
    validateCheckTermo();
  }
  else {
    check.checked = true;
    validateCheckTermo();
  }
});

check.addEventListener("click", () => {
  validateCheckTermo();
})