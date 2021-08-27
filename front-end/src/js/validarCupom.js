function validaCupom() {
  var checkvalor1 = document.getElementById("checkvalor1");
  var checkvalor2 = document.getElementById("checkvalor2");

  var cupom = document.querySelector(".cupom").value.toUpperCase();

  var valorLocacao = document.querySelector(".valorLocacao");

  if(cupom.length > 1) {
    if(checkvalor1.checked) {
      newValorDescontos = (parseFloat(getValorfull.replace(',', '.') * 10 / 100)).toFixed(2).replace('.', ',');
      newValorfull = (parseFloat(getValorfull.replace(',', '.')) - (parseFloat(getValorfull.replace(',', '.')) * 10 / 100)).toFixed(2).replace('.', ',');

      document.querySelector(".cupomvalue").innerHTML=cupom;
      document.querySelector(".valordescontos").innerHTML="R$ " + newValorDescontos;
      document.querySelector(".totalvalorLocacao").innerHTML="R$ " + newValorfull;

      document.querySelector(".show-dados-cupom ").classList.remove("hide-dados-cupom");
    }
    else if(checkvalor2.checked) {
      newValorDescontos3meses = (parseFloat(getValor3meses.replace(',', '.') * 10 / 100)).toFixed(2).replace('.', ',');
      newValor3meses = (parseFloat(getValor3meses.replace(',', '.')) - (parseFloat(getValor3meses.replace(',', '.')) * 10 / 100)).toFixed(2).replace('.', ',');

      document.querySelector(".cupomvalue").innerHTML=cupom;
      document.querySelector(".valordescontos").innerHTML="R$ " + newValorDescontos3meses;
      document.querySelector(".totalvalorLocacao").innerHTML="R$ " + newValor3meses;

      document.querySelector(".show-dados-cupom ").classList.remove("hide-dados-cupom");
    }
    else {
      document.querySelector(".show-dados-cupom ").classList.add("hide-dados-cupom");
    }
  }
  else {
    document.querySelector(".show-dados-cupom ").classList.add("hide-dados-cupom");
  }
  cupom = "";
}