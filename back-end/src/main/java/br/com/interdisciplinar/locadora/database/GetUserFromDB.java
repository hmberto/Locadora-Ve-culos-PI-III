package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;

public class GetUserFromDB {
	public static String NAME = GetUserFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(GetUserFromDB.class.getName());
	
	public Map<Integer, String> GetUser(String sessionId) {
		LOG.entering(NAME, "GetUser");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_USER_2");
		
		Map<Integer, String> user = new HashMap<Integer, String>();
				
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setString(1, sessionId);
			
			ResultSet f = statement.executeQuery();
			
			while(f.next()) {
				for(int i = 1; i < 23; i++) {
					user.put(i, f.getString(i));
				}
				
				LOG.log(Level.INFO, "Data geted from the database. Login: " + f.getString(16));
			}
			
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "GetUser");
		return user;
	}
}