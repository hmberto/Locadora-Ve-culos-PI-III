package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;
import br.com.interdisciplinar.locadora.veiculos.AvailableCars;
import br.com.interdisciplinar.locadora.veiculos.CreateModels;

public class GetCarFromDB {
	public static String NAME = GetCarFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(GetCarFromDB.class.getName());
	
	public Map<Integer, String> GetCar(String carId) {
		LOG.entering(NAME, "GetCar");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_CAR");
		Map<Integer, String> car = new HashMap<Integer, String>();
				
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setString(1, carId);
			
			ResultSet f = statement.executeQuery();
			
			while(f.next()) {
				for(int i = 1; i < 17; i++) {
					car.put(i, f.getString(i));
				}
				
				LOG.log(Level.INFO, "Data geted from the database. Car ID: " + carId);
			}
			
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetCar");
		return car;
	}
	
	public String GetCars() {
		LOG.entering(NAME, "GetCar");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_ALL_CARS");
		
		String[] ids = { "123456", "234567", "345678", "456789", "567890", "678901", "789012", "890123", "901234", "102345", "923456", "934567", "945678", "956789", "967890" };
		List<String> tmpids = new ArrayList<String>(Arrays.asList(ids));

		String resp = "";
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			
			ResultSet f = statement.executeQuery();
			
			int i = 0;
			while(f.next()) {
				if(tmpids.contains(f.getString(1))){
					if(i == 0) {
						resp = resp + "{ \"data\": {\"car" + i + "\":" + " { \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"subtitles\": \"" + f.getString(13) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
					}
					else if(i < 9) {
						resp = resp + ", \"car" + i + "\":" + "{ \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"subtitles\": \"" + f.getString(13) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
					}
					i++;
				}
			}
						
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetCar");
		return resp + " }}";
	}
	
	public String GetCarsSearch(AvailableCars vehicle) {
		LOG.entering(NAME, "GetCarsSearch");
				
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_CARS_SEARCH");
		
		String resp = "";
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setString(1, vehicle.getLocalRetirada());
			
			ResultSet f = statement.executeQuery();
			
			int i = 0;
			while(f.next()) {
				if(i == 0) {
					resp = resp + "{ \"data\": {\"car" + i + "\":" + " { \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"subtitles\": \"" + f.getString(13) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
				}
				else {
					resp = resp + ", \"car" + i + "\":" + "{ \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"subtitles\": \"" + f.getString(13) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
				}
				i++;
			}
						
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetCarsSearch");
		return resp + " }}";
	}
	
	public String GetMarcas() {
		LOG.entering(NAME, "GetMarcas");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_ALL_CARS");
		
		Set<String> marcas = new HashSet<String>();

		String resp = "";
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			
			ResultSet f = statement.executeQuery();
			
			int i = 0;
			while(f.next()) {
				boolean verifyMarca = marcas.contains(f.getString(5));
				if(!verifyMarca){
					marcas.add(f.getString(5));
					
					if(i == 0) {
						resp = resp + "{ \"data\": {\"marca" + i + "\":" + " { \"marca\": \"" + f.getString(5) + "\" }";
					}
					else {
						resp = resp + ", \"marca" + i + "\":" + "{ \"marca\": \"" + f.getString(5) + "\" }";
					}
					i++;
				}
			}
						
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetMarcas");
		return resp + " }}";
	}
	
	public String GetModelos(CreateModels marca) {
		LOG.entering(NAME, "GetModelos");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_ALL_CARS");
		
		Set<String> modelos = new HashSet<String>();

		String resp = "";
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			
			ResultSet f = statement.executeQuery();
			
			int i = 0;
			while(f.next()) {
				boolean verifyMarca = modelos.contains(f.getString(6));
				boolean verifyModelo = marca.getMarca().equals(f.getString(5));
				if(!verifyMarca && verifyModelo){
					modelos.add(f.getString(6));
					
					if(i == 0) {
						resp = resp + "{ \"data\": {\"car" + i + "\":" + " { \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"subtitles\": \"" + f.getString(13) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
					}
					else {
						resp = resp + ", \"car" + i + "\":" + "{ \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"subtitles\": \"" + f.getString(13) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
					}
					i++;
				}
			}
						
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetModelos");
		return resp + " }}";
	}
	
	public String GetAgencias() {
		LOG.entering(NAME, "GetAgencias");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_ALL_CARS");
		
		Set<String> agencias = new HashSet<String>();

		String resp = "";
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			
			ResultSet f = statement.executeQuery();
			
			int i = 0;
			while(f.next()) {
				boolean verifyAgencia = agencias.contains(f.getString(14));
				if(!verifyAgencia){
					agencias.add(f.getString(14));
				
					if(i == 0) {
						resp = resp + "{ \"data\": {\"agencia" + i + "\":" + " { \"agencia\": \"" + f.getString(14) + "\" }";
					}
					else {
						resp = resp + ", \"agencia" + i + "\":" + "{ \"agencia\": \"" + f.getString(14) + "\" }";
					}
					i++;
				}
			}
						
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetAgencias");
		return resp + " }}";
	}
}