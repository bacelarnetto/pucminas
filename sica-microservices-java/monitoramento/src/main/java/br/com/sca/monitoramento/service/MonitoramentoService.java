package br.com.sca.monitoramento.service;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.monitoramento.rabbitmq.producer.BarragemProducer;
import br.com.sca.monitoramento.rabbitmq.producer.MoradorProducer;
import br.com.sca.monitoramento.dto.BarragemAlertaDTO;
import br.com.sca.monitoramento.dto.EnvioAlertaDTO;
import br.com.sca.monitoramento.dto.MonitoramentoDTO;
import br.com.sca.monitoramento.dto.MoradorAlertaDTO;
import br.com.sca.monitoramento.enums.CategoriaRiscoEnum;
import br.com.sca.monitoramento.model.Barragem;
import br.com.sca.monitoramento.model.Monitoramento;
import br.com.sca.monitoramento.repository.MonitoramentoRepository;
import br.com.sca.monitoramento.repository.MoradorRepository;

@Service
public class MonitoramentoService {
	Logger logger = LoggerFactory.getLogger(MonitoramentoService.class);

	@Autowired
	private BarragemService barragemService;

	@Autowired
	private MoradorRepository moradorRepository;

	@Autowired
	private MonitoramentoRepository monitoramentoRepository;

	@Autowired
	private BarragemProducer barragemProducer;

	@Autowired
	private MoradorProducer moradorProducer;

	@Transactional
	public void processaMonitoramentoBarragem(MonitoramentoDTO monitoramento) {
		logger.info(
				"Cadastrando de monitoramento da barragem. Processo feito via " + " sensor. ID: " + monitoramento.getIdBarragem());
		monitoramentoRepository.save(new Monitoramento(null, 
				monitoramento.getIdBarragem(),
				monitoramento.getCodigoCriticidade(), 
				monitoramento.getTemperatura(), 
				monitoramento.getVolume(),
				monitoramento.getPressao(), 
				monitoramento.getMovimentacao(), 
				new Date()));
		logger.info(
				"Alterando Status da Barragem. Processo feito via " + " sensor. ID: " + monitoramento.getIdBarragem());
		barragemService.mudaStatusRisco(monitoramento.getIdBarragem(), monitoramento.getCodigoCriticidade());
		if (CategoriaRiscoEnum.ALTO.equals(CategoriaRiscoEnum.toEnum(monitoramento.getCodigoCriticidade()))) {
			notificarMorador(monitoramento.getIdBarragem().longValue());
		}
	}

	public String enviarAlertaManual(EnvioAlertaDTO dto) {
		logger.info("Alterando Status da Barragem para ALTO. Processo" + " feito via TELA. ID: " + dto.getIdBarragem());
		barragemService.mudaStatusRisco(dto.getIdBarragem(), CategoriaRiscoEnum.ALTO.getCodigo());
		notificarMorador(dto.getIdBarragem().longValue());
		return "OK";
	}

	private void notificarMorador(Long idBarragem) {
		Barragem barragem = barragemService.find(idBarragem);
		barragemProducer.produce(new BarragemAlertaDTO(barragem.getId(), barragem.getDescricao()));
		// intenção é fazer um batch
		List<MoradorAlertaDTO> moradores = moradorRepository.findListMoradorAlertaByIdBarragem(idBarragem);
		for (MoradorAlertaDTO morador : moradores) {
			moradorProducer.produce(morador);
		}

	}

}
