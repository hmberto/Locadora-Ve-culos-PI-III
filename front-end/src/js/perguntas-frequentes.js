var loading = document.getElementById("lding");
var seta = document.querySelectorAll(".img-seta");
var showTxt = document.querySelectorAll(".txt-qst-1");
var questionBox = document.querySelectorAll(".question-box");

function darkTheme() {
  var themeColor = window.localStorage.getItem("sessionColor");

  if(themeColor != "dark") {
    var allSetas = document.querySelectorAll(".img-seta");

    console.log(allSetas.length);
    for(i=0; i < allSetas.length; i++) {
      allSetas[i].setAttribute("src", "/src/img/seta-dark.png")
    }
  }
}

darkTheme();

function perguntasFrequentes() {
  loading.classList.add("hideloading");
  var session = window.localStorage.getItem("session");
  if(session != null) {
    if(session.length == 50) {
      ifLogged(session);
    }
  }
}

perguntasFrequentes();

function rotateSeta() {
  for(i=0; i < seta.length; i++) {
    (function(index){
      questionBox[i].addEventListener("click", function(){
        if(seta[index].classList.contains("prolado")) {
          seta[index].classList.remove("prolado");
          showTxt[index].classList.remove("hide-txt");
          showTxt[index].classList.add("show-txt");
        }
        else {
          seta[index].classList.add("prolado");
          showTxt[index].classList.remove("show-txt");
          showTxt[index].classList.add("hide-txt");
        }
      });
    })(i);
  }
}

rotateSeta();