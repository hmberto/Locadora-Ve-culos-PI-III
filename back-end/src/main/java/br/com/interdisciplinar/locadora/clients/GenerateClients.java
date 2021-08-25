package br.com.interdisciplinar.locadora.clients;

import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GenerateClients")
public class GenerateClients {
	public String getSession() {
		return session;
	}
	public void setSession(String session) {
		this.session = session;
	}
	
	String session;
		
	public GenerateClients(Map<Integer, String> user) {
		super();
		
		this.session = user.get(1);
	}
}
