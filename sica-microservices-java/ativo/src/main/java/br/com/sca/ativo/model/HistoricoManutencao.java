package br.com.sca.ativo.model;

import java.util.Date;

import jakarta.persistence.Column;
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
public class HistoricoManutencao implements AbstractEntity{		
	 
		private static final long serialVersionUID = 1L;

	    @Id
	    @GeneratedValue(strategy= GenerationType.IDENTITY)
	    private Long id;
	    
	    private Long idManutencao;
	    
	    private Long idInsumo;

		private String solicitante;
		
		@Column(columnDefinition = "TEXT")
		private String descricao;
		
		@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	    private Date instante;		
		
		@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	    private Date instanteManutencao;	

		@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
		private Date dataInicio;

		@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
		private Date dataFim;

		private Long idTipo;
		
		private String responsavel;
		
		@Column(columnDefinition = "TEXT")
		private String parecerResponsavel;	    
	    

}
