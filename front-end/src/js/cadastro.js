var erro = document.getElementById("erro");
var textoerro = document.getElementById("textoerro");
var loading = document.getElementById("lding");

// campos form
var nome = document.getElementById('nome');
var cpf = document.getElementById('cpf');
var rg = document.getElementById('rg');
var dataNascimento = document.getElementById('dataNascimento');
var sexo = document.getElementById('sexo');
var email = document.getElementById('email');
var telefone = document.getElementById('telefone');
var celular = document.getElementById('celular');
var rua = document.getElementById('rua');
var numero = document.getElementById('numero');
var complemento = document.getElementById('complemento');
var bairro = document.getElementById('bairro');
var cep = document.getElementById('cep');
var cidade = document.getElementById('cidade');
var estado = document.getElementById('estado');
var login = document.getElementById('login');
var senha = document.getElementById('senha');
var numeroCnh = document.getElementById('numeroCnh');
var registroCnh = document.getElementById('registroCnh');
var validadeCnh = document.getElementById('validadeCnh');
var categoriaCnh = document.getElementById('categoriaCnh');

nome.focus();

function buscarCep() {
  var cep = document.getElementById("cep");

  if(cep.value.length == 8) {
    cep.disabled = true;
    
    var url = "https://viacep.com.br/ws/" + cep.value + "/json/";
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        var endereco = JSON.parse(xhttp.response);

        if(endereco['cep'] != undefined) {
          cep.disabled = false;

          var newCep = endereco['cep'];
          var rua = endereco['logradouro'];
          var bairro = endereco['bairro'];
          var cidade = endereco['localidade'];
          var estado = endereco['uf'];

          cep.value = newCep;
          cep = newCep;
          document.getElementById("rua").value = rua;
          document.getElementById("cidade").value = cidade;
          document.getElementById("estado").value = estado;
          document.getElementById("bairro").value = bairro;

          erro.classList.remove("verde");
          erro.classList.remove("vermelho");
          erro.classList.add("azul");
          textoerro.textContent="Faça seu cadastro";
        }
        else {
          cep.disabled = false;

          erro.classList.remove("azul");
          erro.classList.remove("verde");
          erro.classList.add("vermelho");
          textoerro.textContent="CEP inválido";
        }
      }
      else {
        cep.disabled = false;

        erro.classList.remove("azul");
        erro.classList.remove("verde");
        erro.classList.add("vermelho");
        textoerro.textContent="CEP inválido";
      }
    });
  }
  if(cep.value.length > 8) {
    cep.value = "";

    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CEP inválido";
  }
}

function getValue() {
  loading.classList.remove("hideloading");

  document.getElementById("form").classList.add("hide");
  
  if(telefone.value == ""){
    telefone.value = "0000000000";
  }
  if(complemento.value == ""){
    complemento.value = "null";
  }

  if(!validate() || !validadeA()) {
    return;
  }

  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/cadastro";
  var json = '{"nome":"' + nome.value +'","cpf":"' + cpf.value +'","rg":"' + rg.value +'","dataNascimento":"' + dataNascimento.value +'","sexo":"' + sexo.value +'","email":"' + email.value +'","telefone":"' + telefone.value +'","celular":"' + celular.value +'","rua":"' + rua.value +'","numero":"' + numero.value +'","complemento":"' + complemento.value +'","bairro":"' + bairro.value +'","cep":"' + cep.value +'","cidade":"' + cidade.value +'","estado":"' + estado.value +'","login":"' + login.value +'","senha":"' + senha.value +'","numeroCnh":"' + numeroCnh.value +'","registroCnh":"' + registroCnh.value +'","validadeCnh":"' + validadeCnh.value + '","categoriaCnh":"' + categoriaCnh.value + '"}'

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  console.log(json);
  console.log(JSON.parse(json));
  xhttp.send(json);

  xhttp.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if(xhttp.status == 201) {
      erro.classList.remove("azul");
      erro.classList.remove("vermelho");
      erro.classList.add("verde");
      textoerro.textContent="Usuário Cadastrado";

      document.getElementById("redirect").classList.remove("hide");
      document.getElementById("redirect").classList.add("show");
    }
    else {
      document.getElementById("form").classList.remove("hide");

      erro.classList.remove("azul");
      erro.classList.remove("verde");
      erro.classList.add("vermelho");
      textoerro.textContent="Revise os dados informados";
    }
  });

  nome.focus();
}