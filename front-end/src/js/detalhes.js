var loading = document.getElementById("lding");

var iDLocacao = "";
var idVeiculo = "";

var session = sessionStorage.getItem("session");
if(session != null) {
  if(session.length == 50) {
    ifLogged(session);
  }
}
function trueR(number) {
  if(number == 1) {
    return "Sim";
  }
  else {
    return "Não";
  }
}

function detalhes() {
  loading.classList.remove("hideloading");

  var img = document.createElement("img");
  img.classList.add("loading2");
  img.setAttribute("src", "/src/img/loading1.gif");
  document.getElementById("loadingcar").appendChild(img);

  var urlParams = new URLSearchParams(window.location.search);
  var number = urlParams.get('u');

  var ifNumber = atob(number);

  var xhttp = consulta(ifNumber);
      
  xhttp.addEventListener("loadend", () => {
    loading.classList.add("hideloading");
    if(xhttp.status == 200) {
      var resp = JSON.parse(xhttp.response);
      document.querySelector(".contenttlt").innerHTML="Reserva: #" + resp['id_locacao'];
      document.querySelector(".content1").innerHTML="Guarde este número para futuras consultas. Apresente-o na agência para retirar o veículo."

      iDLocacao = resp['id_locacao'];
      idVeiculo = resp['id_veiculo'];

      var outros = document.querySelector(".outros");

      var dataLocacao = resp['data_locacao'].split("-");
      var horaLocacao = resp['hora_locacao'].split(":");

      var dataRetirada = resp['data_retirada'].split("-");
      var horaRetirada = resp['hora_retirada'].split(":");

      var dataDevolucao = resp['data_devolucao'].split("-");
      var horaDevolucao = resp['hora_devolucao'].split(":");
      
      var spam1 = document.createElement("span");
      spam1.innerHTML="Contratação feita em <b>" + dataLocacao[2] + "/" + dataLocacao[1] + "/" + dataLocacao[0] + "</b> às <b>" + horaLocacao[0] + ":" + horaLocacao[1] + "h</b>.";
      spam1.classList.add("font-black");
      spam1.classList.add("outroscont");
      outros.appendChild(spam1);

      var spam2 = document.createElement("span");
      spam2.innerHTML="Retirada do veículo na agência <b>" + resp['local_retirada'] + "</b> em <b>" + dataRetirada[2] + "/" + dataRetirada[1] + "/" + dataRetirada[0] + "</b> às <b>" + horaRetirada[0] + ":" + horaRetirada[1] + "h</b>.";
      spam2.classList.add("font-black");
      spam2.classList.add("outroscont");
      outros.appendChild(spam2);

      var spam3 = document.createElement("span");
      spam3.innerHTML="Devolução do veículo na agência <b>" + resp['local_devolucao'] + "</b> em <b>" + dataDevolucao[2] + "/" + dataDevolucao[1] + "/" + dataDevolucao[0] + "</b> às <b>" + horaDevolucao[0] + ":" + horaDevolucao[1] + "h</b>" + " (Permanência de <b>" + resp['tempo_locacao'] + "</b> dias com o veículo).";
      spam3.classList.add("font-black");
      spam3.classList.add("outroscont");
      outros.appendChild(spam3);

      var div1 = document.createElement("div");
      div1.classList.add("blocoinfo");
      var spam4 = document.createElement("span");
      spam4.innerHTML="<b>Valor total da reserva: </b>" + resp['valor_total_locacao'];
      spam4.classList.add("font-black");
      spam4.classList.add("outroscont1");
      div1.appendChild(spam4);

      var spam5 = document.createElement("span");
      spam5.innerHTML="<b>Cupom aplicado: </b>" + resp['cupom_aplicado'];
      spam5.classList.add("font-black");
      spam5.classList.add("outroscont1");
      div1.appendChild(spam5);

      var spam6 = document.createElement("span");
      spam6.innerHTML="<b>Valor do desconto: </b>" + resp['valor_descontos'];
      spam6.classList.add("font-black");
      spam6.classList.add("outroscont1");
      div1.appendChild(spam6);

      var spam7 = document.createElement("span");
      spam7.innerHTML="<b>Valor pago: </b>" + resp['valor_total_a_pagar'];
      spam7.classList.add("font-black");
      spam7.classList.add("outroscont1");
      div1.appendChild(spam7);

      var spam8 = document.createElement("span");
      spam8.innerHTML="<b>Cadeirinha/assento de elevação para crianças: </b>" + trueR(resp['cadeirinha']);
      spam8.classList.add("font-black");
      spam8.classList.add("outroscont1");
      div1.appendChild(spam8);

      var spam9 = document.createElement("span");
      spam9.innerHTML="<b>Valor pago: </b>" + trueR(resp['capa_cinto_animais']);
      spam9.classList.add("font-black");
      spam9.classList.add("outroscont1");
      div1.appendChild(spam9);

      outros.appendChild(div1);

      var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/veiculos/consulta";
      var jsonCar = '{ "carId": \"' + idVeiculo + '\" }';

      var xhttp5 = new XMLHttpRequest();
      xhttp5.open("POST", url, true);
      xhttp5.setRequestHeader("Content-Type", "application/json");
      xhttp5.send(jsonCar);

      xhttp5.addEventListener('loadend', () => {
        document.getElementById("loadingcar").innerHTML="";
        if(xhttp5.status == 200) {
          var spam = document.createElement("spam");
          spam.classList.add("tltreserva");
          spam.classList.add("tltreserva2");
          spam.classList.add("font-black");
          spam.classList.add("left-align");
          spam.innerHTML="Sobre o veículo";
          document.getElementById("loadingcar").appendChild(spam);

          var newJson = JSON.parse(xhttp5.response);

          var img = document.createElement("img");
          img.classList.add("loading2");
          img.setAttribute("src", newJson['imgPath']);
          document.getElementById("loadingcar").appendChild(img);
        }
      });
    }
    else {
      window.location.replace("/");
    }
  });
}

detalhes();