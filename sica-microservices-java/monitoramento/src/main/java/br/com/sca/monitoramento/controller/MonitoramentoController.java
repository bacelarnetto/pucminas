package br.com.sca.monitoramento.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.sca.monitoramento.dto.MonitoramentoDTO;
import br.com.sca.monitoramento.service.MonitoramentoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "monitoramento")
@Api(value = "Endpoints de Monitoramento")
public class MonitoramentoController {

	@Autowired
	private MonitoramentoService service;

	@ApiOperation(value = "Receber as Notificacões dos Sensores")
	@PostMapping(path = "/", consumes = "application/json")
	public ResponseEntity<Void> receberNotificacaoSensor(@RequestBody MonitoramentoDTO monitoramento) {
		service.processaMonitoramentoBarragem(monitoramento);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(monitoramento.getIdBarragem()).toUri();
		return ResponseEntity.created(uri).build();
	}

}
