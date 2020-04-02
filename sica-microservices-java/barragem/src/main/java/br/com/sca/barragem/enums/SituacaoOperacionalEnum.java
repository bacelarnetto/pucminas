package br.com.sca.barragem.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum SituacaoOperacionalEnum {
	
	EM_CONSTRUCAO(1, "Em Construção"),
	EM_OPERACAO(2, "Em Operação"),
	DESATIVADA(3, "Desativada");

	private Integer codigo;
	private String descricao;

	private SituacaoOperacionalEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static SituacaoOperacionalEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(SituacaoOperacionalEnum status : SituacaoOperacionalEnum.values()) {
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
