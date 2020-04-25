package br.com.sca.monitoramento.dto;

import java.io.Serializable;

public class MonitoramentoDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long idBarragem;

	private Integer codigoCriticidade;

	private String temperatura;

	private String volume;

	private String pressao;

	private String movimentacao;

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

	public String getPressao() {
		return pressao;
	}

	public void setPressao(String pressao) {
		this.pressao = pressao;
	}

	public String getMovimentacao() {
		return movimentacao;
	}

	public void setMovimentacao(String movimentacao) {
		this.movimentacao = movimentacao;
	}

	public MonitoramentoDTO(Long idBarragem, Integer codigoCriticidade, String temperatura, String volume,
			String pressao, String movimentacao) {
		super();
		this.idBarragem = idBarragem;
		this.codigoCriticidade = codigoCriticidade;
		this.temperatura = temperatura;
		this.volume = volume;
		this.pressao = pressao;
		this.movimentacao = movimentacao;
	}

	public MonitoramentoDTO() {
		super();

	}

}
