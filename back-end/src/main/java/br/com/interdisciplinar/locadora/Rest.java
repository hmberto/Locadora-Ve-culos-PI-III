package br.com.interdisciplinar.locadora;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import br.com.interdisciplinar.locadora.clients.AuthChangePass;
import br.com.interdisciplinar.locadora.clients.AuthUser;
import br.com.interdisciplinar.locadora.clients.CheckData;
import br.com.interdisciplinar.locadora.clients.CreateUser;
import br.com.interdisciplinar.locadora.clients.GenerateClients;
import br.com.interdisciplinar.locadora.clients.GenerateClientsA;
import br.com.interdisciplinar.locadora.clients.LogoutUser;
import br.com.interdisciplinar.locadora.clients.SexoVerify;
import br.com.interdisciplinar.locadora.cupom.CreateCupom;
import br.com.interdisciplinar.locadora.cupom.GenerateCupom;
import br.com.interdisciplinar.locadora.database.LocacaoFromDB;
import br.com.interdisciplinar.locadora.database.EmailConfirmationDB;
import br.com.interdisciplinar.locadora.database.GetCarFromDB;
import br.com.interdisciplinar.locadora.database.GetCupomFromDB;
import br.com.interdisciplinar.locadora.database.GetUserFromDB;
import br.com.interdisciplinar.locadora.database.LoginUserFromDB;
import br.com.interdisciplinar.locadora.database.LogoutUserFromDB;
import br.com.interdisciplinar.locadora.database.SendUserToDB;
import br.com.interdisciplinar.locadora.database.UpdatePassFromDB;
import br.com.interdisciplinar.locadora.locacao.CreateConsult;
import br.com.interdisciplinar.locadora.locacao.CreateLocacao;
import br.com.interdisciplinar.locadora.locacao.DeleteLocacao;
import br.com.interdisciplinar.locadora.locacao.GenerateConsult;
import br.com.interdisciplinar.locadora.locacao.UpdateLocacao;
import br.com.interdisciplinar.locadora.mail.EmailConfirmationAuth;
import br.com.interdisciplinar.locadora.mail.EmailUpdateAuth;
import br.com.interdisciplinar.locadora.veiculos.AvailableCars;
import br.com.interdisciplinar.locadora.veiculos.CreateModels;
import br.com.interdisciplinar.locadora.veiculos.CreateVehicle;
import br.com.interdisciplinar.locadora.veiculos.GenerateCars;

import java.util.Map;

@Produces("application/json")
@Consumes("application/json")
public class Rest {
	@POST
	@Path("/clientes/pwdReset")
	public Response postPwdReset(AuthChangePass login) {
		try {
			if(login.getUser().length() > 1 && login.getCpf().length() > 1 && login.getNewPass().length() > 1) {
				UpdatePassFromDB userFromDb = new UpdatePassFromDB();				
				boolean updatePass = userFromDb.updatePass(login);
				
				if(updatePass) {
					return Response.status(Response.Status.OK).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/clientes/login")
	public Response postLogin(AuthUser login) {
		try {
			if(login.getUser().length() > 1 && login.getPass().length() > 1) {
				LoginUserFromDB userFromDb = new LoginUserFromDB();				
				Map<Integer, String> session = userFromDb.LoginUser(login.getUser(), login.getPass(), login.getNewLogin(), login.getLoginInfo());
				
				if(session.get(1).length() == 50) {
					return Response.ok(new GenerateClients(session)).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/clientes/logout")
	public Response postLogout(LogoutUser login) {
		try {
			if(login.getSession().length() == 50) {
				LogoutUserFromDB userFromDb = new LogoutUserFromDB();				
				Map<Integer, String> session = userFromDb.LogoutUser(login.getSession());
				
				return Response.ok(new GenerateClients(session)).build();
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/clientes/user")
	public Response postGetUser(LogoutUser login) {
		try {
			if(login.getSession().length() == 50) {
				GetUserFromDB userFromDb = new GetUserFromDB();				
				Map<Integer, String> user = userFromDb.GetUser(login.getSession());
				
				if(user.get(2) == null || user.get(2).equals("null")) {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
				else {
					return Response.ok(new GenerateClientsA(user)).build();
				}
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
						
			if(cars.length() > 5) {
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
	
	@POST
	@Path("/veiculos/disponibilidade")
	public Response availableCars(AvailableCars vehicle) throws Exception {
		try {
			GetCarFromDB carFromDb = new GetCarFromDB();
			String cars = carFromDb.GetCarsSearch(vehicle);
			
			if(cars.length() > 5) {
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
	
	@GET
	@Path("/veiculos/marcas")
	public Response getMarcas() throws Exception {
		try {
			GetCarFromDB carFromDb = new GetCarFromDB();
			String cars = carFromDb.GetMarcas();
			
			if(cars.length() > 5) {
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
	
	@POST
	@Path("/veiculos/modelos")
	public Response getModelos(CreateModels marca) throws Exception {
		try {
			GetCarFromDB carFromDb = new GetCarFromDB();
			String cars = carFromDb.GetModelos(marca);
			
			if(cars.length() > 5) {
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
	
	@GET
	@Path("/veiculos/agencias")
	public Response getAgencias() throws Exception {
		try {
			GetCarFromDB carFromDb = new GetCarFromDB();
			String cars = carFromDb.GetAgencias();
			
			if(cars.length() > 5) {
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
	
	@POST
	@Path("/cupons/validate")
	public Response postCupom(CreateCupom cupom) throws Exception {
		try {
			if(cupom.getCupom().length() > 1) {
				GetCupomFromDB cupomFromDb = new GetCupomFromDB();
				Map<Integer, String> cupomMap = cupomFromDb.GetCupom(cupom);
				
				if(cupomMap.get(2).length() > 1) {
					return Response.ok(new GenerateCupom(cupomMap)).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/location/create")
	public Response postLocation(CreateLocacao locacao) throws Exception {
		try {
			if(locacao.getCpf_locatario().length() > 1) {
				LocacaoFromDB createLocacao = new LocacaoFromDB();
				boolean check = createLocacao.newLocation(locacao);
				
				if(check) {
					return Response.status(Response.Status.CREATED).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/location/consult")
	public Response postCheckLocation(CreateConsult consult) throws Exception {
		try {
			if(consult.getIdOrCpf().length() > 1) {
				LocacaoFromDB createConsult = new LocacaoFromDB();
				Map<Integer, String> consultMap = createConsult.consultLocation(consult);
				
				if(consultMap.get(2).length() > 1) {
					return Response.ok(new GenerateConsult(consultMap)).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/location/delete")
	public Response postDeleteLocation(DeleteLocacao location) throws Exception {
		try {
			if(location.getCpf().length() > 1 && location.getIdLocacao().length() > 1 && location.getIdVeiculo().length() > 1) {
				LocacaoFromDB createConsult = new LocacaoFromDB();
				boolean valid = createConsult.deleteLocation(location);
				
				if(valid) {
					return Response.status(Response.Status.OK).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/location/update")
	public Response postUpdateLocation(UpdateLocacao location) throws Exception {
		try {
			if(location.getCpf_locatario().length() > 1 && location.getPagamento_no_site().equals("true") && location.getCartao_pagamento().length() > 1) {
				LocacaoFromDB createConsult = new LocacaoFromDB();
				boolean valid = createConsult.updateLocation(location);
				
				if(valid) {
					return Response.status(Response.Status.OK).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		}
		catch(Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/email/confirm")
	public Response emailConfirmation(EmailConfirmationAuth email) {
		try {
			if(email.getEmailToken().length() == 50) {
				EmailConfirmationDB emailConfirm = new EmailConfirmationDB();				
				boolean confirm = emailConfirm.confirmation(email);
				
				if(confirm) {
					return Response.status(Response.Status.OK).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/email/update")
	public Response emailUpdate(EmailUpdateAuth email) {
		try {
			if(email.getNewEmail().length() > 2 && email.getLogin().length() > 2 && email.getPass().length() > 2) {
				EmailConfirmationDB emailConfirm = new EmailConfirmationDB();				
				boolean confirm = emailConfirm.update(email);
				
				if(confirm) {
					return Response.status(Response.Status.OK).build();
				}
				else {
					return Response.status(Response.Status.BAD_REQUEST).build();
				}
			}
			else {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
		} catch (Exception e) {
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