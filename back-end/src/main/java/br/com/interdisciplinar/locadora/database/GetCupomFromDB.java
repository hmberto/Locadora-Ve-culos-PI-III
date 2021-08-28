package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.cupom.CreateCupom;
import br.com.interdisciplinar.locadora.dt.EnvVariables;

public class GetCupomFromDB {
	public static String NAME = GetCupomFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(GetCupomFromDB.class.getName());
	
	public Map<Integer, String> GetCupom(CreateCupom cupom) {
		LOG.entering(NAME, "GetCupom");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_CUPOM");
		Map<Integer, String> cupomMap = new HashMap<Integer, String>();
				
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setString(1, cupom.getCupom());
			
			ResultSet f = statement.executeQuery();
			
			while(f.next()) {
				for(int i = 1; i < 4; i++) {
					cupomMap.put(i, f.getString(i));
				}
				
				LOG.log(Level.INFO, "Data geted from the database. Cupom: " + cupom.getCupom());
			}
			
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database - Cupom: " + cupom.getCupom() + " - Error: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetCupom");
		return cupomMap;
	}
}