package br.com.sca.barragem.rabbitmq.producer;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import br.com.sca.barragem.dto.BarragemAlertaDTO;

@Component
public class BarragemProducer {
	
	@Autowired
	private AmqpTemplate amqpTemplate;
	
	@Value("${mq.alert.exchange}")
	private String exchange;
		
	@Value("${mq.alert.routingkey.barragem}")
	private String routingkey;

	public void produce(BarragemAlertaDTO barragemAlert){
		amqpTemplate.convertAndSend(exchange, routingkey, barragemAlert);
	}
}