function logoutlink() {
  const urlParams = new URLSearchParams(window.location.search);
  const session = urlParams.get('s');

  if(session != null && session.length == 50) {
    var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/logout";
    var json = '{"session": "' + session + '"}';

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(json);

    xhttp2.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        window.localStorage.setItem("session", null);
        window.localStorage.setItem("fName", null);
        window.location.replace("/src/pages/pwdreset.html");
      }
      else {
        window.location.replace("/");
      }
    });
  }
}

logoutlink();