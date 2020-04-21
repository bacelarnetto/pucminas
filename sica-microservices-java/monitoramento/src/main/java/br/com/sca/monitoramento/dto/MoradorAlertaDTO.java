package br.com.sca.monitoramento.dto;

import java.io.Serializable;

public interface MoradorAlertaDTO extends Serializable {

	public Long getId();

	public String getNome();

	public String getEmail();
	
	public Long getIdBarragem();
	
	public String getNomeBarragem();
	

}
