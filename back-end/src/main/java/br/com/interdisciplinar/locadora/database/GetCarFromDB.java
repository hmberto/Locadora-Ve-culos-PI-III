package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;

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
				for(int i = 1; i < 13; i++) {
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
		
		String resp = "";
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			
			ResultSet f = statement.executeQuery();
			
			int i = 0;
			while(f.next()) {
				if(i == 0) {
					resp = resp + "{ \"data\": {\"car" + i + "\":" + " { \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
				}
				else {
					resp = resp + ", \"car" + i + "\":" + "{ \"idCarro\": \"" + f.getString(1) + "\", \"renavam\": \"" + f.getString(2) + "\", \"placa\": \"" + f.getString(3) + "\", \"chassi\": \"" + f.getString(4) + "\", \"marca\": \"" + f.getString(5) + "\", \"modelo\": \"" + f.getString(6) + "\", \"ano\": \"" + f.getString(7) + "\", \"numeroPortas\": \"" + f.getString(8) + "\", \"motor\": \"" + f.getString(9) + "\", \"cambioAutomatico\": \"" + f.getString(10) + "\", \"combustivel\": \"" + f.getString(11) + "\", \"imgPath\": \"" + f.getString(12) + "\" }";
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
		
		LOG.exiting(NAME, "GetCar");
		return resp + " }}";
	}
}