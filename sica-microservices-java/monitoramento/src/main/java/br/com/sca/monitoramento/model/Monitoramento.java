package br.com.sca.monitoramento.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.sca.commons.lib.model.AbstractEntity;
import br.com.sca.monitoramento.enums.CategoriaRiscoEnum;
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
public class Monitoramento implements AbstractEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;

	private Long idBarragem;

	private Integer codigoCriticidade;

	private String temperatura;

	private String volume;

	private String pressao;

	private String movimentacao;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
    private Date dataCadastro;
	

	public String getTemperatura() {
		return temperatura;
	}

	public void setTemperatura(String temperatura) {
		this.temperatura = temperatura;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public String getMovimentacao() {
		return movimentacao;
	}

	public void setMovimentacao(String movimentacao) {
		this.movimentacao = movimentacao;
	}

	public String getPressao() {
		return pressao;
	}

	public void setPressao(String pressao) {
		this.pressao = pressao;
	}

	@Override
	public Long getId() {
		return id;
	}

	public Long getIdBarragem() {
		return idBarragem;
	}

	public void setIdBarragem(Long idBarragem) {
		this.idBarragem = idBarragem;
	}

	public Integer getCodigoCriticidade() {
		return codigoCriticidade;
	}

	public void setCodigoCriticidade(Integer codigoCriticidade) {
		this.codigoCriticidade = codigoCriticidade;
	}
	
	public CategoriaRiscoEnum getCategoriaRisco() {
		return CategoriaRiscoEnum.toEnum(codigoCriticidade);
	}
}
