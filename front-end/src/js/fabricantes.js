function searchCar() {
  var text = document.querySelector(".txt");
  var txt = "Fabricantes encontradas: ";
  text.innerHTML=txt;
  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/veiculos/marcas";
  
  var marcas = new XMLHttpRequest();
  marcas.open("GET", url, true);
  marcas.send();

  marcas.addEventListener('loadend', () => {
    var div = document.getElementById("marcas");
    if (marcas.status == 200) {
      loading.classList.add("hideloading");

      var json = JSON.parse(marcas.response);
      var tamanho = Object.keys(Object.keys(json['data'])).length;
      
      for(i = 0; i < tamanho; i++) {
        var marca = json['data']['marca' + i]['marca'];

        var li = document.createElement("li");
        li.innerHTML=marca

        var a = document.createElement("a");
        a.setAttribute("href", "/src/pages/pormarca.html?marca=" + marca);
        a.innerHTML="Ver carros"

        div.appendChild(li);
        div.appendChild(a);
      }
    }
    else {
      loading.classList.add("hideloading");
      document.getElementById("erro").classList.remove("esconde-erro")
    }
  });
}

searchCar();