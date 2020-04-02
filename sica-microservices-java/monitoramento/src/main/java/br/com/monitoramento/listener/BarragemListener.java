package br.com.monitoramento.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class BarragemListener {

    @RabbitListener(queues = "barragem" )
    public void recievedMessage(String idBarragem) {
        System.out.println("Id Barragem Recebida: " + idBarragem);
    }

}
