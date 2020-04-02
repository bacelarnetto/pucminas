package br.com.sca.ativo.enums;

public enum StatusFornecedorEnum {
	ATIVO(1, "Ativo"),
	CANCELADO(2, "Cancelado");

	private Integer codigo;
	private String descricao;

	private StatusFornecedorEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static StatusFornecedorEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(StatusFornecedorEnum status : StatusFornecedorEnum.values()) {
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
