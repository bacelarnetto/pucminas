package br.com.sca.ativo.model;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.sca.ativo.enums.StatusInsumoEnum;
import br.com.sca.commons.lib.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Jose Bacelar
 */

@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Insumo implements AbstractEntity{	

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
	
	private String descricao;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	private Date dataHoraCadastro;

	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dataCompra;
	
	
	@ManyToOne
	@JoinColumn(name = "id_marca")
	private Marca marca;
	
	private Integer status;	
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_insumo")
	private TipoInsumo tipo;
	
	@JsonIgnore
	@OneToOne(mappedBy = "insumo", cascade = CascadeType.ALL,
    fetch = FetchType.LAZY, optional = false)
	private Manutencao manutencao;
	
	public StatusInsumoEnum getStatus() {
		return StatusInsumoEnum.toEnum(status);	
	}

	@Override
	public Long getId() {
		return id;
	}

	public String getDescricao() {
		return descricao;
	}

	public Date getDataHoraCadastro() {
		return dataHoraCadastro;
	}

	public Date getDataCompra() {
		return dataCompra;
	}

	public Marca getMarca() {
		return marca;
	}

	public TipoInsumo getTipo() {
		return tipo;
	}

	public Manutencao getManutencao() {
		return manutencao;
	}
	
	

}
