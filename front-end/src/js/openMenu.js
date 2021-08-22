var menubtn = document.getElementById("imgmenu");
var fixedmenu = document.getElementById("header");

menubtn.addEventListener('click', () => {
  var showmenu = document.querySelector(".menu1");
  var verifyclass = showmenu.classList.contains("hidemenu")

  if(verifyclass) {
    showmenu.classList.remove("hidemenu");
  }
  else {
    showmenu.classList.add("hidemenu");
  }
});