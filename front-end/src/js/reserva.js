var loading = document.getElementById("lding");

var checkvalor1 = document.getElementById("checkvalor1");
var checkvalor2 = document.getElementById("checkvalor2");
var valor1 = document.querySelector(".valor1");
var valor2 = document.querySelector(".valor2");

var localRetirada = sessionStorage.getItem("localRetirada");
var dataRetirada = sessionStorage.getItem("dataRetirada");
var horaRetirada = sessionStorage.getItem("horaRetirada");
var localDevolucao = sessionStorage.getItem("localDevolucao");
var dataDevolucao = sessionStorage.getItem("dataDevolucao");
var horaDevolucao = sessionStorage.getItem("horaDevolucao");

document.querySelector(".localvalue1").innerHTML=localRetirada;
document.querySelector(".datavalue2").innerHTML=dataRetirada;
document.querySelector(".horalvalue3").innerHTML=horaRetirada;
document.querySelector(".localvalue4").innerHTML=localDevolucao;
document.querySelector(".datavalue5").innerHTML=dataDevolucao;
document.querySelector(".horalvalue6").innerHTML=horaDevolucao;

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
      var json = JSON.parse(xhttp.response);
      
      valorDiaria = json['valorDiaria'];
      getValorfull = json['valorDiaria'];
      getValor3meses = (parseFloat(valorDiaria.replace(',', '.')) - (parseFloat(valorDiaria.replace(',', '.')) * 10 / 100)).toFixed(2).replace('.', ',');

      document.querySelector(".carname").innerHTML=json['modelo'];
      document.querySelector(".carimg").setAttribute("src", json['imgPath']);
      document.querySelector(".valorfull").innerHTML="<b>R$</b> " + getValorfull;
      document.querySelector(".valor3meses").innerHTML="<b>R$</b> " + getValor3meses;

      if(checkvalor1.checked) {
        document.querySelector(".valorLocacao").innerHTML="R$ " + getValorfull;
      }
      if(checkvalor2.checked) {
        document.querySelector(".valorLocacao").innerHTML="R$ " + getValor3meses;
      }

      if(json['availableCar'] != 1) {
        console.log("Veículo Indisponivel");
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

checkvalor1.checked = true;

if(checkvalor1.checked) {
  valor1.classList.add("valorbg");
}
if(checkvalor2.checked) {
  valor2.classList.add("valorbg");
}

valor1.addEventListener("click", () => {
  if(checkvalor1.checked) {
    checkvalor1.checked = false;
    checkvalor2.checked = false;

    valor1.classList.remove("valorbg");
    valor2.classList.remove("valorbg");
  }
  else {
    checkvalor1.checked = true;
    checkvalor2.checked = false;

    valor1.classList.add("valorbg");
    valor2.classList.remove("valorbg");

    document.querySelector(".valorLocacao").innerHTML="R$ " + getValorfull;

    validaCupom(2);
  }
});

valor2.addEventListener("click", () => {
  if(checkvalor2.checked) {
    checkvalor2.checked = false;
    checkvalor1.checked = false;

    valor1.classList.remove("valorbg");
    valor2.classList.remove("valorbg");
  }
  else {
    checkvalor2.checked = true;
    checkvalor1.checked = false;

    valor1.classList.remove("valorbg");
    valor2.classList.add("valorbg");

    document.querySelector(".valorLocacao").innerHTML="R$ " + getValor3meses;

    validaCupom(2);
  }
});