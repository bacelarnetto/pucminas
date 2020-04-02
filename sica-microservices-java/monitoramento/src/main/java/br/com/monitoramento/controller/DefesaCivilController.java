package br.com.monitoramento.controller;

import br.com.monitoramento.model.Monitoramento;
import br.com.monitoramento.service.MonitoramentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( "/api/defesaCivil" )
public class DefesaCivilController {

    @PostMapping(path = "/", consumes = "application/json")
    public void notificarDefesaCivil () {

    }

}
