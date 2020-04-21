package br.com.sca.barragem.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.sca.barragem.model.Monitoramento;
import br.com.sca.barragem.service.MonitoramentoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/monitoramento")
@Api(value = "Endpoints de Monitoramento")
public class MonitoramentoController {

	@Autowired
	private MonitoramentoService service;

	@ApiOperation(value = "Receber Notificacao do Sensor")
	@PostMapping(path = "/", consumes = "application/json")
	public ResponseEntity<Void> receberNotificacaoSensor(@RequestBody Monitoramento monitoramento) {
		service.processaMonitoramentoBarragem(monitoramento);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(monitoramento.getIdBarragem()).toUri();
		return ResponseEntity.created(uri).build();
	}

}
