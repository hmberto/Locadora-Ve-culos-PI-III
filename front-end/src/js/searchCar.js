var localRetirada = document.getElementById("retirada");
var dataRetirada = document.getElementById("dataretirada");
var horaRetirada = document.getElementById("horaretirada");
var localDevolucao = document.getElementById("entrega");
var dataDevolucao = document.getElementById("dataentrega");
var horaDevolucao = document.getElementById("horaentrega");
var submitbtn = document.getElementById("searchbutton");

var localRetiradaCar = window.localStorage.getItem("localRetirada");
if(localRetiradaCar != null && localRetiradaCar.length > 1) {
  localRetirada.value = window.localStorage.getItem("localRetirada");
  horaRetirada.value = window.localStorage.getItem("horaRetirada");
  localDevolucao.value = window.localStorage.getItem("localDevolucao");
  horaDevolucao.value = window.localStorage.getItem("horaDevolucao");

  if(moment(window.localStorage.getItem("dataRetirada")).isAfter(dataRetirada.value)) {
    dataRetirada.value = window.localStorage.getItem("dataRetirada");
  }
  else {
    window.localStorage.setItem("dataRetirada", dataRetirada.value);
  }

  if(moment(window.localStorage.getItem("dataDevolucao")).isAfter(dataDevolucao.value)) {
    dataDevolucao.value = window.localStorage.getItem("dataDevolucao");
  }
  else {
    window.localStorage.setItem("dataDevolucao", dataDevolucao.value);
  }
}

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

horaRetirada.addEventListener("change", () => {
  horaDevolucao.value = horaRetirada.value;
});

function calcData() {
  var dataRetirada = document.getElementById("dataretirada");
  var dataDevolucao = document.getElementById("dataentrega");

  var dataAtaul = new Date();
  var mesAtual = String(dataAtaul. getMonth() + 1). padStart(2, '0');
  var anoAtual = dataAtaul. getFullYear();

  var dias3meses = new Date(anoAtual, mesAtual, 0).getDate() + new Date(anoAtual, mesAtual + 1, 0).getDate() + new Date(anoAtual, mesAtual + 2, 0).getDate();

  var newDate1 = new Date(dataRetirada.value);
  var newDate2 = new Date(dataDevolucao.value);
  
  var timeDiff = Math.abs(newDate1.getTime() - newDate2.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

  window.localStorage.setItem("dias3meses", dias3meses);
  window.localStorage.setItem("diffDays", diffDays);
}

function searchCar() {
  if(localRetirada.value != null && localRetirada.value != "" &&
    dataRetirada.value != null &&  dataRetirada.value != "" &&
    horaRetirada.value != null &&  horaRetirada.value != "" &&
    localDevolucao.value != null && localDevolucao.value != "" &&
    dataDevolucao.value != null && dataDevolucao.value != "" &&
    horaDevolucao.value != null && horaDevolucao.value != "") 
  {
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

    if(moment(date).isAfter(dataRetirada.value)) {
      document.querySelector(".showerr").innerHTML="* Data já passou";
      document.querySelector(".showerr").classList.remove("hideerr");
    }
    else if(moment(date).isAfter(dataDevolucao.value)) {
      document.querySelector(".showerr").innerHTML="* Data já passou";
      document.querySelector(".showerr").classList.remove("hideerr");
    }
    else if(moment(datetresdias).isAfter(dataRetirada.value)) {
      document.querySelector(".showerr").innerHTML="* Nenhum resultado para hoje";
      document.querySelector(".showerr").classList.remove("hideerr");
    }
    else if(moment(datetresdias1).isAfter(dataDevolucao.value)) {
      document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
      document.querySelector(".showerr").classList.remove("hideerr");
    }
    else if(moment(dataRetirada.value).isAfter(dataDevolucao.value)) {
      document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
      document.querySelector(".showerr").classList.remove("hideerr");
    }
    else if(moment(dataFrente).isAfter(dataDevolucao.value)) {
      document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
      document.querySelector(".showerr").classList.remove("hideerr");
    }
    else if(dataRetirada.value == dataDevolucao.value) {
      document.querySelector(".showerr").innerHTML="* Mínimo três diárias";
      document.querySelector(".showerr").classList.remove("hideerr");
    }
    else {
      var v1 = cidades.indexOf(localRetirada.value);
      var v2 = cidades.indexOf(localDevolucao.value);

      if(v1 >= 0 && v2 >= 0) {
        window.localStorage.setItem("localRetirada", localRetirada.value);
        window.localStorage.setItem("dataRetirada", dataRetirada.value);
        window.localStorage.setItem("horaRetirada", horaRetirada.value);
        window.localStorage.setItem("localDevolucao", localDevolucao.value);
        window.localStorage.setItem("dataDevolucao", dataDevolucao.value);
        window.localStorage.setItem("horaDevolucao", horaDevolucao.value);

        var json = '{ "localRetirada":"' + localRetirada.value + '", "dataRetirada": "' +  dataRetirada.value + '", "horaRetirada": "' + horaRetirada.value + '", "localDevolucao":"' + localDevolucao.value + '", "dataDevolucao": "' +  dataDevolucao.value + '", "horaDevolucao": "' + horaDevolucao.value + '" }';
        var parse = btoa(json);

        calcData();
        submitbtn.setAttribute('href', "/src/pages/search.html?search=" + parse);
      }
      else {
        document.querySelector(".showerr").classList.remove("hideerr");
      }
    }
  }
  else {
    document.querySelector(".showerr").classList.remove("hideerr");
  }
}

localRetirada.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    localDevolucao.focus();
  }
});