var changethemecheck = document.getElementById("changethemecheck");
var imgmenu = document.getElementById("imgmenu");

changethemecheck.addEventListener("change", () => {
  if(changethemecheck.checked == true) {
    document.getElementById("changeTheme").setAttribute("href", "/src/css/themeColor1.css");
    imgmenu.setAttribute("src", "/src/img/img-manu1.png");
  }
  else {
    document.getElementById("changeTheme").setAttribute("href", "/src/css/themeColor.css");
    imgmenu.setAttribute("src", "/src/img/img-manu.png");
  }
});