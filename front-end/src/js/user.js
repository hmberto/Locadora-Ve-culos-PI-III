var session = sessionStorage.getItem("session");
var loading = document.getElementById("lding");

function getUser() {
  if(session != null && session.length == 50) {
    loading.classList.remove("hideloading");
    var xhttp = ifLogged(session);
    
    xhttp.addEventListener('loadend', () => {
      loading.classList.add("hideloading");
      var usrJson = JSON.parse(document.getElementById("userInfoInpt").value);

      document.querySelector(".userName").innerHTML=usrJson['nome'];

      var complemento = "";
      var sexo = "";

      if(usrJson['complemento'] != "null") {
        complemento = " - " + usrJson['complemento'];
      }

      if(usrJson['sexo'] == 1) {
        sexo = "Não informar";
      }
      else if(usrJson['sexo'] == 2) {
        sexo = "Masculino";
      }
      else if(usrJson['sexo'] == 3) {
        sexo = "Feminino";
      }
      else if(usrJson['sexo'] == 4) {
        sexo = "Outros";
      }

      if(usrJson['telefone'] == "0000000000") {
        document.querySelector(".tell").classList.add("hidecampo");
      }
      
      document.querySelector(".bairro").innerHTML=usrJson['bairro'];
      document.querySelector(".categoriaCnh").innerHTML=usrJson['categoriaCnh'];
      document.querySelector(".celular").innerHTML=usrJson['celular'];
      document.querySelector(".cep").innerHTML=usrJson['cep'];
      document.querySelector(".cidade").innerHTML=usrJson['cidade'];
      document.querySelector(".cpf").innerHTML=usrJson['cpf'];
      document.querySelector(".dataNascimento").innerHTML=usrJson['dataNascimento'];
      document.querySelector(".email").innerHTML=usrJson['email'];
      document.querySelector(".estado").innerHTML=usrJson['estado'];
      document.querySelector(".login").innerHTML=usrJson['login'];
      document.querySelector(".numeroCnh").innerHTML=usrJson['numeroCnh'];
      document.querySelector(".registroCnh").innerHTML=usrJson['registroCnh'];
      document.querySelector(".rg").innerHTML=usrJson['rg'];
      document.querySelector(".rua").innerHTML=usrJson['rua'];
      document.querySelector(".casa").innerHTML=usrJson['numero'] + complemento;
      document.querySelector(".sexo").innerHTML=sexo;
      document.querySelector(".telefone").innerHTML=usrJson['telefone'];
      document.querySelector(".validadeCnh").innerHTML=usrJson['validadeCnh'];

      console.log(usrJson);
    });
  }
}

getUser();