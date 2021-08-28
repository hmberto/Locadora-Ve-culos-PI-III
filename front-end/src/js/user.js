var session = sessionStorage.getItem("session");
var loading = document.getElementById("lding");

function getUser() {
  if(session != null && session.length == 50) {
    loading.classList.remove("hideloading");
    var xhttp = ifLogged(session, 1);
    
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

      var splitData1 = usrJson['dataNascimento'].split("-");
      var splitData2 = usrJson['validadeCnh'].split("-");

      newDataNascimento = splitData1[2] + "/" + splitData1[1] + "/" +splitData1[0];
      newValidadeCnh = splitData2[2] + "/" + splitData2[1] + "/" +splitData2[0];

      var cpfList1 = usrJson['cpf'].slice(0,3);
      var cpfList2 = usrJson['cpf'].slice(3,6);
      var cpfList3 = usrJson['cpf'].slice(6,9);
      var cpfList4 = usrJson['cpf'].slice(9,11);

      newCpfFormat = cpfList1 + "." + "***" + "." + "***" + "-" + cpfList4;

      var rgList1 = usrJson['rg'].slice(0,2);
      var rgList2 = usrJson['rg'].slice(2,5);
      var rgList3 = usrJson['rg'].slice(5,8);
      var rgList4 = usrJson['rg'].slice(8,9);

      newRgFormat = rgList1 + "." + "***" + "." + "***" + "-" + rgList4;

      var celularList1 = usrJson['celular'].slice(0,2);
      var celularList2 = usrJson['celular'].slice(2,3);
      var celularList3 = usrJson['celular'].slice(3,7);
      var celularList4 = usrJson['celular'].slice(7,11);

      newCelularFormat = "(" + celularList1 + ") " + celularList2 + " " + celularList3 + "-" + celularList4;
      
      var telefoneList1 = usrJson['telefone'].slice(0,2);
      var telefoneList2 = usrJson['telefone'].slice(2,6);
      var telefoneList3 = usrJson['telefone'].slice(6,10);

      newTelefoneFormat = "(" + telefoneList1 + ") " + telefoneList2 + "-" + telefoneList3;
      
      document.querySelector(".bairro").innerHTML=usrJson['bairro'];
      document.querySelector(".categoriaCnh").innerHTML=usrJson['categoriaCnh'];
      document.querySelector(".celular").innerHTML=newCelularFormat;
      document.querySelector(".cep").innerHTML=usrJson['cep'];
      document.querySelector(".cidade").innerHTML=usrJson['cidade'];
      document.querySelector(".cpf").innerHTML=newCpfFormat;
      document.querySelector(".dataNascimento").innerHTML=newDataNascimento;
      document.querySelector(".email").innerHTML=usrJson['email'];
      document.querySelector(".estado").innerHTML=usrJson['estado'];
      document.querySelector(".login").innerHTML=atob(usrJson['login']);
      document.querySelector(".numeroCnh").innerHTML=usrJson['numeroCnh'];
      document.querySelector(".registroCnh").innerHTML=usrJson['registroCnh'];
      document.querySelector(".rg").innerHTML=newRgFormat;
      document.querySelector(".rua").innerHTML=usrJson['rua'];
      document.querySelector(".casa").innerHTML=usrJson['numero'] + complemento;
      document.querySelector(".sexo").innerHTML=sexo;
      document.querySelector(".telefone").innerHTML=newTelefoneFormat;
      document.querySelector(".validadeCnh").innerHTML=newValidadeCnh;
    });
  }
}

getUser();