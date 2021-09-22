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

const urlParams = new URLSearchParams(window.location.search);
const emailConfirmed = urlParams.get('e');

if(emailConfirmed == "false") {
  erro.classList.remove("azul");
  erro.classList.add("vermelho");
  erro.classList.remove("verde");

  textoerro.textContent="Confirme seu e-mail.";

  const getUrlParams = new URLSearchParams(window.location.search);
  const n = urlParams.get('n');
  const e = urlParams.get('em');
  const l = urlParams.get('l');

  var changeEmail = "?n=" + n + "&em=" + e + "&l=" + l;

  document.querySelector(".resetemail").setAttribute("href", "/src/pages/email.html" + changeEmail);

  document.querySelector(".esqueceuemail").classList.remove("esqueceuemailhide");
}

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

var meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

var dias = ["domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

function formatarData(data) {
  var ano = data.getFullYear();
  var hora = data.getHours() + 1;
  var min = data.getMinutes();
  var mes = meses[data.getMonth()];
  return "Em " + data.getDate() + " de " + mes + " de " + ano + " às " + newgetHora();
}

function newgetHora() {
  var data = new Date();
  var hora = data.getHours();
  var min = data.getMinutes(); 

  var horaatual = hora + ":" + min + "h";

  if(hora == 0 || min == 0) {
    if(hora == 0 && min == 0) {
      var horaatual = "00" + ":" + "00" + "h";
    }
    else if(hora == 0) {
      var horaatual = "00" + ":" + min + "h";
    }
    else if(min == 0) {
      var horaatual = hora + ":" + "00" + "h";
    }
  }
  if(hora < 10 || min < 10) {
    if(hora < 10 && min < 10) {
      var horaatual = "0" + hora + ":0" + min + "h";
    }
    else if(hora < 10) {
      var horaatual = "0" + hora + ":" + min + "h";
    }
    else if(min < 10) {
      var horaatual = hora + ":0" + min + "h";
    }
  }

  return horaatual;
}

function geoIp() {
  button.disabled = true;
  if(window.localStorage.getItem("ip") != null 
  && window.localStorage.getItem("ip") != "null"
  && window.localStorage.getItem("ip") != "") {}
  else {
    var urlIp = "https://ipapi.co/json/";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", urlIp, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      button.disabled = false;
      
      if(xhttp.status == 200) {
        var location = JSON.parse(xhttp.response);

        var ip = location['ip'];
        var city = location['city'];
        var region = location['region_code'];
        var country = location['country_code'];

        if(country == "BR") {
          country = "Brasil";
        }

        var loc = city + " - " + region;

        window.localStorage.setItem("ip", ip);
        window.localStorage.setItem("location", loc);
      }
    });
  }
}

geoIp();

function getValue() {
  var txt = "";
  var OSNome = "";
  var OSName = "";
  var navegador = "";
 
  txt += "\n\nBrowser CodeName: " + navigator.appCodeName;
  txt += "\n\nBrowser Name: " + navigator.appName;
  txt += "\n\nBrowser Version: " + navigator.appVersion;
  txt += "\n\nCookies Enabled: " + navigator.cookieEnabled;
  txt += "\n\nBrowser Language: " + navigator.language;
  txt += "\n\nBrowser Online: " + navigator.onLine;
  txt += "\n\nPlatform: " + navigator.platform;
  txt += "\n\nUser-agent header: " + navigator.userAgent;

  txt = txt.toUpperCase();

  if(txt.includes("CHROME")) { navegador = "Google Chrome"; }
  else if(txt.includes("FIREFOX")) { navegador = "Firefox"; }
  else if(txt.includes("OPERA")) { navegador = "Opera"; }
  else if(txt.includes("MSIE")) { navegador = "Internet Explorer"; }
  else { navegador = "Desconhecido" }

  if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) OSNome="Windows 10";
  else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSNome="Windows 8";
  else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSNome="Windows 7";
  else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSNome="Windows Vista";
  else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSNome="Windows XP";
  else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSNome="Windows 2000";
  else if (window.navigator.userAgent.indexOf("Android") != -1) OSNome="Android";
  else if (window.navigator.userAgent.indexOf("webOS") != -1) OSNome="webOS";
  else if (window.navigator.userAgent.indexOf("iPhone") != -1) OSNome="iPhone";
  else if (window.navigator.userAgent.indexOf("iPad") != -1) OSNome="iPad";
  else if (window.navigator.userAgent.indexOf("iPod") != -1) OSNome="iPod";
  else if (window.navigator.userAgent.indexOf("BlackBerry") != -1) OSNome="BlackBerry";
  else if (window.navigator.userAgent.indexOf("Windows Phone") != -1) OSNome="Windows Phone";
  else if (window.navigator.userAgent.indexOf("Mac") != -1) OSNome="Mac/iOS";
  else if (window.navigator.userAgent.indexOf("X11") != -1) OSNome="UNIX";
  else if (window.navigator.userAgent.indexOf("Linux") != -1) OSNome="Linux";
  else { OSNome="Desconhecido" }

  var data = new Date();

  var userLocation = "Sem localização";

  if(window.localStorage.getItem("location") != null 
  && window.localStorage.getItem("location") != "null"
  && window.localStorage.getItem("location") != "") {
    userLocation = window.localStorage.getItem("location");
  }

  OSName = OSNome + " - " + navegador + "<br><br>" + formatarData(data) + "<br>" + userLocation;
  
  loading.classList.remove("hideloading");
  
  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/login";
  
  var parseUser = btoa(user.value);
  var parsePass = btoa(pass.value);
  
  var usuario = parseUser;
  var senha = parsePass;

  var newLogin = true;

  if(window.localStorage.getItem("newLogin") == "false") {
    newLogin = false;
  }

  var json = '{ "user":"' + usuario + '", "pass":"' + senha + '", "newLogin":"' + newLogin + '", "loginInfo":"' + OSName + '" }';

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
      window.localStorage.setItem("newLogin", false);

      var xhttp2 = ifLogged(session['session'], 1);
      xhttp2.addEventListener('loadend', () => {
        var confirm = JSON.parse(xhttp2.response);
        var email = confirm['emailConfirmado'];

        if(email == 1) {
          if(urlParam2 != null && urlParam2.length > 3) {
            window.location.replace("/src/pages/car.html?carId=" + urlParam2);
          }
          else if(number7 != null && number7.length > 3) {
            window.location.replace("/src/pages/detalhes.html?u=" + number7);
          }
          else {
            window.location.replace("/");
          }
        }
        if(email == 0) {
          erro.classList.remove("azul");
          erro.classList.add("vermelho");
          erro.classList.remove("verde");

          textoerro.textContent="Confirme seu e-mail.";

          var url2 = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/logout";
          var json2 = '{"session": "' + session['session'] + '"}';

          var xhttp5 = new XMLHttpRequest();
          xhttp5.open("POST", url2, true);
          xhttp5.setRequestHeader("Content-Type", "application/json");

          xhttp5.send(json2);

          xhttp5.addEventListener('loadend', () => {
            if(xhttp5.status == 200) {
              var newUrlParams = "&n=" + window.localStorage.getItem("fName") + "&em=" + confirm['email'] + "&l=" + confirm['login']
              window.localStorage.setItem("session", null);
              window.localStorage.setItem("fName", null);

              window.location.replace("/src/pages/login.html?e=false" + newUrlParams);
            }
          });
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