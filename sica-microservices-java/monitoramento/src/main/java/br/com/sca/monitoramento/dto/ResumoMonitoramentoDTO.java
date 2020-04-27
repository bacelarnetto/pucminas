package br.com.sca.monitoramento.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ResumoMonitoramentoDTO implements Serializable{
	

	private static final long serialVersionUID = 1L;
	
	private Long idBarragem;
	
	private String nomeBarragem;

	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	private List<Date> datas;
	
	private List<String> temperaturas;

	private List<String> volumes;

	private List<String> pressoes;

	private List<String> movimentacoes;

	public List<Date> getDatas() {
		return datas;
	}

	public void setDatas(List<Date> datas) {
		this.datas = datas;
	}

	public List<String> getTemperaturas() {
		return temperaturas;
	}

	public void setTemperaturas(List<String> temperaturas) {
		this.temperaturas = temperaturas;
	}

	public List<String> getVolumes() {
		return volumes;
	}

	public void setVolumes(List<String> volumes) {
		this.volumes = volumes;
	}

	public List<String> getPressoes() {
		return pressoes;
	}

	public void setPressoes(List<String> pressoes) {
		this.pressoes = pressoes;
	}

	public List<String> getMovimentacoes() {
		return movimentacoes;
	}

	public void setMovimentacoes(List<String> movimentacoes) {
		this.movimentacoes = movimentacoes;
	}

	public Long getIdBarragem() {
		return idBarragem;
	}

	public void setIdBarragem(Long idBarragem) {
		this.idBarragem = idBarragem;
	}

	public String getNomeBarragem() {
		return nomeBarragem;
	}

	public void setNomeBarragem(String nomeBarragem) {
		this.nomeBarragem = nomeBarragem;
	}

}
