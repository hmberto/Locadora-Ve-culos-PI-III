package br.com.interdisciplinar.locadora.clients;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AuthUser")
public class AuthUser {
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}

	String user;
	String pass;
	
	public AuthUser() {}
}
