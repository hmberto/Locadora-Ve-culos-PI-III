var user = document.getElementById("user");
var pass = document.getElementById("pass");
var button = document.getElementById("button");
var erro = document.getElementById("erro");
var textoerro = document.getElementById("textoerro");

user.focus();

// function teste() {       
//   fetch('http://localhost:8186/LocadoraVeiculos/clientes',
//         { method: 'POST', 
//            body: '{"nome":"Arnaldo","cpf":"78886635498","rg":"449856986","dataNascimento":"1999-05-05","sexo":"1","email":"arnaldo@gmail.com","telefone":"1126589758","celular":"11948795324","rua":"R. Arnaldo","numero":"152","complemento":"b","bairro":"Cidade Jardim","cep":"06987-256","cidade":"São Paulo","estado":"São Paulo","login":"arnaldoo","senha":"16c5dc45fv","numeroCnh":"1598754545656","registroCnh":"15151515","validadeCnh":"2022-04-04","categoriaCnh":"B"}', 
//            headers: new Headers({ 'Content-Type': 'application/json' }) 
//         })
//       .then(response => response.json()).then( json => setData(json))
//       .catch(error => console.error(error))
//       .finally(() => {
//           console.log("Data received 1 --> ", data);
//           data = null;
//   });
// }


function getValue() {
  var url = "http://localhost:8186/LocadoraVeiculos/clientes/login";
  // var url = "http://localhost:8186/LocadoraVeiculos/clientes/cadastro";
  var usuario = user.value;
  var senha = pass.value;
  var json = '{"user":"' + usuario + '","pass":"' + senha + '"}'
  // var json = '{"nome":"Arnaldinho","cpf":"78886635498","rg":"449856986","dataNascimento":"1999-05-05","sexo":"1","email":"arnaldo@gmail.com","telefone":"1126589758","celular":"11948795324","rua":"R. Arnaldo","numero":"152","complemento":"b","bairro":"Cidade Jardim","cep":"06987-256","cidade":"São Paulo","estado":"São Paulo","login":"arnaldoo","senha":"16c5dc45fv","numeroCnh":"1598754545656","registroCnh":"15151515","validadeCnh":"2022-04-04","categoriaCnh":"B"}'

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.send(json);

  xhttp.onreadystatechange = function() {
    console.log(this.status);

    if(this.status == 200) {
      erro.classList.remove("azul");
      erro.classList.remove("vermelho");
      erro.classList.add("verde");
      textoerro.textContent="Você está logado";
    }

    if(this.status == 400) {
      erro.classList.remove("azul");
      erro.classList.remove("verde");
      erro.classList.add("vermelho");
      textoerro.textContent="Login inválido";
    }
  };

  user.value = "";
  pass.value = "";

  user.focus();
}