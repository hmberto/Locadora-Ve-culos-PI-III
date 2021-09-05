package br.com.interdisciplinar.locadora.locacao;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "DeleteLocacao")
public class DeleteLocacao {
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	public String getIdLocacao() {
		return idLocacao;
	}

	public void setIdLocacao(String idLocacao) {
		this.idLocacao = idLocacao;
	}
	
	public String getIdVeiculo() {
		return idVeiculo;
	}

	public void setIdVeiculo(String idVeiculo) {
		this.idVeiculo = idVeiculo;
	}

	String cpf;
	String idVeiculo;
	String idLocacao;
	
	public DeleteLocacao() {}
}
