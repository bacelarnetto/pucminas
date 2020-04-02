package br.com.sca.ativo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.com.sca.commons.lib.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Manutencao implements AbstractEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String solicitante;
	
	@Column(columnDefinition = "TEXT")
	private String descricao;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private Date instante;

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_insumo")
	private Insumo insumo;

	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private Date dataInicio;

	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private Date dataFim;

	@ManyToOne
	@JoinColumn(name = "id_tipo_manutencao")
	private TipoManutencao tipo;
	
	private String responsavel;
	
	@Column(columnDefinition = "TEXT")
	private String parecerResponsavel;
	
	
}
