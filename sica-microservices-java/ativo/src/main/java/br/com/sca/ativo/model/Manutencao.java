package br.com.sca.ativo.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

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
