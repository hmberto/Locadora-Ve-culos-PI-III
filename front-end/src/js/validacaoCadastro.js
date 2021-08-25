function validate() {
  if(nome.value.length > 250) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Nome muito grande";

    nome.classList.remove("border-black");
    nome.classList.add("border-vermelho");

    return false;
  }
  
  let nomeRegex = nome.value.match(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ \\s]/gi);
  if(nomeRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Nome inválido";

    nome.classList.remove("border-black");
    nome.classList.add("border-vermelho");

    return false;
  }

  if(cpf.value.length > 11) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CPF inválido";

    cpf.classList.remove("border-black");
    cpf.classList.add("border-vermelho");

    return false;
  }

  let cpfRegex = cpf.value.match(/[^0-9]/gi);
  if(cpfRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CPF inválido";

    cpf.classList.remove("border-black");
    cpf.classList.add("border-vermelho");

    return false;
  }

  if(rg.value.length > 9) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="RG inválido";

    rg.classList.remove("border-black");
    rg.classList.add("border-vermelho");

    return false;
  }

  let rgRegex = rg.value.match(/[^0-9a-zA-Z]/gi);
  if(rgRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="RG inválido";

    rg.classList.remove("border-black");
    rg.classList.add("border-vermelho");

    return false;
  }

  if(email.value.length > 99) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="E-mail muito grande";

    email.classList.remove("border-black");
    email.classList.add("border-vermelho");

    return false;
  }

  if(telefone.value.length > 10) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Telefone inválido";

    telefone.classList.remove("border-black");
    telefone.classList.add("border-vermelho");

    return false;
  }

  let telefoneRegex = telefone.value.match(/[^0-9]/gi);
  if(telefoneRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Telefone inválido";

    telefone.classList.remove("border-black");
    telefone.classList.add("border-vermelho");

    return false;
  }

  if(celular.value.length > 11) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Celular inválido";
    
    celular.classList.remove("border-black");
    celular.classList.add("border-vermelho");

    return false;
  }

  let celularRegex = celular.value.match(/[^0-9]/gi);
  if(celularRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Celular inválido";

    celular.classList.remove("border-black");
    celular.classList.add("border-vermelho");

    return false;
  }

  if(numero.value.length > 9) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Número inválido";

    numero.classList.remove("border-black");
    numero.classList.add("border-vermelho");

    return false;
  }

  let numeroRegex = numero.value.match(/[^0-9]/gi);
  if(numeroRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Número inválido";
    
    numero.classList.remove("border-black");
    numero.classList.add("border-vermelho");

    return false;
  }

  if(complemento.value.length > 99) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Complemento inválido";

    complemento.classList.remove("border-black");
    complemento.classList.add("border-vermelho");

    return false;
  }

  let complementoRegex = complemento.value.match(/[^0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ \s , \. \-]/gi);
  if(complementoRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Complemento inválido";

    complemento.classList.remove("border-black");
    complemento.classList.add("border-vermelho");

    return false;
  }

  if(cep.value.length > 9) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CEP inválido";

    cep.classList.remove("border-black");
    cep.classList.add("border-vermelho");

    return false;
  }

  if(login.value.length > 19) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Usuário inválido";

    login.classList.remove("border-black");
    login.classList.add("border-vermelho");

    return false;
  }

  let loginRegex = login.value.match(/[^0-9 a-z A-Z]/gi);
  if(loginRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Usuário inválido";

    login.classList.remove("border-black");
    login.classList.add("border-vermelho");

    return false;
  }

  if(senha.value.length > 19) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Senha inválido";

    senha.classList.remove("border-black");
    senha.classList.add("border-vermelho");

    return false;
  }

  let senhaRegex = senha.value.match(/[^0-9a-zA-Z \!\@\#\_\.\-]/gi);
  if(senhaRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Senha inválido";

    senha.classList.remove("border-black");
    senha.classList.add("border-vermelho");

    return false;
  }

  if(numeroCnh.value.length > 30) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Número CNH inválido";

    numeroCnh.classList.remove("border-black");
    numeroCnh.classList.add("border-vermelho");

    return false;
  }

  let numeroCnhRegex = numeroCnh.value.match(/[^0-9]/gi);
  if(numeroCnhRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CNH inválida";

    numeroCnh.classList.remove("border-black");
    numeroCnh.classList.add("border-vermelho");

    return false;
  }

  if(registroCnh.value.length > 30) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Registro CNH inválido";

    registroCnh.classList.remove("border-black");
    registroCnh.classList.add("border-vermelho");

    return false;
  }

  let registroCnhRegex = registroCnh.value.match(/[^0-9]/gi);
  if(registroCnhRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CNH inválida";

    registroCnh.classList.remove("border-black");
    registroCnh.classList.add("border-vermelho");

    return false;
  }

  if(categoriaCnh.value.length > 5) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Categoria CNH inválida";

    categoriaCnh.classList.remove("border-black");
    categoriaCnh.classList.add("border-vermelho");

    return false;
  }

  let categoriaRegex = categoriaCnh.value.match(/[^a-zA-Z \s]/gi);
  if(categoriaRegex != null) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Categoria CNH inválido";

    categoriaCnh.classList.remove("border-black");
    categoriaCnh.classList.add("border-vermelho");

    return false;
  }

  erro.classList.remove("verde");
  erro.classList.remove("vermelho");
  erro.classList.add("azul");
  textoerro.textContent="Faça seu cadastro";

  nome.classList.remove("border-vermelho");
  nome.classList.add("border-black");
  cpf.classList.remove("border-vermelho");
  cpf.classList.add("border-black");
  rg.classList.remove("border-vermelho");
  rg.classList.add("border-black");
  email.classList.remove("border-vermelho");
  email.classList.add("border-black");
  telefone.classList.remove("border-vermelho");
  telefone.classList.add("border-black");
  celular.classList.remove("border-vermelho");
  celular.classList.add("border-black");
  numero.classList.remove("border-vermelho");
  numero.classList.add("border-black");
  complemento.classList.remove("border-vermelho");
  complemento.classList.add("border-black");
  cep.classList.remove("border-vermelho");
  cep.classList.add("border-black");
  login.classList.remove("border-vermelho");
  login.classList.add("border-black");
  senha.classList.remove("border-vermelho");
  senha.classList.add("border-black");
  numeroCnh.classList.remove("border-vermelho");
  numeroCnh.classList.add("border-black");
  registroCnh.classList.remove("border-vermelho");
  registroCnh.classList.add("border-black");
  categoriaCnh.classList.remove("border-vermelho");
  categoriaCnh.classList.add("border-black");

  return true;
}