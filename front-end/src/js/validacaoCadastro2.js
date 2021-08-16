function validadeA() {
  let emailRegex = email.value.match(/[0-9 a-z A-Z .]@[0-9 a-z A-Z .]/gi);  
  if(emailRegex == null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="E-mail inválido";
  
    return false;
  }

  if(nome.value.length < 3) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Nome muito pequeno";

    return false;
  }

  if(cpf.value.length != 11) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CPF inválido";

    return false;
  }

  if(rg.value.length != 9) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="RG inválido";

    return false;
  }

  if(celular.value.length != 11) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Celular inválido";

    return false;
  }

  if(numero.value.length < 1) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Número inválido";

    return false;
  }

  if(login.value.length < 6) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Usuário precisa ter 6 caracteres ou mais";

    return false;
  }

  if(senha.value.length < 6) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Senha precisa ter 6 caracteres ou mais";

    return false;
  }

  if(numeroCnh.value.length < 3) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Número CNH inválido";

    return false;
  }

  if(registroCnh.value.length < 3) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Registro CNH inválido";

    return false;
  }

  if(categoriaCnh.value.length < 1) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Categoria CNH inválida";

    return false;
  }

  return true;
}