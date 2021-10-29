var loading = document.getElementById("lding");
loading.classList.add("hideloading");

function email() {
  const getUrlParams = new URLSearchParams(window.location.search);
  const n = getUrlParams.get('n');
  const e = getUrlParams.get('em');
  const l = getUrlParams.get('l');

  if(n != null && n != "" && n != "null" 
      && e != null && e != "" && e != "null"
      && l != null && l != "" && l != "null") {
    window.localStorage.setItem("email", e);

    document.querySelector(".title").innerHTML="Olá, " + n + "! <br>Verifique seu endereço de e-mail";
    document.querySelector(".showemail").innerHTML=window.localStorage.getItem("email") + "<br>alterar";
    document.querySelector(".showemail").addEventListener("click", () => {
      document.querySelector(".changeemailc").classList.remove("changeemailc1");
      document.querySelector(".changeemailbtn1").classList.remove("changeemailc1");
      document.querySelector(".changeemailbtn2").classList.remove("changeemailc1");
      document.querySelector(".showemail").classList.add("changeemailc1");
      document.querySelector(".confirmps").classList.add("changeemailc1");
      document.querySelector(".changeemailc").value = window.localStorage.getItem("email");
      document.querySelector(".changeemailc").focus();
    });
  }
  else {
    window.location.replace("/src/pages/login.html");
  }
}

function cancelar() {
  document.querySelector(".changeemailc").classList.add("changeemailc1");
  document.querySelector(".changeemailbtn1").classList.add("changeemailc1");
  document.querySelector(".changeemailbtn2").classList.add("changeemailc1");
  document.querySelector(".showemail").classList.remove("changeemailc1");
  document.querySelector(".showemail").innerHTML=window.localStorage.getItem("email") + "<br>alterar";
}

function salvar() {
  document.querySelector(".changeemailc").classList.add("changeemailc1");
  document.querySelector(".changeemailbtn1").classList.add("changeemailc1");
  document.querySelector(".changeemailbtn2").classList.add("changeemailc1");
  document.querySelector(".showemail").classList.remove("changeemailc1");
  window.localStorage.setItem("email", document.querySelector(".changeemailc").value);
  document.querySelector(".showemail").innerHTML=window.localStorage.getItem("email") + "<br>alterar";

  sendEmail();
}

function sendEmail() {
  if(document.querySelector(".confirmps").classList.contains("changeemailc1")) {
    document.querySelector(".confirmps").classList.remove("changeemailc1");
    document.querySelector(".confirmpass").focus();
  }
  else {
    if(document.querySelector(".confirmpass").value != "") {
      loading.classList.remove("hideloading");
      const getUrlParams = new URLSearchParams(window.location.search);
      const email = window.localStorage.getItem("email");
      const login = getUrlParams.get('l');
      var pass = document.querySelector(".confirmpass");

      var parsePass = btoa(pass.value);

      var url = "http://3.144.171.211:8186/LocadoraVeiculos/email/update";
      var json = '{ "newEmail": "' + email + '", "login": "' + login + '", "pass": "' + parsePass + '" }';
      
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-Type", "application/json");

      xhttp.send(json);

      xhttp.addEventListener('loadend', () => {
        window.localStorage.setItem("email", null);
        loading.classList.add("hideloading");
        if(xhttp.status == 200) {
          window.location.replace("/src/pages/login.html?s=my");
          window.localStorage.setItem("s", 'my');
        }
        else {
          window.location.replace("/src/pages/login.html?b=gk");
          window.localStorage.setItem("b", 'gk');
        }
      });
    }
    else {
      document.querySelector(".confirmpass").focus();
    }
  }
}

email();

document.querySelector(".confirmpass").addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
    sendEmail();
  }
});