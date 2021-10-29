package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;
import br.com.interdisciplinar.locadora.mail.EmailConfirmation;
import br.com.interdisciplinar.locadora.mail.EmailConfirmationAuth;
import br.com.interdisciplinar.locadora.mail.EmailUpdateAuth;

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
				if(f.getBoolean(24) == false && f.getString(25).equals(email.getEmailToken())) {
					validate = true;
				}
			}
						
			if(validate) {
				PreparedStatement statement = Database.connect().prepareStatement(sql);
				statement.setString(1, email.getEmailToken());
				statement.setString(2, email.getEmail());
				
				statement.execute();
				statement.close();
				
				LOG.log(Level.INFO, "Successfully confirmation - E-mail: " + email.getEmail());
				
				String messageSubject = "Locadora de Veículos BH - E-mail confirmado";

				String messageText = "<!DOCTYPE html>\n"
						+ "<html lang=\"pt-br\">\n"
						+ "<head>\n"
						+ "  <meta charset=\"UTF-8\">\n"
						+ "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n"
						+ "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
						+ "  <title>" + messageSubject + "</title>\n"
						+ "</head>\n"
						+ "<body>\n"
						+ "  <div role=\"banner\">\n"
						+ "    <div class=\"header\" style=\"Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);\" id=\"emb-email-header-container\">\n"
						+ "      <div class=\"logo emb-logo-margin-box\" style=\"font-size: 26px;line-height: 32px;Margin-top: 16px;Margin-bottom: 32px;color: #41637e;font-family: sans-serif;Margin-left: 20px;Margin-right: 20px;\" align=\"center\">\n"
						+ "        <div class=\"logo-center\" align=\"center\" id=\"emb-email-header\"><img style=\"display: block;height: auto;width: 100%;border: 0;max-width: 141px;\" src=\"http://3.144.171.211/src/img/favicon.png\" alt width=\"141\"></div>\n"
						+ "      </div>\n"
						+ "    </div>\n"
						+ "  </div>\n"
						+ "  <div>\n"
						+ "    <div class=\"layout one-col fixed-width stack\" style=\"Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;\">\n"
						+ "    <div class=\"layout__inner\" style=\"border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;\">\n"
						+ "    <div class=\"column\" style=\"text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: sans-serif;\">\n"
						+ "    <div style=\"Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;\">\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <h1 style=\"Margin-top: 0;Margin-bottom: 20px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 30px;line-height: 38px;text-align: center;\">\n"
						+ "      " + "Obrigado por confirmar sua conta" + "\n"
						+ "    </h1>\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <h2 class=\"size-24\" style=\"Margin-top: 0;Margin-bottom: 16px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 20px;line-height: 28px;text-align: center;\" lang=\"x-size-24\">\n"
						+ "      " + "Faça login e realize a reserva do seu veículo. Agora você pode reservar no site e retirar na agência mais próxima de você." + "<br><br>\n"
						+ "    </h2>\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <div class=\"btn btn--flat btn--large\" style=\"Margin-bottom: 20px;text-align: center;\">\n"
						+ "      <a style=\"border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #337ab7;font-family: sans-serif;\" href=\"http://3.144.171.211\" target=\"_blank\">\n"
						+ "        Fazer uma reserva\n"
						+ "      </a>\n"
						+ "  </div>\n"
						+ "</body>\n"
						+ "</html>";
				
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
	
	
	public boolean update(EmailUpdateAuth email) {
		LOG.entering(NAME, "update");
		
		String sql1 = EnvVariables.getEnvVariable("DATABASE_GET_USER");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_UPDATE_EMAIL");
		
		String cpf = "";
		String nome = "";
		String token = "";
		
		try {
			PreparedStatement statement1 = Database.connect().prepareStatement(sql1);
			statement1.setString(1, email.getLogin());
			statement1.setString(2, email.getPass());
			
			ResultSet f = statement1.executeQuery();
			
			boolean validate = false;
			while(f.next()) {
				if(f.getString(16).equals(email.getLogin()) && f.getString(17).equals(email.getPass())) {
					validate = true;
					cpf = f.getString(2);
					nome = f.getString(1);
					token = f.getString(25);
				}
			}
						
			if(validate) {
				PreparedStatement statement = Database.connect().prepareStatement(sql2);
				statement.setString(1, email.getNewEmail());
				statement.setString(2, cpf);
				
				statement.execute();
				statement.close();
				
				LOG.log(Level.INFO, "E-mail successfully updated - E-mail: " + email.getNewEmail());
				
				String[] nomeSeparado = nome.split(" ");
				
				String messageSubject = "Locadora de Veículos BH - E-mail atualizado";
				
				String messageText = "<!DOCTYPE html>\n"
						+ "<html lang=\"pt-br\">\n"
						+ "<head>\n"
						+ "  <meta charset=\"UTF-8\">\n"
						+ "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n"
						+ "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
						+ "  <title>" + messageSubject + "</title>\n"
						+ "</head>\n"
						+ "<body>\n"
						+ "  <div role=\"banner\">\n"
						+ "    <div class=\"header\" style=\"Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);\" id=\"emb-email-header-container\">\n"
						+ "      <div class=\"logo emb-logo-margin-box\" style=\"font-size: 26px;line-height: 32px;Margin-top: 16px;Margin-bottom: 32px;color: #41637e;font-family: sans-serif;Margin-left: 20px;Margin-right: 20px;\" align=\"center\">\n"
						+ "        <div class=\"logo-center\" align=\"center\" id=\"emb-email-header\"><img style=\"display: block;height: auto;width: 100%;border: 0;max-width: 141px;\" src=\"http://3.144.171.211/src/img/favicon.png\" alt width=\"141\"></div>\n"
						+ "      </div>\n"
						+ "    </div>\n"
						+ "  </div>\n"
						+ "  <div>\n"
						+ "    <div class=\"layout one-col fixed-width stack\" style=\"Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;\">\n"
						+ "    <div class=\"layout__inner\" style=\"border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;\">\n"
						+ "    <div class=\"column\" style=\"text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: sans-serif;\">\n"
						+ "    <div style=\"Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;\">\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <h1 style=\"Margin-top: 0;Margin-bottom: 20px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 30px;line-height: 38px;text-align: center;\">\n"
						+ "      " + "Olá, " + nomeSeparado[0] + "! Você atualizou seu endereço de e-mail" + "\n"
						+ "    </h1>\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <h2 class=\"size-24\" style=\"Margin-top: 0;Margin-bottom: 16px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 20px;line-height: 28px;text-align: center;\" lang=\"x-size-24\">\n"
						+ "      " + "Clique no link abaixo para confirmar seu novo e-mail e voltar a utilizar sua conta<br><br>Se você não é " + nome + ", desconsidere este e-mail" + "<br><br>\n"
						+ "    </h2>\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <div class=\"btn btn--flat btn--large\" style=\"Margin-bottom: 20px;text-align: center;\">\n"
						+ "      <a style=\"border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #337ab7;font-family: sans-serif;\" href=\"http://3.144.171.211/src/pages/confirmation.html?e=" + email.getNewEmail() + "&t=" + token + "\" target=\"_blank\">\n"
						+ "        Confirmar e-mail\n"
						+ "      </a>\n"
						+ "  </div>\n"
						+ "</body>\n"
						+ "</html>";
				
				EmailConfirmation sendEmail = new EmailConfirmation();
				sendEmail.confirmation(email.getNewEmail(), messageSubject, messageText);
				
				LOG.exiting(NAME, "update");
				return true;
			}
			else {
				LOG.exiting(NAME, "update");
				return false;
			}
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Failed update new e-mail: " + email.getNewEmail() + " - Erro: " + e);
			
			LOG.exiting(NAME, "update");
			return false;
		}
		finally {
			Database.disconnect();
		}
	}
}