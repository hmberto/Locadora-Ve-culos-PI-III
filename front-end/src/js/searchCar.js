var localRetirada = document.getElementById("retirada");
var dataRetirada = document.getElementById("dataretirada");
var horaRetirada = document.getElementById("horaretirada");
var localDevolucao = document.getElementById("entrega");
var dataDevolucao = document.getElementById("dataentrega");
var horaDevolucao = document.getElementById("horaentrega");
var submitbtn = document.getElementById("searchbutton");

function searchCar() {
  if(localRetirada.value != null && localRetirada.value != "" &&
    dataRetirada.value != null &&  dataRetirada.value != "" &&
    horaRetirada.value != null &&  horaRetirada.value != "" &&
    localDevolucao.value != null && localDevolucao.value != "" &&
    dataDevolucao.value != null && dataDevolucao.value != "" &&
    horaDevolucao.value != null && horaDevolucao.value != "") {

    var json = '{ "localRetirada":"' + localRetirada.value + '", "dataRetirada": "' +  dataRetirada.value + '", "horaRetirada": "' + horaRetirada.value + '", "localDevolucao":"' + localDevolucao.value + '", "dataDevolucao": "' +  dataDevolucao.value + '", "horaDevolucao": "' + horaDevolucao.value + '" }';
    var parse = btoa(json);

    submitbtn.setAttribute('href', "/src/pages/search.html?search=" + parse)
  }
  else {
    document.querySelector(".showerr").classList.remove("hideerr");
  }
}