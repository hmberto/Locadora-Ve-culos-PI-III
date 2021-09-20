package br.com.interdisciplinar.locadora.mail;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AuthUser")
public class EmailUpdateAuth {
	public String getNewEmail() {
		return newEmail;
	}
	public void setNewEmail(String newEmail) {
		this.newEmail = newEmail;
	}
	
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	
	String newEmail;
	String login;
	String pass;
	
	public EmailUpdateAuth() {}
}
