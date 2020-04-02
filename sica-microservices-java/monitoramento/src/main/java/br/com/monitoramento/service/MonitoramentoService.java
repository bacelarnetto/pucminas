package br.com.monitoramento.service;

import br.com.monitoramento.model.Monitoramento;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MonitoramentoService {

    @Autowired
    private AmqpTemplate amqpTemplate;

    public void notificarCriticidadeBarragem(Monitoramento monitoramento) {
       amqpTemplate.convertAndSend("monitora_barragem","",monitoramento.toString());
    }

}
