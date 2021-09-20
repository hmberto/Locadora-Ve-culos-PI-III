package br.com.interdisciplinar.locadora.mail;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AuthUser")
public class EmailConfirmationAuth {
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getEmailToken() {
		return emailToken;
	}
	public void setEmailToken(String emailToken) {
		this.emailToken = emailToken;
	}
	
	String email;
	String emailToken;
	
	public EmailConfirmationAuth() {}
}
