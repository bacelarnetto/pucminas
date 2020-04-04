package br.com.sca.token.enums;

public enum RoleEnum {

	ADMIN(1, "ROLE_ADMIN"), 
	FUNCTIONARY(2, "ROLE_FUNCTIONARY"),
	ENGINEER(3, "ROLE_ENGINEER"),
	PROVIFER(4, "ROLE_PROVIDER"),
	RESIDENT(5, "ROLE_RESIDENT"),
	MECHANICAL(6, "ROLE_MECHANICAL");

	private int codigo;
	private String descricao;

	private RoleEnum(int codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public int getCodigo() {
		return codigo;
	}

	public String getDescricao() {
		return descricao;
	}

	public static RoleEnum toEnum(Integer codigo) {

		if (codigo == null) {
			return null;
		}

		for (RoleEnum x : RoleEnum.values()) {
			if (codigo.equals(x.getCodigo())) {
				return x;
			}
		}

		throw new IllegalArgumentException("Id inválido: " + codigo);
	}

}