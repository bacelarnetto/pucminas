package br.com.sca.barragem.rabbitmq.producer;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import br.com.sca.barragem.dto.MoradorAlertaDTO;


@Component
public class MoradorProducer {
	
	@Autowired
	private AmqpTemplate amqpTemplate;
	
	@Value("${mq.alert.exchange}")
	private String exchange;
		
	@Value("${mq.alert.routingkey.morador}")
	private String routingkey;

	public void produce(MoradorAlertaDTO moradorAlertDTO){
		amqpTemplate.convertAndSend(exchange, routingkey, moradorAlertDTO);
	}
}