package br.com.interdisciplinar.locadora.clients;

import java.util.logging.Logger;

public class CheckData {
	public static String NAME = CheckData.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(CheckData.class.getName());
	
	public boolean checkData(CreateUser user) {
		LOG.entering(NAME, "CreateUser");
		
		boolean test = true;

		// Verifica Nome
		boolean searchForCharactersA = user.getNome().matches("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+");
		if(user.getNome().length() < 250 && searchForCharactersA) {}
		else { test = false; }
		
		// Verifica CPF
		boolean searchForCharactersB = user.getCpf().matches("[0-9]+");
		if(user.getCpf().length() == 11 && searchForCharactersB) {}
		else { test = false; }
		
		// Verifica RG
		boolean searchForCharactersC = user.getRg().matches("[0-9 a-z A-Z]+");
		if(user.getRg().length() == 9 && searchForCharactersC) {}
		else { test = false; }
		
		// Verifica Data de Nascimento
		boolean searchForCharactersD = user.getDataNascimento().matches("[0-9]{4}[-|/][0-9]{2}[-|/][0-9]{2}");
		if(searchForCharactersD) {}
		else { test = false; }
		
		// Verifica Sexo
		boolean searchForCharactersE = user.getSexo().matches("[1-4]");
		if(searchForCharactersE) {}
		else { test = false; }
		
		// Verifica E-mail
		boolean searchForCharactersF = user.getEmail().matches("[0-9 a-z A-Z .]+@[0-9 a-z A-Z .]+");
		if(user.getEmail().length() < 100 && searchForCharactersF) {}
		else { test = false; }
		
		// Verifica Telefona
		boolean searchForCharactersG = user.getTelefone().matches("[0-9]{10}");
		if(searchForCharactersG) {}
		else { test = false; }
		
		// Verifica Celular
		boolean searchForCharactersH = user.getCelular().matches("[0-9]{11}");
		if(searchForCharactersH) {}
		else { test = false; }
		
		// Verifica Rua
		boolean searchForCharactersI = user.getRua().matches("[a-z A-Z ç Ç ã Ã á Á à À í Í é É ê Ê â Â ó Ó ô Ô ú Ú . -]+");
		if(user.getRua().length() < 100 && searchForCharactersI) {}
		else { test = false; }
		
		// Verifica Número da casa
		boolean searchForCharactersJ = user.getNumero().matches("[0-9]+");
		if(user.getNumero().length() < 10 && searchForCharactersJ) {}
		else { test = false; }
		
		// Verifica Complemento
		boolean searchForCharactersR = user.getComplemento().matches("[0-9 a-z A-Z - .]+");
		if(user.getComplemento().length() < 100 && searchForCharactersR) {}
		else { test = false; }
		
		// Verifica Bairro
		boolean searchForCharactersK = user.getBairro().matches("[^0-9]+");
		if(user.getBairro().length() < 100 && searchForCharactersK) {}
		else { test = false; }
		
		// Verifica CEP
		boolean searchForCharactersL = user.getCep().matches("[0-9]{5}[-][0-9]{3}");
		if(user.getCep().length() < 100 && searchForCharactersL) {}
		else { test = false; }
		
		// Verifica Cidade
		boolean searchForCharactersM = user.getCidade().matches("[a-z A-Z ç Ç ã Ã á Á à À í Í é É ê Ê â Â ó Ó ô Ô ú Ú]+");
		if(user.getCidade().length() < 50 && searchForCharactersM) {}
		else { test = false; }
		
		// Verifica Estado
		boolean searchForCharactersN = user.getEstado().matches("[a-z A-Z ç Ç ã Ã á Á à À í Í é É ê Ê â Â ó Ó ô Ô ú Ú]+");
		if(user.getEstado().length() < 50 && searchForCharactersN) {}
		else { test = false; }
		
		// Verifica Login
		boolean searchForCharactersO = user.getLogin().matches("[0-9 a-z A-Z]+");
		if(user.getLogin().length() < 21 && searchForCharactersO) {}
		else { test = false; }
		
		// Verifica Senha
		boolean searchForCharactersP = user.getSenha().matches("[0-9 a-z A-Z ! @ # _ - .]+");
		if(user.getSenha().length() < 21 && searchForCharactersP) {}
		else { test = false; }
		
		// Verifica Número CNH
		boolean searchForCharactersQ = user.getNumero().matches("[0-9 - .]+");
		if(user.getNumero().length() < 30 && searchForCharactersQ) {}
		else { test = false; }
		
		// Verifica Registro CNH
		boolean searchForCharactersU = user.getRegistroCnh().matches("[0-9 a-z A-Z - .]+");
		if(user.getRegistroCnh().length() < 30 && searchForCharactersU) {}
		else { test = false; }

		// Verifica Validade CNH
		boolean searchForCharactersS = user.getValidadeCnh().matches("[0-9]{4}[-|/][0-9]{2}[-|/][0-9]{2}");
		if(searchForCharactersS) {}
		else { test = false; }
		
		// Verifica Categoria CNH
		boolean searchForCharactersT = user.getCategoriaCnh().matches("[a-z A-Z -]+");
		if(user.getCategoriaCnh().length() < 6 && searchForCharactersT) {}
		else { test = false; }
				
		LOG.exiting(NAME, "CreateUser");
		return test;
	}
}