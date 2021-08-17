package br.com.interdisciplinar.locadora.clients;

import java.util.Map;
import java.util.logging.Logger;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Generate")
public class GenerateClients {
	public static String NAME = GenerateClients.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(GenerateClients.class.getName());
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getRg() {
		return rg;
	}
	public void setRg(String rg) {
		this.rg = rg;
	}
	public String getDataNascimento() {
		return dataNascimento;
	}
	public void setDataNascimento(String dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getCelular() {
		return celular;
	}
	public void setCelular(String celular) {
		this.celular = celular;
	}
	public String getRua() {
		return rua;
	}
	public void setRua(String rua) {
		this.rua = rua;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getComplemento() {
		return complemento;
	}
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getNumeroCnh() {
		return numeroCnh;
	}
	public void setNumeroCnh(String numeroCnh) {
		this.numeroCnh = numeroCnh;
	}
	public String getRegistroCnh() {
		return registroCnh;
	}
	public void setRegistroCnh(String registroCnh) {
		this.registroCnh = registroCnh;
	}
	public String getValidadeCnh() {
		return validadeCnh;
	}
	public void setValidadeCnh(String validadeCnh) {
		this.validadeCnh = validadeCnh;
	}
	public String getCategoriaCnh() {
		return categoriaCnh;
	}
	public void setCategoriaCnh(String categoriaCnh) {
		this.categoriaCnh = categoriaCnh;
	}
	public String isLocatarioAtivo() {
		return locatarioAtivo;
	}
	public void setLocatarioAtivo(String locatarioAtivo) {
		this.locatarioAtivo = locatarioAtivo;
	}
	
	String nome;
	String cpf;
	String rg;
	String dataNascimento;
	String sexo;
	String email;
	String telefone;
	String celular;
	String rua;
	String numero;
	String complemento;
	String bairro;
	String cep;
	String cidade;
	String estado;
	String login;
	String senha;
	String numeroCnh;
	String registroCnh;
	String validadeCnh;
	String categoriaCnh;
	String locatarioAtivo;
		
	public GenerateClients(Map<Integer, String> user) {
		super();
		
		LOG.entering(NAME, "GenerateClients");

		this.nome = user.get(1);
		this.cpf = user.get(2);
		this.rg = user.get(3);
		this.dataNascimento = user.get(4);
		this.sexo = user.get(5);
		this.email = user.get(6);
		this.telefone = user.get(7);
		this.celular = user.get(8);
		this.rua = user.get(9);
		this.numero = user.get(10);
		this.complemento = user.get(11);
		this.bairro = user.get(12);
		this.cep = user.get(13);
		this.cidade = user.get(14);
		this.estado = user.get(15);
		this.login = user.get(16);
		this.senha = user.get(17);
		this.numeroCnh = user.get(18);
		this.registroCnh = user.get(19);
		this.validadeCnh = user.get(20);
		this.categoriaCnh = user.get(21);
		this.locatarioAtivo = user.get(22);
		
		LOG.exiting(NAME, "GenerateClients");
	}
}
