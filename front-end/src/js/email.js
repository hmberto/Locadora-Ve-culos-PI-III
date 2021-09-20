var loading = document.getElementById("lding");
loading.classList.add("hideloading");

function email() {
  const getUrlParams = new URLSearchParams(window.location.search);
  const n = getUrlParams.get('n');
  const e = getUrlParams.get('em');
  const l = getUrlParams.get('l');

  window.localStorage.setItem("email", e);

  document.querySelector(".title").innerHTML="Olá, " + n + "! <br>Verifique seu endereço de e-mail";
  document.querySelector(".showemail").innerHTML=window.localStorage.getItem("email") + "<br>alterar";
  document.querySelector(".showemail").addEventListener("click", () => {
    document.querySelector(".changeemailc").classList.remove("changeemailc1");
    document.querySelector(".changeemailbtn1").classList.remove("changeemailc1");
    document.querySelector(".changeemailbtn2").classList.remove("changeemailc1");
    document.querySelector(".showemail").classList.add("changeemailc1");
    document.querySelector(".changeemailc").value = window.localStorage.getItem("email");
  });
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
}

function sendEmail() {
  if(document.querySelector(".confirmps").classList.contains("changeemailc1")) {
    document.querySelector(".confirmps").classList.remove("changeemailc1");
  }
  else {
    const getUrlParams = new URLSearchParams(window.location.search);
    const email = window.localStorage.getItem("email");
    const login = getUrlParams.get('l');
    const pass = document.querySelector(".confirmpss").value;

    var parsePass = btoa(pass);

    var json = '{ "newEmail": "' + email + '", "login": "' + login + '", "pass": "' + parsePass + '" }';
    window.localStorage.setItem("email", null);
  }
}

email();