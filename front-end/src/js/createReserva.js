var loading = document.getElementById("lding");
function createReserva(y) {
  var checkvalor1 = document.getElementById("checkvalor1");
  var checkvalor2 = document.getElementById("checkvalor2");

  if(checkvalor1.checked || checkvalor2.checked) {
    loading.classList.remove("hideloading");
    var localRetirada = window.localStorage.getItem("localRetirada");
    var dataRetirada = window.localStorage.getItem("dataRetirada");
    var horaRetirada = window.localStorage.getItem("horaRetirada");
    var localDevolucao = window.localStorage.getItem("localDevolucao");
    var dataDevolucao = window.localStorage.getItem("dataDevolucao");
    var horaDevolucao = window.localStorage.getItem("horaDevolucao");

    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get('carId');
    var xhttp = ifLogged(session, 1);

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        var resp = JSON.parse(xhttp.response);

        var A = document.querySelector(".valorLocacao").textContent;
        var B = document.querySelector(".valordescontos").textContent;
        var C = document.querySelector(".totalvalorLocacao").textContent;
        var D = window.localStorage.getItem("cupom");
        var E = document.getElementById("cadeirinha").checked;
        var F = document.getElementById("animais").checked;

        if(A == "" || A == undefined || A == null || A == "null") {
          A = null;
        }
        if(B == "" || B == undefined || B == null || B == "null") {
          B = null;
        }
        if(C == "" || C == undefined || C == null || C == "null") {
          C = A;
        }
        if(D == "" || D == undefined || D == null || D == "null") {
          B = null;
          C = A;
          D = null;
        }

        var pagamento_no_site = false;
        var cartao_pagamento = "null"
        if(y == 1) {
          pagamento_no_site = true;
          var cartao_pagamento = document.querySelector(".card1").textContent;
        }

        var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/location/create";
        var json = '{"cpf_locatario": "' + resp['cpf'] + '","id_veiculo": "' + urlParam + '","data_retirada": "' + dataRetirada + '","hora_retirada": "' + horaRetirada + '","data_devolucao": "' + dataDevolucao + '","hora_devolucao": "' + horaDevolucao + '","tempo_locacao": "' + diffDays + '","id_funcionario": "111111","valor_total_locacao": "' + A + '","cupom_aplicado": "' + D + '","valor_descontos": "' + B + '","valor_total_a_pagar": "' + C + '","local_retirada": "' + localRetirada + '","local_devolucao": "' + localDevolucao + '","cadeirinha": "' + E + '","capa_cinto_animais": "' + F + '","pagamento_no_site": "' + pagamento_no_site + '","cartao_pagamento": "' + cartao_pagamento + '"}';

        var xhttp2 = new XMLHttpRequest();
        xhttp2.open("POST", url, true);
        xhttp2.setRequestHeader("Content-Type", "application/json");

        xhttp2.send(json);
        var parseCpf = btoa(resp['cpf']);

        xhttp2.addEventListener('loadend', () => {
          loading.classList.remove("hideloading");
          if(xhttp2.status == 201) {
            window.location.replace("/src/pages/detalhes.html?u=" + parseCpf);
          }
          else {
            window.location.assign("/src/pages/login.html?carId=" + urlParam);
          }
        });
      }
      else {
        window.location.assign("/src/pages/login.html?carId=" + urlParam);
      }
    });
  }
}