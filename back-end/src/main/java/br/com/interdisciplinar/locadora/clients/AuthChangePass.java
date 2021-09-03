package br.com.interdisciplinar.locadora.clients;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AuthUser")
public class AuthChangePass {
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	public String getNewPass() {
		return cpf;
	}
	public void setNewPass(String newPass) {
		this.newPass = newPass;
	}

	String user;
	String cpf;
	String newPass;
	
	public AuthChangePass() {}
}
