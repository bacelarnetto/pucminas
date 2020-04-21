package br.com.sca.monitoramento.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.sca.commons.lib.model.AbstractEntity;
import br.com.sca.monitoramento.enums.CategoriaRiscoEnum;
import br.com.sca.monitoramento.enums.DanoPotencialAssociadoEnum;
import br.com.sca.monitoramento.enums.ObjetivoContencaoEnum;
import br.com.sca.monitoramento.enums.SituacaoOperacionalEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


/**
 * @author Jose Bacelar
 */
@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Barragem implements AbstractEntity {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;

	@Column(nullable = false)
	private String descricao;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private Date dataCadastro;
	
	private String empreendedor;
	
	@Column(length = 20)
	private String cnpjEmpreendedor;
	
	private String minerio;	
	
	private Integer codigoObjetivoContencao;
	
	private Integer codigoSituacaoOperacional;
	
	private Integer codigoDanoPotencial;
	
	private Integer codigoCategoriaRisco;
	
	private Integer status;
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_barragem")
	private TipoBarragem tipo;
	
	@Column(length = 1)
	private String alimentadoUsina;
	
	private String cidade;
	
	@Column(length = 2)
	private String uf;
	
	private String latitude;
	
	private String longitude;	
	
	private Integer vidaUtilQuantidadeAnos;
	
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dataConstrucao;
	
	@JsonIgnore
	@OneToMany(mappedBy="barragem")
	private List<Morador> moradores;

	@Override
	public Long getId() {
		return id;
	}

	public CategoriaRiscoEnum getCategoriaRisco() {
		return CategoriaRiscoEnum.toEnum(codigoCategoriaRisco);
	}
	
	public DanoPotencialAssociadoEnum getDanoPotencialAssociado() {
		return DanoPotencialAssociadoEnum.toEnum(codigoDanoPotencial);
	}
	
	public ObjetivoContencaoEnum getObjetivoContencao() {
		return ObjetivoContencaoEnum.toEnum(codigoObjetivoContencao);
	}
	
	public SituacaoOperacionalEnum getSituacaoOperacional() {
		return SituacaoOperacionalEnum.toEnum(codigoSituacaoOperacional);
	}

	
}