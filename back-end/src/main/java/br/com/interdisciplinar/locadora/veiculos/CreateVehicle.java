package br.com.interdisciplinar.locadora.veiculos;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "CreateVehicle")
public class CreateVehicle {
	public String getCarId() {
		return carId;
	}
	public void setCarId(String carId) {
		this.carId = carId;
	}

	String carId;
	
	public CreateVehicle() {}
}
