function consulta(idOrCpf) {
  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/location/consult";
  var json = '{ "idOrCpf": \"' + idOrCpf + '\" }';

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(json);

  return xhttp;
}