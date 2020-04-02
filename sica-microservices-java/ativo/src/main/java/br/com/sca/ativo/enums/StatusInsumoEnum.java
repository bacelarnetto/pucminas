package br.com.sca.ativo.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StatusInsumoEnum {
	ATIVO(1, "Ativo"), 
	DESATIVADO(2, "Desativado"),
	MANUTENCAO(3, "Em Manutenção");

	private Integer codigo;
	private String descricao;

	private StatusInsumoEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static StatusInsumoEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(StatusInsumoEnum status : StatusInsumoEnum.values()) {
			if(codigo.equals(status.getCodigo())) {
				return status;
			}			
		}
		
		throw new IllegalArgumentException("Id inválido:" + codigo);
	}

	public Integer getCodigo() {
		return codigo;
	}

	public String getDescricao() {
		return descricao;
	}

}
