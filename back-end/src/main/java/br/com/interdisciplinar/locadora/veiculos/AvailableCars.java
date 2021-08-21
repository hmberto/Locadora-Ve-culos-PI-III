package br.com.interdisciplinar.locadora.veiculos;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "AvailableCars")
public class AvailableCars {
	public String getLocalRetirada() {
		return localRetirada;
	}

	public void setLocalRetirada(String localRetirada) {
		this.localRetirada = localRetirada;
	}

	public String getDataRetirada() {
		return dataRetirada;
	}

	public void setDataRetirada(String dataRetirada) {
		this.dataRetirada = dataRetirada;
	}

	public String getHoraRetirada() {
		return horaRetirada;
	}

	public void setHoraRetirada(String horaRetirada) {
		this.horaRetirada = horaRetirada;
	}

	public String getLocalDevolucao() {
		return localDevolucao;
	}

	public void setLocalDevolucao(String localDevolucao) {
		this.localDevolucao = localDevolucao;
	}

	public String getDataDevolucao() {
		return dataDevolucao;
	}

	public void setDataDevolucao(String dataDevolucao) {
		this.dataDevolucao = dataDevolucao;
	}

	public String getHoraDevolucao() {
		return horaDevolucao;
	}

	public void setHoraDevolucao(String horaDevolucao) {
		this.horaDevolucao = horaDevolucao;
	}

	String localRetirada;
	String dataRetirada;
	String horaRetirada;
	String localDevolucao;
	String dataDevolucao;
	String horaDevolucao;
	
	public AvailableCars() {}
}
