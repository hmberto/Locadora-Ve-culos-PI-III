package br.com.interdisciplinar.locadora.clients;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AuthUser")
public class LogoutUser {
	public String getSession() {
		return session;
	}
	public void setSession(String session) {
		this.session = session;
	}

	String session;
	
	public LogoutUser() {}
}
