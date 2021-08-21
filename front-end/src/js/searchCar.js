var localRetirada = document.getElementById("retirada");
var dataRetirada = document.getElementById("dataretirada");
var horaRetirada = document.getElementById("horaretirada");
var localDevolucao = document.getElementById("entrega");
var dataDevolucao = document.getElementById("dataentrega");
var horaDevolucao = document.getElementById("horaentrega");
var submitbtn = document.getElementById("btnsearch");

function searchCar() {
  if(localRetirada.value != null && localRetirada.value != "" &&
    dataRetirada.value != null &&  dataRetirada.value != "" &&
    horaRetirada.value != null &&  horaRetirada.value != "" &&
    localDevolucao.value != null && localDevolucao.value != "" &&
    dataDevolucao.value != null && dataDevolucao.value != "" &&
    horaDevolucao.value != null && horaDevolucao.value != "") {

    json = '{ "localRetirada":"' + localRetirada.value + '", "dataRetirada": "' +  dataRetirada.value + '", "horaRetirada": "' + horaRetirada.value + '", "localDevolucao":"' + localDevolucao.value + '", "dataDevolucao": "' +  dataDevolucao.value + '", "horaDevolucao": "' + horaDevolucao.value + '" }';
    console.log(json)
  }
  else {
    document.querySelector(".showerr").classList.remove("hideerr");
  }
}