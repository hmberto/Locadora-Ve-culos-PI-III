package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;
import br.com.interdisciplinar.locadora.dt.GenerateID;
import br.com.interdisciplinar.locadora.locacao.CreateConsult;
import br.com.interdisciplinar.locadora.locacao.CreateLocacao;
import br.com.interdisciplinar.locadora.locacao.DeleteLocacao;
import br.com.interdisciplinar.locadora.locacao.UpdateLocacao;
import br.com.interdisciplinar.locadora.mail.EmailConfirmation;

public class LocacaoFromDB {
	public static String NAME = LocacaoFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(LocacaoFromDB.class.getName());
	
	public boolean newLocation(CreateLocacao locacao) {
		LOG.entering(NAME, "newLocation");
		
		String CHECK_VEHICLE = EnvVariables.getEnvVariable("CHECK_VEHICLE");
		String CHECK_LOCATARIO = EnvVariables.getEnvVariable("CHECK_LOCATARIO");
		
		String sql1 = EnvVariables.getEnvVariable("DATABASE_INSERT_LOCATION_1");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_UPDATE_LOCATION_2");
		String sql3 = EnvVariables.getEnvVariable("DATABASE_UPDATE_LOCATION_3");
		
		boolean check = false;
		String email = "";
		String nome = ""; 
		String modelo = "";
		String texto = "Você ainda não pagou pela reserva! Acesse sua reserva e faça o pagamento pelo site ou compareça a uma agência e realize o pagamento para manter sua reserva ativa. ";
		
		try {
			PreparedStatement CHECK_LOCATARIO_ACTIVE = Database.connect().prepareStatement(CHECK_LOCATARIO);
			CHECK_LOCATARIO_ACTIVE.setString(1, locacao.getCpf_locatario());
			CHECK_LOCATARIO_ACTIVE.setBoolean(2, false);
			
			PreparedStatement CHECK_VEHICLE_AVAILABLE = Database.connect().prepareStatement(CHECK_VEHICLE);
			CHECK_VEHICLE_AVAILABLE.setString(1, locacao.getId_veiculo());
			CHECK_VEHICLE_AVAILABLE.setBoolean(2, true);
			
			ResultSet f1 = CHECK_VEHICLE_AVAILABLE.executeQuery();
			ResultSet f2 = CHECK_LOCATARIO_ACTIVE.executeQuery();
			
			boolean valid1 = false;
			boolean valid2 = false;
			
			while(f1.next()) {
				if(f1.getString(15).equals("1")) {
					valid1 = true;
					modelo = f1.getString(6);
				}
			}
			
			while(f2.next()) {
				if(f2.getString(22).equals("0")) {
					valid2 = true;
					nome = f2.getString(1);
					email = f2.getString(6);
				}
			}
			
			if(valid1 && valid2) {
				GenerateID idLocacao = new GenerateID();
				String newId = idLocacao.getId(15);
				
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date date1 = new Date();
				
				DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
				Date date2 = new Date();
				
				boolean cadeirinha = false;
				boolean capa_cinto_animais = false;
				boolean pagamento_no_site = false;
				
				LOG.log(Level.INFO, locacao.getCadeirinha());
				LOG.log(Level.INFO, locacao.getCapa_cinto_animais());
				if(locacao.getCadeirinha().equals("true")) {
					LOG.log(Level.INFO, "A " +  cadeirinha + "");
					cadeirinha = true;
				}
				
				if(locacao.getCapa_cinto_animais().equals("true")) {
					capa_cinto_animais = true;
				}
				
				if(locacao.getPagamento_no_site().equals("true")) {
					pagamento_no_site = true;
					texto = "Você já pagou pela reserva! ";
				}
				
				LOG.log(Level.INFO, cadeirinha + "");
				LOG.log(Level.INFO, capa_cinto_animais + "");
							
				PreparedStatement statement = Database.connect().prepareStatement(sql1);
				statement.setString(1, newId + "-01");
				statement.setString(2, locacao.getCpf_locatario());
				statement.setString(3, locacao.getId_veiculo());
				statement.setString(4, dateFormat.format(date1));
				statement.setString(5, timeFormat.format(date2));
				statement.setString(6, locacao.getData_retirada());
				statement.setString(7, locacao.getHora_retirada());
				statement.setString(8, locacao.getData_devolucao());
				statement.setString(9, locacao.getHora_devolucao());
				statement.setString(10, locacao.getTempo_locacao());
				statement.setString(11, locacao.getId_funcionario());
				statement.setString(12, locacao.getValor_total_locacao());
				statement.setString(13, locacao.getCupom_aplicado());
				statement.setString(14, locacao.getValor_descontos());
				statement.setString(15, locacao.getValor_total_a_pagar());
				statement.setString(16, locacao.getLocal_retirada());
				statement.setString(17, locacao.getLocal_devolucao());
				statement.setBoolean(18, cadeirinha);
				statement.setBoolean(19, capa_cinto_animais);
				statement.setBoolean(20, pagamento_no_site);
				statement.setString(21, locacao.getCartao_pagamento());
				
				PreparedStatement statement_user = Database.connect().prepareStatement(sql2);
				statement_user.setString(1, locacao.getCpf_locatario());
				
				PreparedStatement statement_cars = Database.connect().prepareStatement(sql3);
				statement_cars.setString(1, locacao.getId_veiculo());
				
				statement.execute();
				statement.close();
				
				statement_user.execute();
				statement_user.close();
				
				statement_cars.execute();
				statement_cars.close();
				
				check = true;
				LOG.log(Level.INFO, "Location created on the database - user CPF: " + locacao.getCpf_locatario() + " - Car ID: " + locacao.getId_veiculo());
				
				String[] nomeSeparado = nome.split(" ");
				String[] dataSeparada = locacao.getData_retirada().split("-");
				
				String messageSubject = "Locadora de Veículos BH - " + modelo + " - Reserva confirmada";
				
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
						+ "      " + "Olá, " + nomeSeparado[0] + "! Você concluiu sua reserva pelo site! Confira os detalhes" + "\n"
						+ "    </h1>\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <h2 class=\"size-24\" style=\"Margin-top: 0;Margin-bottom: 16px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 20px;line-height: 28px;text-align: center;\" lang=\"x-size-24\">\n"
						+ "      " + texto + "Seu veículo estará te esperando na agência " + locacao.getLocal_retirada() + " nesta data: " + dataSeparada[2] + "/" + dataSeparada[1] + "/" + dataSeparada[0] + "<br><br>\n"
						+ "    </h2>\n"
						+ "  </div>\n"
						+ "  <div style=\"Margin-left: 20px;Margin-right: 20px;\">\n"
						+ "    <div class=\"btn btn--flat btn--large\" style=\"Margin-bottom: 20px;text-align: center;\">\n"
						+ "      <a style=\"border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #337ab7;font-family: sans-serif;\" href=\"http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com/src/pages/confirmation.html?e=" + "\" target=\"_blank\">\n"
						+ "        Ver detalhes\n"
						+ "      </a>\n"
						+ "  </div>\n"
						+ "</body>\n"
						+ "</html>";
				
				EmailConfirmation sendEmail = new EmailConfirmation();
				sendEmail.confirmation(email, messageSubject, messageText);
			}
		}
		catch (SQLException e) {
			check = false;
			LOG.log(Level.SEVERE, "Location not created on the database - user CPF: " + locacao.getCpf_locatario() + " - Car ID: " + locacao.getId_veiculo() + " - Error: " + e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "newLocation");
		return check;
	}
	
	public Map<Integer, String> consultLocation(CreateConsult consult) {
		LOG.entering(NAME, "consultLocation");
		
		String sql1 = EnvVariables.getEnvVariable("DATABASE_GET_LOCATION_1");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_GET_LOCATION_2");
		
		Map<Integer, String> consultMap = new HashMap<Integer, String>();
		
		try {
			String sql = "";
			if(consult.getIdOrCpf().length() == 11) {
				sql = sql2;
			}
			else {
				sql = sql1;
			}
			
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setString(1, consult.getIdOrCpf());

			ResultSet f = statement.executeQuery();
			
			while(f.next()) {
				for(int i = 1; i < 22; i++) {
					consultMap.put(i, f.getString(i));
				}
				
				LOG.log(Level.INFO, "Data geted from the database. ID Locação: #" + f.getString(1));
			}
			
			LOG.log(Level.INFO, "Location geted from the database - location ID or user CPF: " + consult.getIdOrCpf());
		}
		catch (SQLException e) {
			LOG.log(Level.SEVERE, "Location not geted from the database - location ID or user CPF: " + consult.getIdOrCpf() + " - Error: " + e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "consultLocation");
		return consultMap;
	}
	
	public boolean deleteLocation(DeleteLocacao location) {
		LOG.entering(NAME, "newLocation");
		
		String CHECK_VEHICLE = EnvVariables.getEnvVariable("CHECK_VEHICLE");
		String CHECK_LOCATARIO = EnvVariables.getEnvVariable("CHECK_LOCATARIO");
		
		String sql1 = EnvVariables.getEnvVariable("DATABASE_CANCEL_LOCATION_1");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_CANCEL_LOCATION_2");
		String sql3 = EnvVariables.getEnvVariable("DATABASE_CANCEL_LOCATION_3");
		
		boolean check = false;
		
		try {
			PreparedStatement CHECK_LOCATARIO_ACTIVE = Database.connect().prepareStatement(CHECK_LOCATARIO);
			CHECK_LOCATARIO_ACTIVE.setString(1, location.getCpf());
			CHECK_LOCATARIO_ACTIVE.setBoolean(2, true);
			
			PreparedStatement CHECK_VEHICLE_AVAILABLE = Database.connect().prepareStatement(CHECK_VEHICLE);
			CHECK_VEHICLE_AVAILABLE.setString(1, location.getIdVeiculo());
			CHECK_VEHICLE_AVAILABLE.setBoolean(2, false);
			
			ResultSet f1 = CHECK_VEHICLE_AVAILABLE.executeQuery();
			ResultSet f2 = CHECK_LOCATARIO_ACTIVE.executeQuery();
			
			boolean valid1 = false;
			boolean valid2 = false;
			
			while(f1.next()) {
				if(f1.getString(15).equals("0")) {
					valid1 = true;
				}
			}
			
			while(f2.next()) {
				if(f2.getString(22).equals("1")) {
					valid2 = true;
				}
			}
			
			if(valid1 && valid2) {
				PreparedStatement statementDelete = Database.connect().prepareStatement(sql1);
				statementDelete.setString(1, location.getIdLocacao());
				
				PreparedStatement statementVehicle = Database.connect().prepareStatement(sql2);
				statementVehicle.setBoolean(1, true);
				statementVehicle.setString(2, location.getIdVeiculo());
				
				PreparedStatement statementCliente = Database.connect().prepareStatement(sql3);
				statementCliente.setBoolean(1, false);
				statementCliente.setString(2, location.getCpf());
				
				statementDelete.execute();
				statementDelete.close();
				
				statementVehicle.execute();
				statementVehicle.close();
				
				statementCliente.execute();
				statementCliente.close();
				
				check = true;
				LOG.log(Level.INFO, "Location deleted from the database - Location ID: " + location.getIdLocacao() + " - User CPF: " + location.getCpf());
			}
		}
		catch (SQLException e) {
			check = false;
			LOG.log(Level.SEVERE, "Location not deleted from the database - Location ID: " + location.getIdLocacao() + " - User CPF: " + location.getCpf() + " - Error: " + e);
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "newLocation");
		return check;
	}
	
	public boolean updateLocation(UpdateLocacao location) {
		LOG.entering(NAME, "updateLocation");
		
		String sql1 = EnvVariables.getEnvVariable("DATABASE_UPDATE_LOCATION_4");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_UPDATE_LOCATION_5");
		
		boolean check = false;
		
		try {
			boolean pagamento_no_site = false;
			if(location.getPagamento_no_site().equals("true")) {
				pagamento_no_site =  true;
			}
			
			PreparedStatement statement = Database.connect().prepareStatement(sql1);
			statement.setBoolean(1, pagamento_no_site);
			statement.setString(2, location.getCpf_locatario());
			
			PreparedStatement statement1 = Database.connect().prepareStatement(sql2);
			statement1.setString(1, location.getCartao_pagamento());
			statement1.setString(2, location.getCpf_locatario());
			
			statement.execute();
			statement.close();
			
			statement1.execute();
			statement1.close();
			
			check = true;
			LOG.log(Level.INFO, "Location updated from the database - User CPF: " + location.getCpf_locatario() + " - Cartão: " + location.getCartao_pagamento() + " - pagamento_no_site: " + pagamento_no_site);
		}
		catch (SQLException e) {
			check = false;
			LOG.log(Level.SEVERE, "Location not updated from the database - User CPF: " + location.getCpf_locatario());
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "updateLocation");
		return check;
	}
}