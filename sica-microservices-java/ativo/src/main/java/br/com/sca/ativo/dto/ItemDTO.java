package br.com.sca.ativo.dto;

import br.com.sca.commons.lib.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ItemDTO implements AbstractEntity {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String descricao;

	private Integer quantidade;
	
	private String marca;
	
	private Long tipoInsumo;


	@Override
	public Long getId() {
		return id;
	}

}
