package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.clients.EmailConfirmationAuth;
import br.com.interdisciplinar.locadora.dt.EnvVariables;
import br.com.interdisciplinar.locadora.mail.EmailConfirmation;

public class EmailConfirmationDB {
	public static String NAME = EmailConfirmationDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(EmailConfirmationDB.class.getName());
	
	public boolean confirmation(EmailConfirmationAuth email) {
		LOG.entering(NAME, "confirmation");
		
		String sql = EnvVariables.getEnvVariable("DATABASE_CONFIRM_EMAIL");
		String sql1 = EnvVariables.getEnvVariable("DATABASE_VALIDATE_CONFIRM_EMAIL");
		
		try {
			PreparedStatement statement1 = Database.connect().prepareStatement(sql1);
			statement1.setString(1, email.getEmail());
			
			ResultSet f = statement1.executeQuery();
			
			boolean validate = false;
			while(f.next()) {
				LOG.log(Level.INFO, "" + f.getBoolean(24));
				LOG.log(Level.INFO, f.getString(25));
				if(f.getBoolean(24) == false && f.getString(25).equals(email.getEmailToken())) {
					validate = true;
				}
			}
			
			LOG.log(Level.INFO, "\n\nValidate: " + validate);
			
			if(validate) {
				PreparedStatement statement = Database.connect().prepareStatement(sql);
				statement.setString(1, email.getEmailToken());
				statement.setString(2, email.getEmail());
				
				statement.execute();
				statement.close();
				
				LOG.log(Level.INFO, "Successfully confirmation - E-mail: " + email.getEmail());
				
				String messageSubject = "Locadora de Veículos BH - E-mail confirmado";
				
				String messageText = "Obrigado por confirmar sua conta. \n\n"
						+ "Faça login e realize a reserva do seu veículo agora mesmo. \n\n"
						+ "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com"
						+ "\n\nVocê pode reservar no site e retirar na agência mais próxima de você. \nConfira as melhores condições para você reservar e aproveitar!";
				
				EmailConfirmation sendEmail = new EmailConfirmation();
				sendEmail.confirmation(email.getEmail(), messageSubject, messageText);
				
				LOG.exiting(NAME, "confirmation");
				return true;
			}
			else {
				LOG.exiting(NAME, "confirmation");
				return false;
			}
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Failed confirmation - E-mail: " + email.getEmail() + " - Erro: " + e);
			
			LOG.exiting(NAME, "confirmation");
			return false;
		}
		finally {
			Database.disconnect();
		}
	}
}