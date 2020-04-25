package br.com.sca.monitoramento.dto;

import java.io.Serializable;

import br.com.sca.monitoramento.validation.MoradorUpdateValidation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@MoradorUpdateValidation
public class MonitoramentoDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long idBarragem;

	private Integer codigoCriticidade;

	private String temperatura;

	private String volume;

	private String pressao;

	private String movimentacao;		

	

}
