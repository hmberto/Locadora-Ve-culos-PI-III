function validateB() {
  if(moment(dataNascimento.value).isAfter(dezoitoanos())) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Idade mínima 18 anos";

    dataNascimento.classList.remove("border-black");
    dataNascimento.classList.add("border-vermelho");

    return false;
  }

  if(moment(dataataul()).isAfter(validadeCnh.value)) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Validade CNH inválida";

    validadeCnh.classList.remove("border-black");
    validadeCnh.classList.add("border-vermelho");

    return false;
  }

  if(moment(validadeCnh.value).isAfter(dezanos())) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Validade CNH inválida";

    validadeCnh.classList.remove("border-black");
    validadeCnh.classList.add("border-vermelho");

    return false;
  }

  validadeCnh.classList.add("border-black");
  validadeCnh.classList.remove("border-vermelho");
  dataNascimento.classList.add("border-black");
  dataNascimento.classList.remove("border-vermelho");
  return true;
}