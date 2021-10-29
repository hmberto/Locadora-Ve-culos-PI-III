function consulta(idOrCpf) {
  var url = "http://3.144.171.211:8186/LocadoraVeiculos/location/consult";
  var json = '{ "idOrCpf": \"' + idOrCpf + '\" }';

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(json);

  return xhttp;
}