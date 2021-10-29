var loading = document.getElementById("lding");

var iDLocacao = "";
var idVeiculo = "";
var newCpfLocatario = "";

var session = window.localStorage.getItem("session");
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

var fName = window.localStorage.getItem("fName");

document.getElementById("numerocartao").value = "5162 9207 5761 3268";
document.getElementById("nomecartao").value = fName;
document.getElementById("cvvcartao").value = "195";
document.getElementById("anocartao").value = "2029";
document.getElementById("mescartao").value = "08";

function poupA() {
  var session = window.localStorage.getItem("session");
  if(session != null && session.length == 50) {
    var popup = document.getElementById("popup1");

    if(popup.classList.contains("hidepopup")) {
      popup.classList.remove("hidepopup");
    }
    else {
      popup.classList.add("hidepopup");
    }
  }
  else {
    var a12 = document.createElement("a");
      a12.innerHTML="Clique para fazer login";
      a12.classList.add("font-green");
      a12.classList.add("outroscont2");
      a12.addEventListener("click", () => {
        var urlParams = new URLSearchParams(window.location.search);
        var number = urlParams.get('u');

        window.location.assign("/src/pages/login.html?u=" + number);
      });
      document.getElementById("showpay").appendChild(a12);
  }
}

function payFor() {
  loading.classList.remove("hideloading");
  poupA();

  var num = document.getElementById("numerocartao").value;

  var number = parseInt(num.split(/\D+/).join(""), 10) + "";
  var lastfour = "**** " + number.slice(12,16);

  pagamento_no_site = true;
  cartao_pagamento = lastfour;
  cpf_locatario = newCpfLocatario;

  var url = "http://3.144.171.211:8186/LocadoraVeiculos/location/update";
  var json = '{"pagamento_no_site":"' + pagamento_no_site + '","cartao_pagamento":"' + cartao_pagamento + '","cpf_locatario":"' + cpf_locatario + '"}';

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(json);

  xhttp.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if(xhttp.status == 200) {
      var urlParams = new URLSearchParams(window.location.search);
      var number = urlParams.get('u');

      window.localStorage.setItem("x", 'hu');
      window.location.replace("/src/pages/detalhes.html?u=" + number + "&x=hu");
    }
  });
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
      newCpfLocatario = resp['cpf_locatario'];

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

      if(resp['cupom_aplicado'] != "null") {
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
      }

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
      spam9.innerHTML="<b>Capa com cinto para animais: </b>" + trueR(resp['capa_cinto_animais']);
      spam9.classList.add("font-black");
      spam9.classList.add("outroscont1");
      div1.appendChild(spam9);

      if(resp['pagamento_no_site'] == "1") {
        var spam10 = document.createElement("span");
        spam10.innerHTML="<b>Você já pagou pela reserva</b>";
        spam10.classList.add("font-black");
        spam10.classList.add("outroscont1");
        document.getElementById("showpay").appendChild(spam10);

        var spam11 = document.createElement("span");
        spam11.innerHTML="<b>Cartão: </b>" + resp['cartao_pagamento'];
        spam11.classList.add("font-black");
        spam11.classList.add("outroscont1");
        document.getElementById("showpay").appendChild(spam11);
      }
      else {
        var spam10 = document.createElement("span");
        spam10.innerHTML="<b>Você ainda não pagou pela reserva</b>";
        spam10.classList.add("font-black");
        spam10.classList.add("outroscont1");
        document.getElementById("showpay").appendChild(spam10);

        var a11 = document.createElement("a");
        a11.innerHTML="Realizar pagamento";
        a11.classList.add("font-green");
        a11.classList.add("outroscont2");
        a11.addEventListener("click", () => {
          poupA();
        });
        document.getElementById("showpay").appendChild(a11);
      }

      outros.appendChild(div1);

      var url = "http://3.144.171.211:8186/LocadoraVeiculos/veiculos/consulta";
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