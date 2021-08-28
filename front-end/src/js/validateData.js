function dataRetirada() {
  var dataAtaul = new Date();
  var diaAtual = String(dataAtaul. getDate()). padStart(2, '0');
  var mesAtual = String(dataAtaul. getMonth() + 1). padStart(2, '0');
  var anoAtual = dataAtaul. getFullYear();

  var dataAtualFormatada = anoAtual + "-" + mesAtual + "-" + diaAtual;

  var dias = new Date(anoAtual, mesAtual, 0).getDate() + new Date(anoAtual, mesAtual + 1, 0).getDate() + new Date(anoAtual, mesAtual + 2, 0).getDate() + new Date(anoAtual, mesAtual + 3, 0).getDate() + new Date(anoAtual, mesAtual + 4, 0).getDate() + new Date(anoAtual, mesAtual + 5, 0).getDate();

  var initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + dias);

  var diaFuturo = String(initialDate. getDate()). padStart(2, '0');
  var mesFuturo = String(initialDate. getMonth() + 1). padStart(2, '0');
  var anoFuturo = initialDate. getFullYear();

  var dataFuturaFormatada = anoFuturo + "-" + mesFuturo + "-" + diaFuturo;

  var initialDate2 = new Date();
  initialDate2.setDate(initialDate2.getDate() + 1);

  var diaFuturo2 = String(initialDate2. getDate()). padStart(2, '0');
  var mesFuturo2 = String(initialDate2. getMonth() + 1). padStart(2, '0');
  var anoFuturo2 = initialDate2. getFullYear();

  var dataFuturaFormatada2 = anoFuturo2 + "-" + mesFuturo2 + "-" + diaFuturo2;

  document.getElementById("dataretirada").setAttribute("min", dataAtualFormatada);
  document.getElementById("dataretirada").setAttribute("max", dataFuturaFormatada);
  document.getElementById("dataretirada").value=dataFuturaFormatada2;
}

function dataDevolucao() {
  var dataAtaul = new Date();
  dataAtaul.setDate(dataAtaul.getDate() + 3);
  var diaAtual = String(dataAtaul.getDate()).padStart(2, '0');
  var mesAtual = String(dataAtaul.getMonth() + 1).padStart(2, '0');
  var anoAtual = dataAtaul.getFullYear();

  var dataAtualFormatada = anoAtual + "-" + mesAtual + "-" + diaAtual;

  var initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 368);

  var diaFuturo = String(initialDate.getDate()).padStart(2, '0');
  var mesFuturo = String(initialDate.getMonth() + 1).padStart(2, '0');
  var anoFuturo = initialDate.getFullYear();

  var dataFuturaFormatada = anoFuturo + "-" + mesFuturo + "-" + diaFuturo;

  var initialDate2 = new Date();
  initialDate2.setDate(initialDate2.getDate() + 4);

  var diaFuturo2 = String(initialDate2. getDate()). padStart(2, '0');
  var mesFuturo2 = String(initialDate2. getMonth() + 1). padStart(2, '0');
  var anoFuturo2 = initialDate2. getFullYear();

  var dataFuturaFormatada2 = anoFuturo2 + "-" + mesFuturo2 + "-" + diaFuturo2;

  document.getElementById("dataentrega").setAttribute("min", dataAtualFormatada);
  document.getElementById("dataentrega").setAttribute("max", dataFuturaFormatada);
  document.getElementById("dataentrega").value=dataFuturaFormatada2;
}

function hourRetirada() {
  document.getElementById("horaretirada").value="12:00";
  document.getElementById("horaentrega").value="12:00";
}

document.getElementById("dataretirada").addEventListener("change", () => {
  var initialDate2 = new Date(document.getElementById("dataretirada").value);
  initialDate2.setDate(initialDate2.getDate() + 4);

  var diaFuturo2 = String(initialDate2. getDate()). padStart(2, '0');
  var mesFuturo2 = String(initialDate2. getMonth() + 1). padStart(2, '0');
  var anoFuturo2 = initialDate2. getFullYear();

  var dataFuturaFormatada2 = anoFuturo2 + "-" + mesFuturo2 + "-" + diaFuturo2;

  document.getElementById("dataentrega").value=dataFuturaFormatada2;
});

dataRetirada();
dataDevolucao();

hourRetirada();