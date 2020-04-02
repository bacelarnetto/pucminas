package br.com.sca.ativo.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StatusPedidoEnum {
	ENVIADO(1,"Enviado"),
	RECEBIDO_FORNECEDOR(2,"Confirmação de Recebimento"),
	PENDENTE(3, "Pendente"), 	
	EM_TRANSPORTE(4, "Em transporte"),
	EFETIVADO(5, "Efetivado"),
	CANCELADO(6, "Cancelado"),
	CANCELADO_FORNECEDOR(7, "Cancelado pelo Fornecedor"),;
	

	private Integer codigo;
	private String descricao;

	private StatusPedidoEnum(Integer codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}
	
	public static StatusPedidoEnum toEnum(Integer codigo) {
		if(codigo == null) {
			return null;
		}
		for(StatusPedidoEnum status : StatusPedidoEnum.values()) {
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
