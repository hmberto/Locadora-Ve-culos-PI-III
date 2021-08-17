package br.com.interdisciplinar.locadora.dt;

import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.bind.annotation.XmlRootElement;

import org.json.JSONWriter;

@XmlRootElement(name = "JsonWriter")
public class JsonWriter {
	public static String NAME = JsonWriter.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(JsonWriter.class.getName());
	
	public String getRes() {
		return res;
	}
	public void setRes(String res) {
		this.res = res;
	}
	  
	String res;
	  
	public JsonWriter() {}
	public JsonWriter(Set<Integer> numberList) {
		LOG.entering(NAME, "JsonWriter");
		
		StringBuffer buffer = new StringBuffer();
		JSONWriter newJson = new JSONWriter(buffer);
	
		newJson.object();
	
		newJson.key("data");
		newJson.object();
	
		newJson.key("ID").value(123456);
		newJson.key("numbers");
		newJson.array();
		for(int numbers: numberList) {
			newJson.value(numbers);
		}
		newJson.endArray();
	
		newJson.endObject();
		newJson.endObject();
	
		this.res = buffer.toString();
		
		LOG.log(Level.INFO, "New payload: " + buffer.toString());
		
		LOG.exiting(NAME, "JsonWriter");
  }
}
