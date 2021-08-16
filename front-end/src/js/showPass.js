var eyes = document.getElementById("passshow");
eyes.addEventListener("click", function(event) {
  var type = document.getElementById("pass");
  var type = document.getElementById("senha");

  if(type.type == "text") {
    type.type = "password";
  }
  else {
    type.type = "text";
  }
});