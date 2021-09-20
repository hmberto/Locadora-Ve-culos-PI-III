const urlParams9 = new URLSearchParams(window.location.search);
const urlParam9 = urlParams9.get('p');
const urlParam8 = urlParams9.get('q');
const urlParam12 = urlParams9.get('x');
const urlParam15 = urlParams9.get('j');
const urlParam16 = urlParams9.get('d');
const urlParam17 = urlParams9.get('g');
const urlParam18 = urlParams9.get('s');

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

if(urlParam15 == "dw" && window.localStorage.getItem("j") == "dw") {
  setTimeout(function() {
    document.querySelector(".not").classList.remove("notificationhide");
    document.querySelector(".spncont").innerHTML="Data alterada com sucesso!";
    window.localStorage.setItem("j", '');

    setTimeout(function() {
      document.querySelector(".not").classList.add("notificationhide");
      document.querySelector(".spncont").innerHTML="";
    }, 5000);
  }, 1000);
}

if(urlParam16 == "lw" && window.localStorage.getItem("d") == "lw") {
  setTimeout(function() {
    document.querySelector(".not").classList.remove("notificationhide");
    document.querySelector(".spncont").innerHTML="E-mail confirmado com sucesso!";
    window.localStorage.setItem("d", '');

    setTimeout(function() {
      document.querySelector(".not").classList.add("notificationhide");
      document.querySelector(".spncont").innerHTML="";
    }, 5000);
  }, 1000);
}

if(urlParam17 == "zk" && window.localStorage.getItem("g") == "zk") {
  setTimeout(function() {
    document.querySelector(".not").classList.remove("notificationhide");
    document.querySelector(".spncont").innerHTML="Erro ao confirmar seu e-mail!";
    window.localStorage.setItem("g", '');

    setTimeout(function() {
      document.querySelector(".not").classList.add("notificationhide");
      document.querySelector(".spncont").innerHTML="";
    }, 5000);
  }, 1000);
}

if(urlParam18 == "my" && window.localStorage.getItem("s") == "my") {
  setTimeout(function() {
    document.querySelector(".not").classList.remove("notificationhide");
    document.querySelector(".spncont").innerHTML="E-mail atualizado com sucesso!";
    window.localStorage.setItem("s", '');

    setTimeout(function() {
      document.querySelector(".not").classList.add("notificationhide");
      document.querySelector(".spncont").innerHTML="";
    }, 5000);
  }, 1000);
}