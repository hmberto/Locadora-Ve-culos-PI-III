function validateLogin(fName, session, name, logout) {
  window.localStorage.setItem("fName", fName);
  
  name.innerHTML=fName;
  name.setAttribute("href", "#");

  logout.innerHTML="Sair";
  logout.setAttribute("href", "#");

  logout.addEventListener("click", () => {
    var url2 = "http://3.144.171.211:8186/LocadoraVeiculos/clientes/logout";
    var json2 = '{"session": "' + session + '"}';

    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("POST", url2, true);
    xhttp2.setRequestHeader("Content-Type", "application/json");

    xhttp2.send(json2);

    xhttp2.addEventListener('loadend', () => {
      if(xhttp2.status == 200) {
        window.localStorage.setItem("session", null);
        window.localStorage.setItem("fName", null);
        window.location.replace("/");
      }
    });
  });

  name.addEventListener("click", () => {
    window.location.replace("/src/pages/user.html");
  })
}

function ifLogged(session, t) {
  var name = document.querySelector(".btn1");
  var logout = document.querySelector(".btn2");

  var url = "http://3.144.171.211:8186/LocadoraVeiculos/clientes/user";
  var json = '{"session": "' + session + '"}';

  var jsonRes = "";

  if(t == 1) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(json);

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        var resp = JSON.parse(xhttp.response);
        var uName = resp['nome'].split(" ");
        var fName = uName[0];

        validateLogin(fName, session, name, logout);
      }
      else if (xhttp.status == 400) {
        window.localStorage.setItem("session", null);
        window.localStorage.setItem("fName", null);
      }
      var t = document.getElementById("userInfoInpt");
      if(t != null) {
        t.value=xhttp.response;
      }
    });
  }
  else {
    var name = document.querySelector(".btn1");
    var logout = document.querySelector(".btn2");

    var session = window.localStorage.getItem("session");
    var fName = window.localStorage.getItem("fName");

    if(session != null && fName != null) {
      if(session.length == 50 && fName.length > 1) {
        validateLogin(fName, session, name, logout);
      }
    }
  }
  return xhttp;
}