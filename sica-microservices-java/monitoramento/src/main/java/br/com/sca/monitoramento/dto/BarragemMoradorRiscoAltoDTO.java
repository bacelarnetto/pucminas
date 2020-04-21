package br.com.sca.monitoramento.dto;

import br.com.sca.commons.lib.model.AbstractEntity;
import br.com.sca.monitoramento.enums.DanoPotencialAssociadoEnum;

public class BarragemMoradorRiscoAltoDTO implements AbstractEntity {
	

	private static final long serialVersionUID = 1L;

	public Long idBarragem;

	public String nomeBarragem;

	public Long totalMorador;
	
	public DanoPotencialAssociadoEnum danoPotencialAssociado;
	


	public void setIdBarragem(Long idBarragem) {
		this.idBarragem = idBarragem;
	}

	public void setNomeBarragem(String nomeBarragem) {
		this.nomeBarragem = nomeBarragem;
	}

	public void setTotalMorador(Long totalMorador) {
		this.totalMorador = totalMorador;
	}

	public Long getIdBarragem() {
		return idBarragem;
	}

	public String getNomeBarragem() {
		return nomeBarragem;
	}

	public Long getTotalMorador() {
		return totalMorador;
	}

	@Override
	public Long getId() {		
		return getIdBarragem();
	}

	public DanoPotencialAssociadoEnum getDanoPotencialAssociado() {
		return danoPotencialAssociado;
	}

	public void setDanoPotencialAssociado(DanoPotencialAssociadoEnum danoPotencialAssociado) {
		this.danoPotencialAssociado = danoPotencialAssociado;
	}
	
	
	
}