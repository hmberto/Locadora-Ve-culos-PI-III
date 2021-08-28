var loading = document.getElementById("lding");

function validaCupom(t) {
  var getCupomFE = sessionStorage.getItem("cupom");

  var checkvalor1 = document.getElementById("checkvalor1");
  var checkvalor2 = document.getElementById("checkvalor2");

  var cupomvalue = document.querySelector(".cupom");
  var cupom = "";

  if(t == 1) {
    cupom = cupomvalue.value.toUpperCase();
  }
  else if(t == 2) {
    if(getCupomFE != null && getCupomFE != "") {
      cupom = getCupomFE;
    }
  }

  if(cupom != "") {
    loading.classList.remove("hideloading");

    var urlCupom = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/cupons/validate";
    
    var jsonCupom = '{"cupom": "' + cupom + '"}'

    var xhttpCupom = new XMLHttpRequest();
    xhttpCupom.open("POST", urlCupom, true);
    xhttpCupom.setRequestHeader("Content-Type", "application/json");

    xhttpCupom.send(jsonCupom);

    xhttpCupom.addEventListener('loadend', () => {
      loading.classList.add("hideloading");
      if(xhttpCupom.status == 200) {
        var respCupom = JSON.parse(xhttpCupom.response);
        var cupomdesconto = respCupom['cupom'];

        var porcentagemdescontos = document.querySelector(".porcentagemdescontos");

        sessionStorage.setItem("cupom", cupom);

        if(checkvalor1.checked) {
          newValorDescontos = (parseFloat(getValorfull.replace(',', '.') * cupomdesconto / 100)).toFixed(2).replace('.', ',');
          newValorfull = (parseFloat(getValorfull.replace(',', '.')) - (parseFloat(getValorfull.replace(',', '.')) * cupomdesconto / 100)).toFixed(2).replace('.', ',');

          document.querySelector(".cupomvalue").innerHTML=cupom;
          document.querySelector(".valordescontos").innerHTML="- R$ " + newValorDescontos;
          document.querySelector(".totalvalorLocacao").innerHTML="R$ " + newValorfull;

          porcentagemdescontos.innerHTML=cupomdesconto + "%";

          document.querySelector(".show-dados-cupom ").classList.remove("hide-dados-cupom");
          document.querySelector(".txtcupominvalid").classList.add("hidecupominvalid");
        }
        else if(checkvalor2.checked) {
          newValorDescontos3meses = (parseFloat(getValor3meses.replace(',', '.') * cupomdesconto / 100)).toFixed(2).replace('.', ',');
          newValor3meses = (parseFloat(getValor3meses.replace(',', '.')) - (parseFloat(getValor3meses.replace(',', '.')) * cupomdesconto / 100)).toFixed(2).replace('.', ',');

          document.querySelector(".cupomvalue").innerHTML=cupom;
          document.querySelector(".valordescontos").innerHTML="- R$ " + newValorDescontos3meses;
          document.querySelector(".totalvalorLocacao").innerHTML="R$ " + newValor3meses;

          porcentagemdescontos.innerHTML=cupomdesconto + "%";

          document.querySelector(".show-dados-cupom ").classList.remove("hide-dados-cupom");
          document.querySelector(".txtcupominvalid").classList.add("hidecupominvalid");
        }
        else {
          document.querySelector(".show-dados-cupom ").classList.add("hide-dados-cupom");
          document.querySelector(".txtcupominvalid").classList.remove("hidecupominvalid");
        }
      }
      else {
        sessionStorage.setItem("cupom", "");

        document.querySelector(".show-dados-cupom ").classList.add("hide-dados-cupom");
        document.querySelector(".txtcupominvalid").classList.remove("hidecupominvalid");
      }
      cupomvalue.value = "";
    });
  }
}