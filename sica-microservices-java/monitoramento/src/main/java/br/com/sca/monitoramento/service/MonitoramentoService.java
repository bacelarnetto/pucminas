package br.com.sca.monitoramento.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.monitoramento.dto.BarragemAlertaDTO;
import br.com.sca.monitoramento.dto.EnvioAlertaDTO;
import br.com.sca.monitoramento.dto.MonitoramentoDTO;
import br.com.sca.monitoramento.dto.ResumoMonitoramentoDTO;
import br.com.sca.monitoramento.dto.MoradorAlertaDTO;
import br.com.sca.monitoramento.enums.CategoriaRiscoEnum;
import br.com.sca.monitoramento.model.Barragem;
import br.com.sca.monitoramento.model.Monitoramento;
import br.com.sca.monitoramento.rabbitmq.producer.BarragemProducer;
import br.com.sca.monitoramento.rabbitmq.producer.MoradorProducer;
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
		logger.info("Cadastrando de monitoramento da barragem. Processo feito via " + " sensor. ID: "
				+ monitoramento.getIdBarragem());
		monitoramentoRepository.save(new Monitoramento(null, monitoramento.getIdBarragem(),
				monitoramento.getCodigoCriticidade(), monitoramento.getTemperatura(), monitoramento.getVolume(),
				monitoramento.getPressao(), monitoramento.getMovimentacao(), new Date()));
		logger.info(
				"Alterando Status da Barragem. Processo feito via " + " sensor. ID: " + monitoramento.getIdBarragem());
		barragemService.mudaStatusRisco(monitoramento.getIdBarragem(), monitoramento.getCodigoCriticidade());
		if (CategoriaRiscoEnum.ALTO.equals(CategoriaRiscoEnum.toEnum(monitoramento.getCodigoCriticidade()))) {
			try {
				notificarMorador(monitoramento.getIdBarragem().longValue());
			} catch (InterruptedException e) {
				logger.warn("Erro no envio de mesagens:" + e.getMessage());
			}
		}
	}

	public String enviarAlertaManual(EnvioAlertaDTO dto) {
		logger.info("Alterando Status da Barragem para ALTO. Processo" + " feito via TELA. ID: " + dto.getIdBarragem());
		barragemService.mudaStatusRisco(dto.getIdBarragem(), CategoriaRiscoEnum.ALTO.getCodigo());
		try {
			notificarMorador(dto.getIdBarragem().longValue());
		} catch (InterruptedException e) {
			logger.warn("Erro no envio de mesagens:" + e.getMessage());
		}
		return "OK";
	}

	private void notificarMorador(Long idBarragem) throws InterruptedException {
		Barragem barragem = barragemService.find(idBarragem);
		barragemProducer.produce(new BarragemAlertaDTO(barragem.getId(), barragem.getDescricao()));
		List<MoradorAlertaDTO> moradores = moradorRepository.findListMoradorAlertaByIdBarragem(idBarragem);
		for (MoradorAlertaDTO morador : moradores) {
			moradorProducer.produce(morador);
			Thread.sleep(200);
		}
	}

	@Transactional
	public ResumoMonitoramentoDTO findResumo(Long idBarragem, Date initDate, Date endDate) {

		ResumoMonitoramentoDTO result = null;

		List<Monitoramento> list = monitoramentoRepository.findListByIdBarragemAndPeriodo(idBarragem,
				buildIntDate(initDate), buildEndDate(endDate));

		if (list != null && !list.isEmpty()) {
			result = new ResumoMonitoramentoDTO();
			
			Barragem barragem = barragemService.find(idBarragem);			
			result.setIdBarragem(idBarragem);
			result.setNomeBarragem(barragem.getDescricao());
			List<Date> datas = new ArrayList<>();
			List<String> temperaturas = new ArrayList<>();
			List<String> volumes = new ArrayList<>();
			List<String> pressoes = new ArrayList<>();
			List<String> movimentacoes = new ArrayList<>();

			for (Monitoramento m : list) {
				datas.add(m.getDataCadastro());
				temperaturas.add(m.getTemperatura());
				volumes.add(m.getVolume());
				pressoes.add(m.getPressao());
				movimentacoes.add(m.getMovimentacao());
			}
			result.setDatas(datas);
			result.setTemperaturas(temperaturas);
			result.setMovimentacoes(movimentacoes);
			result.setPressoes(pressoes);
			result.setVolumes(volumes);

		}
		return result;
	}

	public Page<Monitoramento> findPage(Long idBarragem, Date initDate, Date endDate, Integer page,
			Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return monitoramentoRepository.findListMonitoramento(idBarragem, buildIntDate(initDate), buildEndDate(endDate),
				pageRequest);
	}

	private Date buildIntDate(Date initDate) {
		if (initDate != null) {
			return initDate;
		}
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -1);
		return calendar.getTime();
	}

	private Date buildEndDate(Date endDate) {
		if (endDate != null) {
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(endDate);
			calendar.add(Calendar.DATE, 1);
			return calendar.getTime();
		}
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, 1);
		return calendar.getTime();
	}

}
