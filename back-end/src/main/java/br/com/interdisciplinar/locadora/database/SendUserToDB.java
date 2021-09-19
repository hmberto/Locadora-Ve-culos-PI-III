package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.clients.CreateUser;
import br.com.interdisciplinar.locadora.dt.EnvVariables;
import br.com.interdisciplinar.locadora.mail.EmailConfirmation;

public class SendUserToDB {
	public static String NAME = LoginUserFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(LoginUserFromDB.class.getName());
	
	public boolean CreateUserDB(CreateUser user) {
		LOG.entering(NAME, "CreateUserDB");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_INSERT");
		
		String alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		String emailSession = "";
		for(int i = 0; i < 50; i++) {
			int myindex = (int)(alphaNumeric.length() * Math.random());
			
			emailSession = emailSession + alphaNumeric.charAt(myindex);
		}
		
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
			statement.setBoolean(23, false);
			statement.setString(24, emailSession);
						
			statement.execute();

			LOG.log(Level.INFO, "User created on database. Login: " + user.getLogin());
			
			statement.close();
			
			String welcome = "";
			if (user.getSexo().equals("2")) {
				welcome = "Bem vindo, ";
			} else if (user.getSexo().equals("3")) {
				welcome = "Bem vinda, ";
			} else {
				welcome = "Bem vindx, ";
			}
			
			String messageSubject = "Locadora de Veículos BH - Confirme seu e-mail";
			
			String messageText = welcome + user.getNome() + "! \n\nClique no link a seguir para confirmar seu endereço de e-mail. \n\n"
					+ "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com/src/pages/confirmation.html?" + "e=" + user.getEmail() + "&t=" + emailSession 
					+ "\n\nSe você não é " + user.getNome() + ", desconsidere este e-mail.";
			
			EmailConfirmation sendEmail = new EmailConfirmation();
			sendEmail.confirmation(user.getEmail(), messageSubject, messageText);
			
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