var chatbox = document.getElementById("chatbox");
var showchatbox = document.getElementById("showchatbox");

chatbox.addEventListener("click", () => {
  var teste = showchatbox.classList.contains("chathide");

  if(teste) {
    showchatbox.classList.remove("chathide");
  }
  else {
    showchatbox.classList.add("chathide");
  }
});