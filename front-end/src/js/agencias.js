var loading = document.getElementById("lding");

function searchAgencias() {
  var session = window.localStorage.getItem("session");
  if(session != null) {
    if(session.length == 50) {
      ifLogged(session);
    }
  }
  
  loading.classList.remove("hideloading");
  var text = document.querySelector(".txt");
  
  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/veiculos/agencias";
  
  var agencias = new XMLHttpRequest();
  agencias.open("GET", url, true);
  agencias.send();

  agencias.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    var div = document.getElementById("agencias");
    if (agencias.status == 200) {
      var json = JSON.parse(agencias.response);
      var tamanho = Object.keys(Object.keys(json['data'])).length;

      text.innerHTML="Pesquise por agências próximas: " + tamanho + " agências encontradas";
            
      for(i = 0; i < tamanho; i++) {
        var agencia = json['data']['agencia' + i]['agencia'];

        var li = document.createElement("li");
        li.innerHTML=agencia
        li.classList.add("font-black");

        div.appendChild(li);
      }
    }
    else {
      document.getElementById("erro").classList.remove("esconde-erro")
    }
  });
}

searchAgencias();