package br.com.interdisciplinar.locadora.clients;

public class SexoVerify {
	public void verify(CreateUser user) {
		if(user.getSexo().equals("Não informar")) {
			user.setSexo("1");
		}
		else if(user.getSexo().equals("Masculino")) {
			user.setSexo("2");
		}
		else if(user.getSexo().equals("Feminino")) {
			user.setSexo("3");
		}
		else if(user.getSexo().equals("Outros")) {
			user.setSexo("4");
		}
		else if(user.getSexo().equals("1") || 
				user.getSexo().equals("2") || 
				user.getSexo().equals("3") || 
				user.getSexo().equals("4")) {
			
		}
		else {
			user.setSexo("5");
		}
	}
}