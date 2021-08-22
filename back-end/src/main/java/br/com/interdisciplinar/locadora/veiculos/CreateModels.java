package br.com.interdisciplinar.locadora.veiculos;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "CreateModels")
public class CreateModels {
	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
	}

	String marca;
	
	public CreateModels() {}
}
