var localRetirada = document.getElementById("retirada");
var dataRetirada = document.getElementById("dataretirada");
var horaRetirada = document.getElementById("horaretirada");
var localDevolucao = document.getElementById("entrega");
var dataDevolucao = document.getElementById("dataentrega");
var horaDevolucao = document.getElementById("horaentrega");
var submitbtn = document.getElementById("searchbutton");

var showSearchBox1 = document.getElementById("setaabaixo");
var showSearchBox = document.getElementById("seta");
showSearchBox.addEventListener('click', () => {
  hideShowBox()
});

showSearchBox1.addEventListener('click', () => {
  hideShowBox()
});

function hideShowBox() {
  var box1 = document.getElementById("box1");
  var box2 = document.getElementById("box2");
  var btnsrc = document.querySelector(".blck");

  var allSearch = document.getElementById("header2");

  if(box1.classList.contains("hidesearch")) {
    allSearch.classList.remove("tamanhoA");
    allSearch.classList.add("tamanhoB");

    box1.classList.remove("hidesearch");
    box2.classList.remove("hidesearch");
    btnsrc.classList.remove("hidesearch");

    showSearchBox.classList.remove("showsearch");
    showSearchBox.classList.add("hidesearch");
    showSearchBox1.classList.add("hidesearch");
  }
}

function searchCar() {
  if(localRetirada.value != null && localRetirada.value != "" &&
    dataRetirada.value != null &&  dataRetirada.value != "" &&
    horaRetirada.value != null &&  horaRetirada.value != "" &&
    localDevolucao.value != null && localDevolucao.value != "" &&
    dataDevolucao.value != null && dataDevolucao.value != "" &&
    horaDevolucao.value != null && horaDevolucao.value != "") {

    var v1 = cidades.indexOf(localRetirada.value);
    var v2 = cidades.indexOf(localDevolucao.value);

    if(v1 >= 0 && v2 >= 0) {
      sessionStorage.setItem("localRetirada", localRetirada.value);
      sessionStorage.setItem("dataRetirada", dataRetirada.value);
      sessionStorage.setItem("horaRetirada", horaRetirada.value);
      sessionStorage.setItem("localDevolucao", localDevolucao.value);
      sessionStorage.setItem("dataDevolucao", dataDevolucao.value);
      sessionStorage.setItem("horaDevolucao", horaDevolucao.value);

      var json = '{ "localRetirada":"' + localRetirada.value + '", "dataRetirada": "' +  dataRetirada.value + '", "horaRetirada": "' + horaRetirada.value + '", "localDevolucao":"' + localDevolucao.value + '", "dataDevolucao": "' +  dataDevolucao.value + '", "horaDevolucao": "' + horaDevolucao.value + '" }';
      var parse = btoa(json);

      submitbtn.setAttribute('href', "/src/pages/search.html?search=" + parse)
    }
    else {
      document.querySelector(".showerr").classList.remove("hideerr");
    }
  }
  else {
    document.querySelector(".showerr").classList.remove("hideerr");
  }
}