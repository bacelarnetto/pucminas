package br.com.sca.monitoramento.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ObjetivoContencaoEnum {
	
	REJEITOS(1, "Rejeitos"),
	SEDIMENTOS(2, "Sedimentos");

	private Integer codigo;
	private String descricao;

	private ObjetivoContencaoEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static ObjetivoContencaoEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(ObjetivoContencaoEnum status : ObjetivoContencaoEnum.values()) {
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
