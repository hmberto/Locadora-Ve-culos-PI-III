package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.clients.CreateUser;
import br.com.interdisciplinar.locadora.dt.EnvVariables;

public class SendUserToDB {
	public static String NAME = GetUserFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(GetUserFromDB.class.getName());
	
	public boolean CreateUserDB(CreateUser user) {
		LOG.entering(NAME, "CreateUserDB");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_INSERT");
		
		try {
			PreparedStatement statement = Database.connect().prepareStatement(sql);

			statement.setString(1, user.getNome());
			statement.setString(2, user.getCpf());
			statement.setString(3, user.getRg());
			statement.setString(4, user.getDataNascimento());
			statement.setString(5, user.getSexo());
			statement.setString(6, user.getEmail());
			statement.setString(7, user.getTelefone());
			statement.setString(8, user.getCelular());
			statement.setString(9, user.getRua());
			statement.setString(10, user.getNumero());
			statement.setString(11, user.getComplemento());
			statement.setString(12, user.getBairro());
			statement.setString(13, user.getCep());
			statement.setString(14, user.getCidade());
			statement.setString(15, user.getEstado());
			statement.setString(16, user.getLogin());
			statement.setString(17, user.getSenha());
			statement.setString(18, user.getNumeroCnh());
			statement.setString(19, user.getRegistroCnh());
			statement.setString(20, user.getValidadeCnh());
			statement.setString(21, user.getCategoriaCnh());
			statement.setBoolean(22, false);
						
			statement.execute();

			LOG.log(Level.INFO, "User created on database. Login: " + user.getLogin());
			
			statement.close();
			
			LOG.exiting(NAME, "CreateUserDB");
			return true;
		}
		catch(SQLException e) {
			LOG.log(Level.SEVERE, "User not created on the database: ", e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "CreateUserDB");
		return false;
	}
}