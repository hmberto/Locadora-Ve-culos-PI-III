package br.com.interdisciplinar.locadora.veiculos;

import java.util.Map;
import java.util.logging.Logger;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GenerateCars")
public class GenerateCars {
	public static String NAME = GenerateCars.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(GenerateCars.class.getName());
	
	String idCarro;
	public String getIdCarro() {
		return idCarro;
	}
	public void setIdCarro(String idCarro) {
		this.idCarro = idCarro;
	}

	public String getRenavam() {
		return renavam;
	}
	public void setRenavam(String renavam) {
		this.renavam = renavam;
	}

	public String getPlaca() {
		return placa;
	}
	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getChassi() {
		return chassi;
	}
	public void setChassi(String chassi) {
		this.chassi = chassi;
	}

	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getModelo() {
		return modelo;
	}
	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public String getAno() {
		return ano;
	}
	public void setAno(String ano) {
		this.ano = ano;
	}

	public String getNumeroPortas() {
		return numeroPortas;
	}
	public void setNumeroPortas(String numeroPortas) {
		this.numeroPortas = numeroPortas;
	}

	public String getMotor() {
		return motor;
	}
	public void setMotor(String motor) {
		this.motor = motor;
	}

	public String getCambioAutomatico() {
		return cambioAutomatico;
	}
	public void setCambioAutomatico(String cambioAutomatico) {
		this.cambioAutomatico = cambioAutomatico;
	}
	
	public String getCombustivel() {
		return combustivel;
	}
	public void setCombustivel(String combustivel) {
		this.combustivel = combustivel;
	}
	
	public String getSubtitles() {
		return subtitles;
	}
	public void setSubtitles(String subtitles) {
		this.subtitles = subtitles;
	}

	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	
	public String getLocalRetirada() {
		return localRetirada;
	}
	public void setLocalRetirada(String localRetirada) {
		this.localRetirada = localRetirada;
	}
	
	public String getAvailableCar() {
		return availableCar;
	}
	public void setAvailableCar(String availableCar) {
		this.availableCar = availableCar;
	}

	String renavam;
	String placa;
	String chassi;
	String marca;
	String modelo;
	String ano;
	String numeroPortas;
	String motor;
	String cambioAutomatico;
	String combustivel;
	String subtitles;
	String imgPath;
	String localRetirada;
	String availableCar;
		
	public GenerateCars(Map<Integer, String> vehicle) {
		super();
		
		LOG.entering(NAME, "GenerateCars");

		this.idCarro = vehicle.get(1);
		this.renavam = vehicle.get(2);
		this.placa = vehicle.get(3);
		this.chassi = vehicle.get(4);
		this.marca = vehicle.get(5);
		this.modelo = vehicle.get(6);
		this.ano = vehicle.get(7);
		this.numeroPortas = vehicle.get(8);
		this.motor = vehicle.get(9);
		this.cambioAutomatico = vehicle.get(10);
		this.combustivel = vehicle.get(11);
		this.subtitles = vehicle.get(13);
		this.imgPath = vehicle.get(12);
		this.localRetirada = vehicle.get(14);
		this.availableCar = vehicle.get(15);
		
		LOG.exiting(NAME, "GenerateCars");
	}
}
