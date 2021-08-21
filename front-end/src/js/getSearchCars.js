const urlParams = new URLSearchParams(window.location.search);
function searchCar() {
  const urlParamCars = urlParams.get('search');

  var parseBack = atob(urlParamCars);
  var param = JSON.parse(parseBack);

  var text = document.querySelector(".txt");
  var txt = "Carros encontrados para o local de retirada: " + param['localRetirada'];
  text.innerHTML=txt;
  var url = "http://localhost:8186/LocadoraVeiculos/veiculos/disponibilidade";
  
  var consulta = new XMLHttpRequest();
  consulta.open("POST", url, true);
  consulta.setRequestHeader("Content-Type", "application/json");
  consulta.send(parseBack);

  consulta.addEventListener('loadend', () => {
    if (consulta.status == 200) {
      loading.classList.add("hideloading");
      
      var root = document.getElementById("cars");
      var json = JSON.parse(consulta.response);
      var tamanho = Object.keys(json['data']).length;
      
      for(i = 0; i < tamanho; i++) {
        var div = document.createElement("div");
        div.classList.add("showcar");
    
        var name = "car" + i;
        var data = json['data'][name];
    
        var img = document.createElement("img");
        img.classList.add("car");
        img.setAttribute('src', data['imgPath']);
        div.appendChild(img);
    
        var span = document.createElement("span");
        span.classList.add("titlecar");
        span.textContent=data['modelo'];
        div.appendChild(span);
    
        var p = document.createElement("p");
        p.classList.add("subcar");
        // p.textContent="Testando testando testando testando testando testando testando"
        p.innerHTML=data['subtitles'];
        div.appendChild(p);
    
        var a = document.createElement("a");
        a.classList.add("detalhes");
        a.textContent="DETALHES"
        a.setAttribute('href', "/src/pages/car.html?carId=" + data['idCarro'])
        div.appendChild(a);
    
        root.appendChild(div)
    
        if(i+1 == tamanho) { return; }
      }
    }
    else {
      document.getElementById("erro").classList.remove("esconde-erro")
    }
  });
}

searchCar();