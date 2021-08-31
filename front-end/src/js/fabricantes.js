var loading = document.getElementById("lding");

function searchFabricantes() {
  var session = sessionStorage.getItem("session");
  if(session != null) {
    if(session.length == 50) {
      ifLogged(session);
    }
  }
  
  loading.classList.remove("hideloading");
  var text = document.querySelector(".txt");
  var txt = "Fabricantes encontradas: ";
  text.innerHTML=txt;
  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/veiculos/marcas";
  
  var marcas = new XMLHttpRequest();
  marcas.open("GET", url, true);
  marcas.send();

  marcas.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    var div = document.getElementById("marcas");
    if (marcas.status == 200) {
      var json = JSON.parse(marcas.response);
      var tamanho = Object.keys(Object.keys(json['data'])).length;
      
      for(i = 0; i < tamanho; i++) {
        var marca = json['data']['marca' + i]['marca'];

        var li = document.createElement("li");
        li.classList.add("font-black");
        li.innerHTML=marca

        var a = document.createElement("a");
        a.setAttribute("href", "/src/pages/pormarca.html?marca=" + marca);
        a.innerHTML="Ver carros"
        a.classList.add("font-green");

        div.appendChild(li);
        div.appendChild(a);
      }
    }
    else {
      document.getElementById("erro").classList.remove("esconde-erro")
    }
  });
}

searchFabricantes();