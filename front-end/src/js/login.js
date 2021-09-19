var user = document.getElementById("user");
var pass = document.getElementById("senha");
var button = document.getElementById("button");
var erro = document.getElementById("erro");
var textoerro = document.getElementById("textoerro");
var loading = document.getElementById("lding");

const urlParams2 = new URLSearchParams(window.location.search);
const urlParam2 = urlParams2.get('carId');

const urlParams7 = new URLSearchParams(window.location.search);
const number7 = urlParams7.get('u');

var themeColor = window.localStorage.getItem("sessionColor");
var passimg = document.getElementById("passshow");
if(themeColor == "dark") {
  passimg.setAttribute("src", "/src/img/pass-dark.png");
  user.classList.remove("inpt-light");
  user.classList.add("inpt-dark");
  pass.classList.remove("inpt-light");
  pass.classList.add("inpt-dark");
}

var session = window.localStorage.getItem("session");
if(session != null) {
  if(session.length == 50) {
    window.location.replace("/");
  }
}

loading.classList.add("hideloading");
user.focus();

function getValue() {
  loading.classList.remove("hideloading");
  
  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/login";
  
  var parseUser = btoa(user.value);
  var parsePass = btoa(pass.value);
  
  var usuario = parseUser;
  var senha = parsePass;

  var json = '{"user":"' + usuario + '","pass":"' + senha + '"}'

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.send(json);

  xhttp.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if(xhttp.status == 200) {
      var resp = JSON.parse(xhttp.response);

      erro.classList.remove("azul");
      erro.classList.remove("vermelho");
      erro.classList.add("verde");

      textoerro.textContent="Bem vindo!";

      var session = JSON.parse(xhttp.response);

      window.localStorage.setItem("session", session['session']);

      var xhttp2 = ifLogged(session['session'], 1);
      xhttp2.addEventListener('loadend', () => {
        if(urlParam2 != null && urlParam2.length > 3) {
          window.location.replace("/src/pages/car.html?carId=" + urlParam2);
        }
        else if(number7 != null && number7.length > 3) {
          window.location.replace("/src/pages/detalhes.html?u=" + number7);
        }
        else {
          window.location.replace("/");
        }
      });
    }
    else {
      erro.classList.remove("azul");
      erro.classList.remove("verde");
      erro.classList.add("vermelho");
      textoerro.textContent="Login inválido";
      
      user.focus();
    }
  });

  user.value = "";
  pass.value = "";
}

user.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    pass.focus();
  }
});

pass.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    getValue();
  }
});

var eyes = document.getElementById("passshow");
eyes.addEventListener("click", function(event) {
  pass.focus();
});