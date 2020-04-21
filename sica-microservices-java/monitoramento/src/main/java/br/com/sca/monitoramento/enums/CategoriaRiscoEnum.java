package br.com.sca.monitoramento.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CategoriaRiscoEnum {
	BAIXO(1, "Baixo"),
	MEDIO(2, "Medio"),
	ALTO(3, "Alto");
	

	private Integer codigo;
	private String descricao;

	private CategoriaRiscoEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static CategoriaRiscoEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(CategoriaRiscoEnum status : CategoriaRiscoEnum.values()) {
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