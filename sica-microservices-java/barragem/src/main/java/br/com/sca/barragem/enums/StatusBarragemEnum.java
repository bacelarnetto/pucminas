package br.com.sca.barragem.enums;

public enum StatusBarragemEnum {
	
	ATIVO(1, "Ativo"),
	CANCELADO(2, "Cancelado");

	private Integer codigo;
	private String descricao;

	private StatusBarragemEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static StatusBarragemEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(StatusBarragemEnum status : StatusBarragemEnum.values()) {
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
