package br.com.sca.ativo.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.sca.ativo.enums.StatusPedidoEnum;
import br.com.sca.commons.lib.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Jose Bacelar
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Pedido implements AbstractEntity{		
 
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
	@JoinColumn(name = "id_fornecedor")
    private Fornecedor fornecedor;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private Date instante;

    private Integer status;
    
	@OneToMany(mappedBy="pedido")
    private List<Item> itens = new ArrayList<>();
	
	public StatusPedidoEnum getStatusPedidoEnum() {
		return StatusPedidoEnum.toEnum(status);
	}

}
