package br.com.interdisciplinar.locadora.locacao;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "CreateCupom")
public class CreateConsult {
	public String getIdOrCpf() {
		return idOrCpf;
	}
	public void setIdOrCpf(String idOrCpf) {
		this.idOrCpf = idOrCpf;
	}

	String idOrCpf;
	
	public CreateConsult() {}
}
