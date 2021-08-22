package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;
import br.com.interdisciplinar.locadora.veiculos.AvailableCars;

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
				for(int i = 1; i < 14; i++) {
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
				LOG.log(Level.INFO, "\n\n\nTESTE1");
				if(tmpids.contains(f.getString(1))){
					LOG.log(Level.INFO, "\n\n\nTESTE2");
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
}