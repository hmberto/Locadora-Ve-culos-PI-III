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
	
	public String getNewLogin() {
		return newLogin;
	}
	public void setNewLogin(String newLogin) {
		this.newLogin = newLogin;
	}
	
	public String getLoginInfo() {
		return loginInfo;
	}
	public void setLoginInfo(String loginInfo) {
		this.loginInfo = loginInfo;
	}

	String user;
	String pass;
	String newLogin;
	String loginInfo;
	
	public AuthUser() {}
}
