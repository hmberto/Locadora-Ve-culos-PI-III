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

function dataataul() {
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();

  var d = ano + "-" + mes + "-" + dia;
  return d;
}

function dezoitoanos() {
  var dataAtaul = new Date();
  var mesAtual = String(dataAtaul.getMonth() + 1).padStart(2, '0');
  var anoAtual = dataAtaul.getFullYear();

  var i = 0;
  var total = 0;
  while(i < 216) {
    var maior = new Date(anoAtual, mesAtual - i, 0).getDate();
    total = total + maior;
    i = i + 1;
  }
  
  var data = new Date();
  data.setDate(data.getDate() - total);
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();

  var d = ano + "-" + mes + "-" + dia;
  return d;
}

function dezanos() {
  var dataAtaul = new Date();
  var mesAtual = String(dataAtaul.getMonth() + 1).padStart(2, '0');
  var anoAtual = dataAtaul.getFullYear();

  var i = 0;
  var total = 0;
  while(i < 120) {
    var maior = new Date(anoAtual, mesAtual + i, 0).getDate();
    total = total + maior;
    i = i + 1;
  }

  var data = new Date();
  data.setDate(data.getDate() + total);
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();

  var d = ano + "-" + mes + "-" + dia;
  
  return d;
}

function umano() {
  var dataAtaul = new Date();
  var mesAtual = String(dataAtaul.getMonth() + 1).padStart(2, '0');
  var anoAtual = dataAtaul.getFullYear();

  var i = 0;
  var total = 0;
  while(i < 12) {
    var maior = new Date(anoAtual, mesAtual + i, 0).getDate();
    total = total + maior;
    i = i + 1;
  }

  var data = new Date();
  data.setDate(data.getDate() + total);
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();

  var d = ano + "-" + mes + "-" + dia;

  return d;
}

function maiorIdade() {
  var dezoitoanoss = dezoitoanos();
  dataNascimento.setAttribute("max", dezoitoanoss);
  dataNascimento.value = dezoitoanoss;

  var dataataull = dataataul();
  var dezanoss = dezanos();
  var umanoo = umano();
  validadeCnh.setAttribute("min", dataataull);
  validadeCnh.setAttribute("max", dezanoss);
  validadeCnh.value = umanoo;
}

maiorIdade()

function aleatorios(tamanho) {
  var primeiro = true;
  var numero = "";
  var i = 0;
  while(i < tamanho) {
    min = Math.ceil(0);
    max = Math.floor(9);
    gen = Math.floor(Math.random() * (0 + 9)) + 0;
    if(primeiro && gen == 0) {}
    else {
      primeiro = false;
      numero = numero + gen;
      i = i + 1;
    }
  }

  return numero;
}

rg.value = aleatorios(9);
cpf.value = aleatorios(11);
celular.value = "119" + aleatorios(8);
numeroCnh.value = aleatorios(10);
registroCnh.value = aleatorios(11);

var themeColor = window.localStorage.getItem("sessionColor");
var passimg = document.getElementById("passshow");
if(themeColor == "dark") {
  passimg.setAttribute("src", "/src/img/pass-dark.png");
  rua.classList.add("color-black");
  cidade.classList.add("color-black");
  estado.classList.add("color-black");
  bairro.classList.add("color-black");

  nome.classList.remove("border-black");
  nome.classList.add("border-black1");
  cpf.classList.remove("border-black");
  cpf.classList.add("border-black1");
  rg.classList.remove("border-black");
  rg.classList.add("border-black1");
  dataNascimento.classList.remove("border-black");
  dataNascimento.classList.add("border-black1");
  sexo.classList.remove("border-black");
  sexo.classList.add("border-black1");
  sexo.classList.remove("sexocor1");
  sexo.classList.add("sexocor2");
  email.classList.remove("border-black");
  email.classList.add("border-black1");
  telefone.classList.remove("border-black");
  telefone.classList.add("border-black1");
  celular.classList.remove("border-black");
  celular.classList.add("border-black1");
  rua.classList.remove("border-black");
  rua.classList.add("border-black1");
  numero.classList.remove("border-black");
  numero.classList.add("border-black1");
  complemento.classList.remove("border-black");
  complemento.classList.add("border-black1");
  bairro.classList.remove("border-black");
  bairro.classList.add("border-black1");
  cep.classList.remove("border-black");
  cep.classList.add("border-black1");
  cidade.classList.remove("border-black");
  cidade.classList.add("border-black1");
  estado.classList.remove("border-black");
  estado.classList.add("border-black1");
  login.classList.remove("border-black");
  login.classList.add("border-black1");
  senha.classList.remove("border-black");
  senha.classList.add("border-black1");
  numeroCnh.classList.remove("border-black");
  numeroCnh.classList.add("border-black1");
  registroCnh.classList.remove("border-black");
  registroCnh.classList.add("border-black1");
  validadeCnh.classList.remove("border-black");
  validadeCnh.classList.add("border-black1");
  categoriaCnh.classList.remove("border-black");
  categoriaCnh.classList.add("border-black1");
  categoriaCnh.classList.remove("sexocor1");
  categoriaCnh.classList.add("sexocor2");
}

var session = window.localStorage.getItem("session");
if(session != null) {
  if(session.length == 50) {
    window.location.replace("/");
  }
}

loading.classList.add("hideloading");
nome.focus();

function buscarCep() {
  var cep = document.getElementById("cep");

  if(cep.value.length == 8) {
    numero.focus();
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

  if(!validate() || !validateA() || !validateB()) {
    loading.classList.add("hideloading");
    return;
  }

  if(telefone.value == ""){
    telefone.value = "0000000000";
  }
  if(complemento.value == ""){
    complemento.value = "null";
  }

  document.getElementById("form").classList.add("hide");

  var url = "http://3.144.171.211:8186/LocadoraVeiculos/clientes/cadastro";

  var parseUser = btoa(login.value);
  var parsePass = btoa(senha.value);

  var json = '{"nome":"' + nome.value +'","cpf":"' + cpf.value +'","rg":"' + rg.value +'","dataNascimento":"' + dataNascimento.value +'","sexo":"' + sexo.value +'","email":"' + email.value +'","telefone":"' + telefone.value +'","celular":"' + celular.value +'","rua":"' + rua.value +'","numero":"' + numero.value +'","complemento":"' + complemento.value +'","bairro":"' + bairro.value +'","cep":"' + cep.value +'","cidade":"' + cidade.value +'","estado":"' + estado.value +'","login":"' + parseUser +'","senha":"' + parsePass +'","numeroCnh":"' + numeroCnh.value +'","registroCnh":"' + registroCnh.value +'","validadeCnh":"' + validadeCnh.value + '","categoriaCnh":"' + categoriaCnh.value + '"}'

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

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

      document.getElementById("footer").classList.add("footer3");
    }
    else {
      if(telefone.value == "0000000000"){
        telefone.value = "";
      }
      if(complemento.value == "null"){
        complemento.value = "";
      }

      document.getElementById("form").classList.remove("hide");

      erro.classList.remove("azul");
      erro.classList.remove("verde");
      erro.classList.add("vermelho");
      textoerro.textContent="Revise os dados informados";
    }
  });

  nome.focus();
}