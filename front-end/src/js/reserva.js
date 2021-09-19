var loading = document.getElementById("lding");

var popup = document.getElementById("popup");

var session = window.localStorage.getItem("session");
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
  var session = window.localStorage.getItem("session");
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
        window.location.replace("/");
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
  eventListenerC();
}

document.querySelector(".datavalue5").addEventListener("click", () => {
  popup.classList.remove("hidepopup");
  document.querySelector(".new-date-input").value = window.localStorage.getItem("dataDevolucao");
});

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

function calcData() {
  var dataRetirada = window.localStorage.getItem("dataRetirada");
  var dataDevolucao = window.localStorage.getItem("dataDevolucao");

  var dataAtaul = new Date();
  var mesAtual = String(dataAtaul.getMonth() + 1). padStart(2, '0');
  var anoAtual = dataAtaul.getFullYear();

  var dias3meses = new Date(anoAtual, mesAtual, 0).getDate() + new Date(anoAtual, mesAtual + 1, 0).getDate() + new Date(anoAtual, mesAtual + 2, 0).getDate();

  var newDate1 = new Date(dataRetirada);
  var newDate2 = new Date(dataDevolucao);
  
  var timeDiff = Math.abs(newDate1.getTime() - newDate2.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

  window.localStorage.setItem("dias3meses", dias3meses);
  window.localStorage.setItem("diffDays", diffDays);

  console.log(dias3meses);
  console.log(diffDays);
}

function eventListenerC() {
  valor2.addEventListener("click", () => {
    popup.classList.remove("hidepopup");
    document.querySelector(".new-date-input").value = window.localStorage.getItem("dataDevolucao");
  });
}

function sair() {
  popup.classList.add("hidepopup");
}

function alterar() {
  var novaData = document.querySelector(".new-date-input");
  var dataRetirada = window.localStorage.getItem("dataRetirada");
  
  var data = new Date();

  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();

  var date = ano + "-" + mes + "-" + dia;

  data.setDate(data.getDate() + 1);
  var diatresdias = String(data.getDate()).padStart(2, '0');
  var mestresdias = String(data.getMonth() + 1).padStart(2, '0');
  var anotresdias = data.getFullYear();

  var datetresdias = anotresdias + "-" + mestresdias + "-" + diatresdias;

  data.setDate(data.getDate() + 3);
  var diatresdias1 = String(data.getDate()).padStart(2, '0');
  var mestresdias1 = String(data.getMonth() + 1).padStart(2, '0');
  var anotresdias1 = data.getFullYear();

  var datetresdias1 = anotresdias1 + "-" + mestresdias1 + "-" + diatresdias1;

  var nData = new Date(dataRetirada.value);

  nData.setDate(nData.getDate() + 4);
  var diatresdias2 = String(nData.getDate()).padStart(2, '0');
  var mestresdias2 = String(nData.getMonth() + 1).padStart(2, '0');
  var anotresdias2 = nData.getFullYear();

  var dataFrente = anotresdias2 + "-" + mestresdias2 + "-" + diatresdias2;

  if(moment(date).isAfter(novaData.value)) {
    document.querySelector(".showerr").innerHTML="* Data já passou";
    document.querySelector(".showerr").classList.remove("hideerr");
  }
  else if(moment(datetresdias1).isAfter(novaData.value)) {
    document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
    document.querySelector(".showerr").classList.remove("hideerr");
  }
  else if(moment(dataRetirada).isAfter(novaData.value)) {
    document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
    document.querySelector(".showerr").classList.remove("hideerr");
  }
  else if(moment(dataFrente).isAfter(novaData.value)) {
    document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
    document.querySelector(".showerr").classList.remove("hideerr");
  }
  else if(dataRetirada == novaData.value) {
    document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
    document.querySelector(".showerr").classList.remove("hideerr");
  }
  else {
    window.localStorage.setItem("dataDevolucao", novaData.value);

    var urlParams = new URLSearchParams(window.location.search);
    var urlParam = urlParams.get('carId');

    calcData();

    window.location.replace("/src/pages/reserva.html?carId=" + urlParam + "&j=dw");
    window.localStorage.setItem("j", 'dw');

    popup.classList.add("hidepopup");
  }
}