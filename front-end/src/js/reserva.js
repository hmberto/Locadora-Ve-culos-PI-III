var loading = document.getElementById("lding");

var session = sessionStorage.getItem("session");
if(session == null || session.length != 50) {
    window.location.replace("/");
}

var checkvalor1 = document.getElementById("checkvalor1");
var checkvalor2 = document.getElementById("checkvalor2");
var valor1 = document.querySelector(".valor1");
var valor2 = document.querySelector(".valor2");

var localRetirada = window.localStorage.getItem("localRetirada");
var dataRetirada = window.localStorage.getItem("dataRetirada");
var horaRetirada = window.localStorage.getItem("horaRetirada");
var localDevolucao = window.localStorage.getItem("localDevolucao");
var dataDevolucao = window.localStorage.getItem("dataDevolucao");
var horaDevolucao = window.localStorage.getItem("horaDevolucao");

var splitData1 = dataRetirada.split("-");
var splitData2 = dataDevolucao.split("-");

dataRetirada = splitData1[2] + "/" + splitData1[1] + "/" +splitData1[0];
dataDevolucao = splitData2[2] + "/" + splitData2[1] + "/" +splitData2[0];

document.querySelector(".localvalue1").innerHTML=localRetirada;
document.querySelector(".datavalue2").innerHTML=dataRetirada;
document.querySelector(".horalvalue3").innerHTML=horaRetirada + "h";
document.querySelector(".localvalue4").innerHTML=localDevolucao;
document.querySelector(".datavalue5").innerHTML=dataDevolucao;
document.querySelector(".horalvalue6").innerHTML=horaDevolucao + "h";

var dias3meses = parseInt(window.localStorage.getItem("dias3meses"));
var diffDays = parseInt(window.localStorage.getItem("diffDays"));

const urlParams = new URLSearchParams(window.location.search);
const urlParam = urlParams.get('carId');

var getValorfull = "";
var getValor3meses = "";

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

    if(xhttp.status == 200) {
      validaCupom(2);
      var json = JSON.parse(xhttp.response);
      
      valorDiaria = json['valorDiaria'];
      getValorfull = json['valorDiaria'];
      getValor3meses = (parseFloat(valorDiaria.replace(',', '.')) - (parseFloat(valorDiaria.replace(',', '.')) * 20 / 100)).toFixed(2).replace('.', ',');

      var calcDiarias = (parseFloat(getValorfull.replace(',', '.')) * diffDays).toFixed(2).replace('.', ',');
      var calc3meses = (parseFloat(getValor3meses.replace(',', '.')) * diffDays).toFixed(2).replace('.', ',');

      document.querySelector(".carname").innerHTML=json['modelo'];
      document.querySelector(".carimg").setAttribute("src", json['imgPath']);
      document.querySelector(".valorfull").innerHTML="<b>R$</b> " + getValorfull;
      document.querySelector(".valor3meses").innerHTML="<b>R$</b> " + getValor3meses;

      if(checkvalor1.checked) {
        document.querySelector(".valorLocacao").innerHTML="R$ " + calcDiarias;
      }
      if(checkvalor2.checked) {
        document.querySelector(".valorLocacao").innerHTML="R$ " + calc3meses;
      }

      if(json['availableCar'] != 1) {
        console.log("Veículo Indisponivel");
      }
      else if(localRetirada == null) {
        window.location.replace("/");
      }
      else if(json['localRetirada'] != localRetirada) {
        var json = '{ "localRetirada":"' + localRetirada + '", "dataRetirada": "' +  dataRetirada + '", "horaRetirada": "' + horaRetirada + '", "localDevolucao":"' + localDevolucao + '", "dataDevolucao": "' +  dataDevolucao + '", "horaDevolucao": "' + horaDevolucao + '" }';
        var parse = btoa(json);

        window.location.replace("/src/pages/search.html?search=" + parse);
      }
    }
  });
}

getCars();

if(diffDays > dias3meses) {
  checkvalor2.checked = true;
  valor2.classList.add("verde");
  valor2.classList.add("font-white");
  eventListenerA();
  eventListenerB();
}
else {
  checkvalor1.checked = true;
  valor1.classList.add("verde");
  valor1.classList.add("font-white");
}

document.querySelector(".diariasLocacao").innerHTML=diffDays + " Dias";

function eventListenerA() {
  valor1.addEventListener("click", () => {
    var calcDiarias = (parseFloat(getValorfull.replace(',', '.')) * diffDays).toFixed(2).replace('.', ',');

    if(checkvalor1.checked) {
      checkvalor1.checked = false;
      checkvalor2.checked = false;

      valor1.classList.remove("verde");
      valor2.classList.remove("verde");
      valor1.classList.remove("font-white");
      valor2.classList.remove("font-white");
    }
    else {
      checkvalor1.checked = true;
      checkvalor2.checked = false;

      valor1.classList.add("verde");
      valor2.classList.remove("verde");
      valor1.classList.add("font-white");
      valor2.classList.remove("font-white");

      document.querySelector(".valorLocacao").innerHTML="R$ " + calcDiarias;

      validaCupom(2);
    }
  });
}

function eventListenerB() {
  valor2.addEventListener("click", () => {
    var calc3meses = (parseFloat(getValor3meses.replace(',', '.')) * diffDays).toFixed(2).replace('.', ',');

    if(checkvalor2.checked) {
      checkvalor2.checked = false;
      checkvalor1.checked = false;

      valor1.classList.remove("verde");
      valor2.classList.remove("verde");
      valor1.classList.remove("font-white");
      valor2.classList.remove("font-white");
    }
    else {
      checkvalor2.checked = true;
      checkvalor1.checked = false;

      valor1.classList.remove("verde");
      valor2.classList.add("verde");
      valor1.classList.remove("font-white");
      valor2.classList.add("font-white");

      document.querySelector(".valorLocacao").innerHTML="R$ " + calc3meses;

      validaCupom(2);
    }
  });
}