package br.com.interdisciplinar.locadora.database;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.logging.Level;
import java.util.logging.Logger;

import br.com.interdisciplinar.locadora.dt.EnvVariables;

public class Database {
	public static String NAME = Database.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(Database.class.getName());
	
	private static final String DATABASE_DRIVER = EnvVariables.getEnvVariable("DATABASE_DRIVER");
    private static final String DATABASE_URL = EnvVariables.getEnvVariable("DATABASE_URL");
    private static final String USERNAME = EnvVariables.getEnvVariable("USERNAME");
    private static final String PASSWORD = EnvVariables.getEnvVariable("PASSWORD");
    private static final String MAX_POOL = EnvVariables.getEnvVariable("MAX_POOL");

    private static Connection connection;
    private static Properties properties;

    private static Properties getProperties() {
    	LOG.entering(NAME, "getProperties");
    	
    	if (properties == null) {
    		properties = new Properties();
    		properties.setProperty("user", USERNAME);
    		properties.setProperty("password", PASSWORD);
    		properties.setProperty("MaxPooledStatements", MAX_POOL);
    	}
    	
    	LOG.log(Level.INFO, "Properties setuped");
    	
    	LOG.exiting(NAME, "getProperties");
    	return properties;
    }

	public static Connection connect() {
		LOG.entering(NAME, "connect");
		
		if (connection == null) {
			try {
				Class.forName(DATABASE_DRIVER);
				connection = DriverManager.getConnection(DATABASE_URL, getProperties());
				
				LOG.log(Level.INFO, "Connection started");
			} catch (Exception e) {
				LOG.log(Level.SEVERE, "Connection not started", e);
			}
		}
		
		LOG.exiting(NAME, "connect");
		return connection;
	}

	public static void disconnect() {
		LOG.entering(NAME, "disconnect");
		
        if (connection != null) {
            try {
                connection.close();
                connection = null;
                
                LOG.log(Level.INFO, "Connection closed");
            } catch (SQLException e) {
            	LOG.log(Level.SEVERE, "Connection not closed", e);
            }
        }
        
        LOG.exiting(NAME, "disconnect");
    }
    
    public void DBConnect(int id, Set<Integer> numberList) {
    	LOG.entering(NAME, "DBConnect");

    	String sql = EnvVariables.getEnvVariable("DATABASE_INSERT");
  	  
    	String numbers = "";
    	Iterator<Integer> numbersIterator = numberList.iterator();
      
    	while (numbersIterator.hasNext()){      
    		if(numbers.equals("") || numbers == "") {
    			numbers = numbers + "[" + numbersIterator.next();
    		}
    		else {
    			numbers = numbers + "," + numbersIterator.next();
    		}
    	}

    	numbers = numbers + "]";
  	      
    	try {
    		PreparedStatement statement = Database.connect().prepareStatement(sql);
  	      
    		statement.setLong(1, id);
    		statement.setString(2, numbers);
  	      
    		statement.execute();
    		statement.close();
    		
    		LOG.log(Level.INFO, "Data entered in the database");
    	} catch (SQLException e) {
    		LOG.log(Level.SEVERE, "Data not entered in the database", e);
    	} finally {
    		Database.disconnect();
    	}
    	
    	LOG.exiting(NAME, "DBConnect");
	}
}