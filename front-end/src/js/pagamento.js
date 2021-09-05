var credtcard = document.getElementById("credtcard");
var pagarloja = document.getElementById("pagarloja");

var classcredtcard = document.querySelector(".credtcard");
var classpagarloja = document.querySelector(".pagarloja");

var dadoscartao = document.getElementById("dadoscartao");

var fName = window.localStorage.getItem("fName");

document.getElementById("numerocartao").value = "5162 9207 5761 3268";
document.getElementById("nomecartao").value = fName;
document.getElementById("cvvcartao").value = "195";
document.getElementById("anocartao").value = "2029";
document.getElementById("mescartao").value = "08";

var divPay = document.getElementById("pay");
var loading2 = document.querySelector(".loading2");

credtcard.addEventListener("change", () => {
  if(credtcard.checked) {
    pagarloja.checked = false;
    dadoscartao.classList.remove("hidepagamento");
    document.querySelector(".box-bnt2").classList.add("hidepagamento");
  }
  else {
    dadoscartao.classList.add("hidepagamento");
  }
});

pagarloja.addEventListener("change", () => {
  if(pagarloja.checked) {
    credtcard.checked = false;
    dadoscartao.classList.add("hidepagamento");
    document.querySelector(".box-bnt2").classList.remove("hidepagamento");
  }
  else {
    document.querySelector(".box-bnt2").classList.add("hidepagamento");
  }
});

classcredtcard.addEventListener("click", () => {
  if(credtcard.checked) {
    credtcard.checked = false;
    dadoscartao.classList.add("hidepagamento");
  }
  else {
    pagarloja.checked = false;
    credtcard.checked = true;
    dadoscartao.classList.remove("hidepagamento");
    document.querySelector(".box-bnt2").classList.add("hidepagamento");
  }
});

classpagarloja.addEventListener("click", () => {
  if(pagarloja.checked) {
    pagarloja.checked = false;
    document.querySelector(".box-bnt2").classList.add("hidepagamento");
  }
  else {
    credtcard.checked = false;
    pagarloja.checked = true;
    dadoscartao.classList.add("hidepagamento");
    document.querySelector(".box-bnt2").classList.remove("hidepagamento");
  }
});

function addCard() {
  var numCard = document.getElementById("numerocartao").value;
  var valid1 = document.getElementById("nomecartao").value
  var valid2 = document.getElementById("cvvcartao").value
  var valid3 = document.getElementById("anocartao").value
  var valid4 = document.getElementById("mescartao").value

  var semespaco = "";
  var semespaco = numCard.replace(/\s+/g, '');

  if(semespaco.length == 16) {
    if(valid1.length > 2 && valid2.length == 3 && valid3.length == 4 && valid4.length == 2) {
      var numCard1 = semespaco.slice(0,4);
      var numCard2 = semespaco.slice(4,8);
      var numCard3 = semespaco.slice(8,12);
      var numCard4 = semespaco.slice(12,16);
      
      var cardNumber = "****" + " " + numCard4

      var dataCard = document.getElementById("mescartao").value + "/" + document.getElementById("anocartao").value;

      document.querySelector(".card1").innerHTML = cardNumber;
      document.querySelector(".card2").innerHTML = fName;
      document.querySelector(".card3").innerHTML = dataCard;
      document.querySelector(".card4").innerHTML = "***";

      divPay.classList.add("hidepagamento");
      loading2.classList.remove("hidepagamento");

      setTimeout(function() {
        loading2.classList.add("hidepagamento");

        document.querySelector(".showcarddata").classList.remove("hidepagamento");
      }, 1000);
    }
    else {
      document.querySelector(".invalid-card").classList.remove("hidepagamento");
      document.querySelector(".invalid-card").classList.add("addblock");
    }
  }
  else {
    document.querySelector(".invalid-card").classList.remove("hidepagamento");
    document.querySelector(".invalid-card").classList.add("addblock");
  }
}

document.querySelector(".edit-card").addEventListener("click", () => {
  document.querySelector(".showcarddata").classList.add("hidepagamento");
  loading2.classList.remove("hidepagamento");

  setTimeout(function() {
    loading2.classList.add("hidepagamento");

    divPay.classList.remove("hidepagamento");
  }, 2000);
});

function FinalizarReserva() {

}