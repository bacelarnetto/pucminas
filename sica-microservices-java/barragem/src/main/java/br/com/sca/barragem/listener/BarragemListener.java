package br.com.sca.barragem.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.sca.barragem.service.BarragemService;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;

@Component
public class BarragemListener {

	Logger logger = LoggerFactory.getLogger(BarragemListener.class);

	@Autowired
	private BarragemService service;

	@RabbitListener(queues = "barragem")
	public void recievedMessage(String idBarragem) {
		try {
			logger.info("Alterando Status da Barragem. ID: " + idBarragem);
			service.mudaStatusRiscoAlto(idBarragem);
		} catch (ObjectNotFoundException e) {
			logger.warn(e.getMessage());
		}

	}

}
