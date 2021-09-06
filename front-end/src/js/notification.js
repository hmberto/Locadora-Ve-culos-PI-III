const urlParams9 = new URLSearchParams(window.location.search);
const urlParam9 = urlParams9.get('p');
const urlParam8 = urlParams9.get('q');
const urlParam12 = urlParams9.get('x');

if(urlParam9 == "pu" && window.localStorage.getItem("p") == "pu") {
  setTimeout(function() {
    document.querySelector(".not").classList.remove("notificationhide");
    document.querySelector(".spncont").innerHTML="Senha alterada com sucesso!";
    window.localStorage.setItem("p", '');

    setTimeout(function() {
      document.querySelector(".not").classList.add("notificationhide");
      document.querySelector(".spncont").innerHTML="";
    }, 5000);
  }, 1000);
}

if(urlParam8 == "px" && window.localStorage.getItem("q") == "px") {
  setTimeout(function() {
    document.querySelector(".not").classList.remove("notificationhide");
    document.querySelector(".spncont").innerHTML="Reserva cancelada com sucesso!";
    window.localStorage.setItem("q", '');

    setTimeout(function() {
      document.querySelector(".not").classList.add("notificationhide");
      document.querySelector(".spncont").innerHTML="";
    }, 5000);
  }, 1000);
}

if(urlParam12 == "hu" && window.localStorage.getItem("x") == "hu") {
  setTimeout(function() {
    document.querySelector(".not").classList.remove("notificationhide");
    document.querySelector(".spncont").innerHTML="Reserva paga com sucesso!";
    window.localStorage.setItem("x", '');

    setTimeout(function() {
      document.querySelector(".not").classList.add("notificationhide");
      document.querySelector(".spncont").innerHTML="";
    }, 5000);
  }, 1000);
}