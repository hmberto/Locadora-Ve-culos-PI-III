const urlParams = new URLSearchParams(window.location.search);

const urlParam = urlParams.get('carId');

function getCars() {
  loading.classList.remove("hideloading");

  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/veiculos/consulta";
  var jsonCar = '{ "carId": \"' + urlParam + '\" }';

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(jsonCar);

  xhttp.addEventListener('loadend', () => {
    if (xhttp.status == 200) {
      loading.classList.add("hideloading");

      var resp = JSON.parse(xhttp.response);
      console.log(resp)

      document.getElementById("carimg").setAttribute("src", resp['imgPath']);

      document.querySelector(".description").innerHTML="Teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste.";
      // document.querySelector("description").innerHTML=resp['subtitles'];
      
      document.getElementById("name").textContent=resp['modelo'];
      document.querySelector(".showmodelo").textContent=resp['modelo'];

      document.querySelector(".showmarca").textContent=resp['marca'];

      document.querySelector(".showportas").textContent=resp['numeroPortas'];

      document.querySelector(".showano").textContent=resp['ano'];
    }
    else {
      document.getElementById("erro").classList.remove("esconde-erro")
    }
  });
}

getCars();