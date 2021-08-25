package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;

public class LogoutUserFromDB {
	public static String NAME = LogoutUserFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(LogoutUserFromDB.class.getName());
	
	public Map<Integer, String> LogoutUser(String sessionId) {
		LOG.entering(NAME, "LogoutUser");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_GET_USER_2");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_INSERT_USER_SESSION");
		
		Map<Integer, String> user = new HashMap<Integer, String>();
		Map<Integer, String> session = new HashMap<Integer, String>();
				
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
			
			String userSession = "";
			
			PreparedStatement statement2 = Database.connect().prepareStatement(sql2);
			statement2.setString(1, "");
			statement2.setString(2, user.get(16));
			
			statement2.execute();
			
			session.put(1, userSession);
						
			statement.close();
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Data not geted from the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "LogoutUser");
		return session;
	}
}