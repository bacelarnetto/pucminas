package br.com.sca.barragem.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = BarragemAlertaDTO.class)
public class BarragemAlertaDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String nome;

	public BarragemAlertaDTO() {
		super();
	}

	public BarragemAlertaDTO(String nome) {
		super();
		this.nome = nome;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}
