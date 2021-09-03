package br.com.interdisciplinar.locadora.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;
import br.com.interdisciplinar.locadora.dt.GenerateID;
import br.com.interdisciplinar.locadora.locacao.CreateConsult;
import br.com.interdisciplinar.locadora.locacao.CreateLocacao;

public class LocacaoFromDB {
	public static String NAME = LocacaoFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(LocacaoFromDB.class.getName());
	
	public boolean newLocation(CreateLocacao locacao) {
		LOG.entering(NAME, "newLocation");
		
		String sql1 = EnvVariables.getEnvVariable("DATABASE_INSERT_LOCATION_1");
		String sql2 = EnvVariables.getEnvVariable("DATABASE_UPDATE_LOCATION_2");
		String sql3 = EnvVariables.getEnvVariable("DATABASE_UPDATE_LOCATION_3");
		
		boolean check = false;
		
		try {
			GenerateID idLocacao = new GenerateID();
			int newId = idLocacao.getId(15);
			
			PreparedStatement statement = Database.connect().prepareStatement(sql1);
			statement.setString(1, newId + "-01");
			statement.setString(2, locacao.getCpf_locatario());
			statement.setString(3, locacao.getId_veiculo());
			statement.setString(4, locacao.getData_locacao());
			statement.setString(5, locacao.getHora_locacao());
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
			statement.setString(18, locacao.getCadeirinha());
			statement.setString(19, locacao.getCapa_cinto_animais());
			
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
				for(int i = 1; i < 4; i++) {
					consultMap.put(i, f.getString(i));
				}
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
}