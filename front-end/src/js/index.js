var loading = document.getElementById("lding");
var cidades = [ "Sé", "Bela Vista", "Bom Retiro", "Cambuci", "Consolação", "Liberdade", "República", "Santa Cecília", "Aricanduva", "Carrão", "Vila Formosa", "Cidade Tiradentes", "Ermelino Matarazzo", "Ponte Rasa", "Guaianases", "Lajeado", "Itaim Paulista", "Vila Curuçá", "Itaquera", "Cidade Líder", "José Bonifácio", "Parque do Carmo", "Mooca Água Rasa", "Belém", "Brás", "Moóca", "Pari", "Tatuapé", "Penha", "Artur Alvim", "Cangaíba", "Penha", "Vila Matilde", "São Mateus", "São Rafael", "São Miguel ", "Jardim Helena", "Vila Jacuí", "Sapopemba", "Vila Prudente", "São Lucas", "Casa Verde", "Cachoeirinha", "Limão", "Brasilândia", " Freguesia do Ó", "Jaçanã", "Tremembé", "Perus", "Anhanguera", "Pirituba", "Jaraguá", "São Domingos", "Santana", "Tucuruvi", "Mandaqui", "Vila Maria", "Vila Guilherme", "Vila Medeiros", "Butantã", "Morumbi", "Raposo Tavares", "Rio Pequeno", "Vila Sônia", "Lapa", "Barra Funda", "Jaguara", "Jaguaré", "Perdizes", "Vila Leopoldina", "Pinheiros", "Alto de Pinheiros", "Itaim Bibi", "Jardim Paulista", "Pinheiros", "Campo Limpo", "Capão Redondo", "Vila Andrade", "Capela do Socorro Cidade Dutra", "Grajaú", "Socorro", "Cidade Ademar", "Pedreira", "Ipiranga", "Sacomã", "Jabaquara", "M'Boi Mirim", "Jardim Ângela", "Jardim São Luís", "Parelheiros", "Marsilac", "Santo Amaro", "Campo Belo", "Campo Grande", "Santo Amaro", "Moema", "Saúde", "Vila Mariana" ];

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;

      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;

      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      
      this.parentNode.appendChild(a);
      
      t = 0;
      for (i = 0; i < arr.length; i++) {
        
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          t++;
          if(t < 6){
            b = document.createElement("DIV");
            
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);

            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              
              inp.value = this.getElementsByTagName("input")[0].value;
              
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      }
  });

  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } 
      else if (e.keyCode == 38) {
        currentFocus--;

        addActive(x);
      } 
      else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;

    removeActive(x);

    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);

    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("retirada"), cidades);
autocomplete(document.getElementById("entrega"), cidades);

function getCars() {
  loading.classList.remove("hideloading");

  var url = "http://localhost:8186/LocadoraVeiculos/veiculos/todos";
    
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();

  xhttp.addEventListener('loadend', () => {
    if (xhttp.status == 200) {
      loading.classList.add("hideloading");
      
      var root = document.getElementById("cars");
      var json = JSON.parse(xhttp.response);
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

  xhttp.onreadystatechange = function() {
    if(this.status == 200) {
      
    }
  }
}

getCars();