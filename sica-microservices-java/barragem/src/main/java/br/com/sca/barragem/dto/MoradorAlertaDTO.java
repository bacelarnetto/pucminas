package br.com.sca.barragem.dto;

import java.io.Serializable;

public interface MoradorAlertaDTO extends Serializable {

	public Long getId();

	public String getNome();

	public String getEmail();

}
