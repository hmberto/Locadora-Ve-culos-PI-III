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
				}
			}
			
			while(f2.next()) {
				if(f2.getString(22).equals("0")) {
					valid2 = true;
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
		
		String sql = EnvVariables.getEnvVariable("DATABASE_UPDATE_LOCATION");
		
		boolean check = false;
		
		try {
			boolean pagamento_no_site = false;
			if(location.getPagamento_no_site().equals("true")) {
				pagamento_no_site =  true;
			}
			
			PreparedStatement statement = Database.connect().prepareStatement(sql);
			statement.setBoolean(1, pagamento_no_site);
			statement.setString(2, location.getCartao_pagamento());
			statement.setString(3, location.getCpf_locatario());
			
			statement.execute();
			statement.close();
			
			check = true;
			LOG.log(Level.INFO, "Location updated from the database - User CPF: " + location.getCpf_locatario());
		}
		catch (SQLException e) {
			check = false;
			LOG.log(Level.SEVERE, "Location not deleted from the database - User CPF: " + location.getCpf_locatario());
		}
		finally {
			Database.disconnect();
		}
		
		LOG.exiting(NAME, "updateLocation");
		return check;
	}
}