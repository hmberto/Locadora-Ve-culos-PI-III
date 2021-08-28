package br.com.interdisciplinar.locadora.cupom;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "CreateCupom")
public class CreateCupom {
	public String getCupom() {
		return cupom;
	}
	public void setCupom(String cupom) {
		this.cupom = cupom;
	}

	String cupom;
	
	public CreateCupom() {}
}
