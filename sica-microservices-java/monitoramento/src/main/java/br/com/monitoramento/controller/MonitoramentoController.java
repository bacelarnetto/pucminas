package br.com.monitoramento.controller;

import br.com.monitoramento.model.Monitoramento;
import br.com.monitoramento.service.MonitoramentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "/api/monitoramento" )
public class MonitoramentoController {

    @Autowired
    private MonitoramentoService service;

    @PostMapping(path = "/", consumes = "application/json")
    public String receberNotificacaoSensor ( @RequestBody Monitoramento monitoramento) {
        service.notificarCriticidadeBarragem(monitoramento);
        return "Ok";
    }

}
