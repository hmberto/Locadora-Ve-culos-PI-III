package br.com.interdisciplinar.locadora.locacao;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "UpdateLocacao")
public class UpdateLocacao {
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
	
	public String getCpf_locatario() {
		return cpf_locatario;
	}

	public void setCpf_locatario(String cpf_locatario) {
		this.cpf_locatario = cpf_locatario;
	}
	
	String pagamento_no_site;
	String cartao_pagamento;
	String cpf_locatario;
	
	public UpdateLocacao() {}
}
