var menubtn = document.getElementById("imgmenu");
var fixedmenu = document.getElementById("header");

menubtn.addEventListener('click', () => {
  var showmenu1 = document.querySelector(".menu1");
  var showmenu2 = document.querySelector(".menu2");

  var verifyclass = showmenu1.classList.contains("hidemenu")

  if(verifyclass) {
    showmenu1.classList.remove("hidemenu");
    showmenu2.classList.remove("hidemenu2");
  }
  else {
    showmenu1.classList.add("hidemenu");
    showmenu2.classList.add("hidemenu2");
  }
});