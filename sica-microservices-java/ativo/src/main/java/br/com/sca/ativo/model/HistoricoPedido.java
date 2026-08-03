package br.com.sca.ativo.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class HistoricoPedido implements AbstractEntity{		
	 
		private static final long serialVersionUID = 1L;

	    @Id
	    @GeneratedValue(strategy= GenerationType.IDENTITY)
	    private Long id;
	    
	    private Long idPedido;
	    
	    @JsonFormat(pattern="dd/MM/yyyy HH:mm")
	    private Date instante;

	    private Integer status;
	    
	    private String insumo;
	    
	    private Integer quantidadeInsumo;
	    
	    private String marca;

}
