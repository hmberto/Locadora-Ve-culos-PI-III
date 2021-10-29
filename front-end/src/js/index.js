var loading = document.getElementById("lding");
var cidades = [ "Bela Vista", "Bom Retiro", "Cambuci", "Liberdade", "Aricanduva", "Vila Formosa", "Cidade Tiradentes", "Ermelino Matarazzo", "Ponte Rasa", "Guaianases", "Lajeado", "Itaim Paulista", "Itaquera", "Parque do Carmo", "Pari", "Penha", "Artur Alvim", "Vila Matilde", "Jardim Helena", "Sapopemba", "Vila Prudente", "Casa Verde", "Cachoeirinha", "Perus", "Anhanguera", "Pirituba", "Santana", "Tucuruvi", "Mandaqui", "Vila Maria", "Vila Guilherme", "Vila Medeiros", "Morumbi", "Raposo Tavares", "Rio Pequeno", "Lapa", "Barra Funda", "Jaguara", "Perdizes", "Vila Leopoldina", "Pinheiros", "Alto de Pinheiros", "Itaim Bibi", "Jardim Paulista", "Campo Limpo", "Vila Andrade", "Socorro", "Cidade Ademar", "Pedreira", "Ipiranga", "Jabaquara", "Parelheiros", "Marsilac", "Campo Belo", "Campo Grande", "Santo Amaro", "Moema", "Vila Mariana" ];

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
      
      f = 0;
      t = 0;
      for (i = 0; i < arr.length; i++) {
        
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          t++;
          if(t < 6){
            f++;
            b = document.createElement("DIV");
            
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);

            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              
              inp.value = this.getElementsByTagName("input")[0].value;
              
              closeAllLists();
              document.getElementById("entrega").focus();
              });
            a.appendChild(b);
          }
        }
      }

      if(f == 0){
        b = document.createElement("DIV");
        
        b.innerHTML += "Nenhum resultado";
          b.addEventListener("click", function(e) {
          
            inp.value = "";
            closeAllLists();
        });
        a.appendChild(b);
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
  var session = window.localStorage.getItem("session");
  if(session != null) {
    if(session.length == 50) {
      ifLogged(session);
    }
  }

  loading.classList.remove("hideloading");

  var url = "http://3.144.171.211:8186/LocadoraVeiculos/veiculos/todos";
  
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();

  xhttp.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if (xhttp.status == 200) {      
      var root = document.getElementById("cars");
      var json = JSON.parse(xhttp.response);
      var tamanho = Object.keys(json['data']).length;
      
      var i = 0;
      var array = [];
      while(i < tamanho) {
        min = Math.ceil(0);
        max = Math.floor(tamanho);
        var aleatorio = Math.floor(Math.random() * (max - min)) + min;

        if(!array.includes(aleatorio)) {
          array.push(aleatorio);
          var div = document.createElement("div");
          div.classList.add("showcar");
          div.classList.add("white-color-bg");

          var div1 = document.createElement("div");
          div1.classList.add("showcar1");
          div.appendChild(div1);

          var name = "car" + aleatorio;
          var data = json['data'][name];

          var img = document.createElement("img");
          img.classList.add("car");
          img.setAttribute('src', data['imgPath']);
          div1.appendChild(img);

          var span = document.createElement("span");
          span.classList.add("titlecar");
          span.classList.add("font-green");
          span.textContent=data['modelo'];
          div.appendChild(span);

          var p = document.createElement("p");
          p.classList.add("subcar");
          p.classList.add("font-black");
          p.innerHTML=data['subtitles'];
          div.appendChild(p);

          var a = document.createElement("a");
          a.classList.add("detalhes");
          a.classList.add("font-white1");
          a.classList.add("black-green-color-bg");
          a.textContent="DETALHES"
          a.setAttribute('href', "/src/pages/car.html?carId=" + data['idCarro'])
          div.appendChild(a);

          root.appendChild(div)

          i = i + 1;
          // if(i+1 == tamanho) { return; }
        }
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