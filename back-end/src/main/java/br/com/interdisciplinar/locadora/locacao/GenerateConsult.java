package br.com.interdisciplinar.locadora.locacao;

import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "GenerateCupom")
public class GenerateConsult {
	public String getId_locacao() {
		return id_locacao;
	}

	public void setId_locacao(String id_locacao) {
		this.id_locacao = id_locacao;
	}

	public String getCpf_locatario() {
		return cpf_locatario;
	}

	public void setCpf_locatario(String cpf_locatario) {
		this.cpf_locatario = cpf_locatario;
	}

	public String getId_veiculo() {
		return id_veiculo;
	}

	public void setId_veiculo(String id_veiculo) {
		this.id_veiculo = id_veiculo;
	}

	public String getData_locacao() {
		return data_locacao;
	}

	public void setData_locacao(String data_locacao) {
		this.data_locacao = data_locacao;
	}

	public String getHora_locacao() {
		return hora_locacao;
	}

	public void setHora_locacao(String hora_locacao) {
		this.hora_locacao = hora_locacao;
	}

	public String getData_retirada() {
		return data_retirada;
	}

	public void setData_retirada(String data_retirada) {
		this.data_retirada = data_retirada;
	}

	public String getHora_retirada() {
		return hora_retirada;
	}

	public void setHora_retirada(String hora_retirada) {
		this.hora_retirada = hora_retirada;
	}

	public String getData_devolucao() {
		return data_devolucao;
	}

	public void setData_devolucao(String data_devolucao) {
		this.data_devolucao = data_devolucao;
	}

	public String getHora_devolucao() {
		return hora_devolucao;
	}

	public void setHora_devolucao(String hora_devolucao) {
		this.hora_devolucao = hora_devolucao;
	}

	public String getTempo_locacao() {
		return tempo_locacao;
	}

	public void setTempo_locacao(String tempo_locacao) {
		this.tempo_locacao = tempo_locacao;
	}

	public String getId_funcionario() {
		return id_funcionario;
	}

	public void setId_funcionario(String id_funcionario) {
		this.id_funcionario = id_funcionario;
	}

	public String getValor_total_locacao() {
		return valor_total_locacao;
	}

	public void setValor_total_locacao(String valor_total_locacao) {
		this.valor_total_locacao = valor_total_locacao;
	}

	public String getCupom_aplicado() {
		return cupom_aplicado;
	}

	public void setCupom_aplicado(String cupom_aplicado) {
		this.cupom_aplicado = cupom_aplicado;
	}

	public String getValor_descontos() {
		return valor_descontos;
	}

	public void setValor_descontos(String valor_descontos) {
		this.valor_descontos = valor_descontos;
	}

	public String getValor_total_a_pagar() {
		return valor_total_a_pagar;
	}

	public void setValor_total_a_pagar(String valor_total_a_pagar) {
		this.valor_total_a_pagar = valor_total_a_pagar;
	}

	public String getLocal_retirada() {
		return local_retirada;
	}

	public void setLocal_retirada(String local_retirada) {
		this.local_retirada = local_retirada;
	}

	public String getLocal_devolucao() {
		return local_devolucao;
	}

	public void setLocal_devolucao(String local_devolucao) {
		this.local_devolucao = local_devolucao;
	}

	public String getCadeirinha() {
		return cadeirinha;
	}

	public void setCadeirinha(String cadeirinha) {
		this.cadeirinha = cadeirinha;
	}

	public String getCapa_cinto_animais() {
		return capa_cinto_animais;
	}

	public void setCapa_cinto_animais(String capa_cinto_animais) {
		this.capa_cinto_animais = capa_cinto_animais;
	}
	
	public String getPagamento_no_site() {
		return pagamento_no_site;
	}

	public void setPagamento_no_site(String pagamento_no_site) {
		this.pagamento_no_site = pagamento_no_site;
	}
	
	public String getCartao_pagamento() {
		return cartao_pagamento;
	}

	public void setCartao_pagamento(String cartao_pagamento) {
		this.cartao_pagamento = cartao_pagamento;
	}
	
	String id_locacao;
	String cpf_locatario;
	String id_veiculo;
	String data_locacao;
	String hora_locacao;
	String data_retirada;
	String hora_retirada;
	String data_devolucao;
	String hora_devolucao;
	String tempo_locacao;
	String id_funcionario;
	String valor_total_locacao;
	String cupom_aplicado;
	String valor_descontos;
	String valor_total_a_pagar;
	String local_retirada;
	String local_devolucao;
	String cadeirinha;
	String capa_cinto_animais;
	String pagamento_no_site;
	String cartao_pagamento;
		
	public GenerateConsult(Map<Integer, String> consult) {
		super();
				
		this.id_locacao = consult.get(1);
		this.cpf_locatario = consult.get(2);
		this.id_veiculo = consult.get(3);
		this.data_locacao = consult.get(4);
		this.hora_locacao = consult.get(5);
		this.data_retirada = consult.get(6);
		this.hora_retirada = consult.get(7);
		this.data_devolucao = consult.get(8);
		this.hora_devolucao = consult.get(9);
		this.tempo_locacao = consult.get(10);
		this.id_funcionario = consult.get(11);
		this.valor_total_locacao = consult.get(12);
		this.cupom_aplicado = consult.get(13);
		this.valor_descontos = consult.get(14);
		this.valor_total_a_pagar = consult.get(15);
		this.local_retirada = consult.get(16);
		this.local_devolucao = consult.get(17);
		this.cadeirinha = consult.get(18);
		this.capa_cinto_animais = consult.get(19);
		this.pagamento_no_site = consult.get(20);
		this.cartao_pagamento = consult.get(21);
	}
}
