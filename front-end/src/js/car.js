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

      document.getElementById("name").textContent=resp['modelo'];
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