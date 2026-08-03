package br.com.sca.monitoramento.config;


import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {
	
	@Value("${mq.alert.queue.barragem}")
	private String barragemQueueName;

	@Value("${mq.alert.queue.morador}")
	private String moradorQueueName;

    @Bean
    public Queue barragemQueue() {
        return new Queue(barragemQueueName, true);
    }

    @Bean
    public Queue moradorQueue() {
        return new Queue(moradorQueueName, true);
    }

    @Bean
    public MessageConverter jsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }
}
