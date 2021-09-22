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
					+ "        <div class=\"logo-center\" align=\"center\" id=\"emb-email-header\"><img style=\"display: block;height: auto;width: 100%;border: 0;max-width: 141px;\" src=\"http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com/src/img/favicon.png\" alt width=\"141\"></div>\n"
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
					+ "      " + welcome + user.getNome() + "! Clique no link a seguir para confirmar seu endereço de e-mail" + "\n"
					+ "    </h1>\n"
					+ "  </div>\n"
					+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
					+ "    <h2 class=\"size-24\" style=\"Margin-top: 0;Margin-bottom: 16px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 20px;line-height: 28px;text-align: center;\" lang=\"x-size-24\">\n"
					+ "      " + "Clique no link abaixo para confirmar seu novo e-mail e voltar a utilizar sua conta<br><br>Se você não é " + user.getNome() + ", desconsidere este e-mail" + "<br><br>\n"
					+ "    </h2>\n"
					+ "  </div>\n"
					+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
					+ "    <div class=\"btn btn--flat btn--large\" style=\"Margin-bottom: 20px;text-align: center;\">\n"
					+ "      <a style=\"border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #337ab7;font-family: sans-serif;\" href=\"http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com/src/pages/confirmation.html?e=" + user.getEmail() + "&t=" + emailSession + "\" target=\"_blank\">\n"
					+ "        Confirmar e-mail\n"
					+ "      </a>\n"
					+ "  </div>\n"
					+ "</body>\n"
					+ "</html>";
			
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