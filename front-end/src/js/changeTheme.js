var changethemecheck = document.getElementById("changethemecheck");
var imgmenu = document.getElementById("imgmenu");

var themeColor = window.localStorage.getItem("sessionColor");

if(themeColor == "dark") {
  document.getElementById("changeTheme").setAttribute("href", "/src/css/themeColor1.css");
  imgmenu.setAttribute("src", "/src/img/img-manu1.png");
  changethemecheck.checked = true;
}

changethemecheck.addEventListener("change", () => {
  if(changethemecheck.checked == true) {
    document.getElementById("changeTheme").setAttribute("href", "/src/css/themeColor1.css");
    imgmenu.setAttribute("src", "/src/img/img-manu1.png");
    window.localStorage.setItem("sessionColor", "dark");
  }
  else {
    document.getElementById("changeTheme").setAttribute("href", "/src/css/themeColor.css");
    imgmenu.setAttribute("src", "/src/img/img-manu.png");
    window.localStorage.setItem("sessionColor", null);
  }
});