package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.clients.AuthChangePass;
import br.com.interdisciplinar.locadora.dt.EnvVariables;

public class UpdatePassFromDB {
	public static String NAME = UpdatePassFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(UpdatePassFromDB.class.getName());
	
	public boolean updatePass(AuthChangePass newPass) {
		LOG.entering(NAME, "updatePass");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_VALIDATE_LOGIN_CPF");
		String sqlPass = EnvVariables.getEnvVariable("DATABASE_UPDATE_PASSWORD");
				
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setString(1, newPass.getCpf());
			statement.setString(2, newPass.getUser());
			
			ResultSet f = statement.executeQuery();
			
			boolean validate = false;
			while(f.next()) {
				if(f.getString(2).equals(newPass.getCpf())) {
					validate = true;
				}
			}
			
			if(validate) {
				PreparedStatement statement2 = Database.connect().prepareStatement(sqlPass);
				statement2.setString(1, newPass.getNewPass());
				statement2.setString(2, newPass.getCpf());
				statement2.setString(3, newPass.getUser());
				
				statement2.execute();
			}
			statement.close();
			
			LOG.log(Level.INFO, "Pass updated - User: " + newPass.getUser());
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Pass not updated: " + e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "updatePass");
		return true;
	}
}