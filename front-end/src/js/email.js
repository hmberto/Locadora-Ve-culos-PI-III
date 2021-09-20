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

  sendEmail()
}

function sendEmail() {
  if(document.querySelector(".confirmps").classList.contains("changeemailc1")) {
    document.querySelector(".confirmps").classList.remove("changeemailc1");
  }
  else {
    loading.classList.remove("hideloading");
    const getUrlParams = new URLSearchParams(window.location.search);
    const email = window.localStorage.getItem("email");
    const login = getUrlParams.get('l');
    var pass = document.querySelector(".confirmpass");

    var parsePass = btoa(pass.value);

    var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/email/update";
    var json = '{ "newEmail": "' + email + '", "login": "' + login + '", "pass": "' + parsePass + '" }';
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    console.log(json)

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
}

email();