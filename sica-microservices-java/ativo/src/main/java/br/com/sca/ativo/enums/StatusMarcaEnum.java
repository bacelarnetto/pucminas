package br.com.sca.ativo.enums;

public enum StatusMarcaEnum {
	ATIVO(1, "Ativo"),
	CANCELADO(2, "Cancelado");

	private Integer codigo;
	private String descricao;

	private StatusMarcaEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static StatusMarcaEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(StatusMarcaEnum status : StatusMarcaEnum.values()) {
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
