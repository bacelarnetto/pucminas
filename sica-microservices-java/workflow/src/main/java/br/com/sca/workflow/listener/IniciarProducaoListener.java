package br.com.sca.workflow.listener;

import org.camunda.bpm.engine.RuntimeService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class IniciarProducaoListener {

    @Autowired
    private RuntimeService runtimeService;

    @RabbitListener(queues = "producao")
    public void recievedMessage(String message) {
        runtimeService.startProcessInstanceByKey("Gestao_Processo_Minerario");
    }
}
