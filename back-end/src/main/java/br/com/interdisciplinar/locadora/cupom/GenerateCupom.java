package br.com.interdisciplinar.locadora.cupom;

import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GenerateCupom")
public class GenerateCupom {
	public String getCupom() {
		return cupom;
	}
	public void setCupom(String cupom) {
		this.cupom = cupom;
	}
	
	String cupom;
		
	public GenerateCupom(Map<Integer, String> cupom) {
		super();
		
		this.cupom = cupom.get(3);
	}
}
