package br.com.interdisciplinar.locadora;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import br.com.interdisciplinar.locadora.clients.AuthUser;
import br.com.interdisciplinar.locadora.clients.CheckData;
import br.com.interdisciplinar.locadora.clients.CreateUser;
import br.com.interdisciplinar.locadora.clients.GenerateClients;
import br.com.interdisciplinar.locadora.clients.SexoVerify;
import br.com.interdisciplinar.locadora.database.GetCarFromDB;
import br.com.interdisciplinar.locadora.database.GetUserFromDB;
import br.com.interdisciplinar.locadora.database.SendUserToDB;
import br.com.interdisciplinar.locadora.veiculos.CreateVehicle;
import br.com.interdisciplinar.locadora.veiculos.GenerateCars;

import java.util.Map;

@Produces("application/json")
@Consumes("application/json")
public class Rest {
	@POST
	@Path("/clientes/login")
	public Response postLogin(AuthUser login) {
		try {
			if(login.getUser().length() > 1 && login.getPass().length() > 1) {
				GetUserFromDB userFromDb = new GetUserFromDB();				
				Map<Integer, String> user = userFromDb.GetUser(login.getUser(), login.getPass());
				
				if(user.get(2) == null || user.get(2).equals("null")) {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
				else {
					return Response.ok(new GenerateClients(user)).build();
				}
				// return Response.ok(new GenerateClients(nome, cpf, rg, dataNascimento, sexo, email, telefone, celular, rua, numero, complemento, bairro, cep, cidade, estado, login, senha, numeroCnh, registroCnh, validadeCnh, categoriaCnh, locatarioAtivo)).build();
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/clientes/cadastro")
	public Response postCadastro(CreateUser user) throws Exception {
		try {
			new SexoVerify().verify(user);
			
			CheckData validate = new CheckData();
			boolean check = validate.checkData(user);
			
			SendUserToDB createUser = new SendUserToDB();
			boolean create = createUser.CreateUserDB(user);
			
			if(check && create) {
				return Response.status(Response.Status.CREATED).build();			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/veiculos/consulta")
	public Response postCar(CreateVehicle vehicle) throws Exception {
		try {
			GetCarFromDB carFromDb = new GetCarFromDB();				
			Map<Integer, String> car = carFromDb.GetCar(vehicle.getCarId());
			
			if(car.get(1) != null) {
				return Response.ok(new GenerateCars(car)).build();
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@GET
	@Path("/veiculos/todos")
	public Response postCars() throws Exception {
		try {
			GetCarFromDB carFromDb = new GetCarFromDB();				
			String cars = carFromDb.GetCars();
						
			if(cars.length() > 0) {
				return Response.ok(cars).build();
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@OPTIONS
	@Path("{path : .*}")
	public Response options() {
	    return Response.ok("")
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .build();
	}
}