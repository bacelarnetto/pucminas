package br.com.sca.barragem.dto;

import java.io.Serializable;


public class EnvioAlertaDTO implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	private Long idBarragem;

	public Long getIdBarragem() {
		return idBarragem;
	}

	public void setIdBarragem(Long idBarragem) {
		this.idBarragem = idBarragem;
	}


}
