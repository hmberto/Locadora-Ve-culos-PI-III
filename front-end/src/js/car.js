var loading = document.getElementById("lding");
var check = document.getElementById("check");

const urlParams = new URLSearchParams(window.location.search);
const urlParam = urlParams.get('carId');

function getCars() {
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
    }
    else {
      document.getElementById("erro").classList.remove("esconde-erro");
      document.getElementById("showCar").classList.add("hideloading");
    }
  });
}

getCars();

check.addEventListener("click", () => {
  var verify1 = check.checked;
  var verify2 = document.querySelector(".disp").textContent;

  if(!verify1 || verify2 == "Veículo Indisponível") {
    document.getElementById("reservar").disabled = true;
  }
  else {
    document.getElementById("reservar").disabled = false;
  }
})