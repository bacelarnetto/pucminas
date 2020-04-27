package br.com.sca.monitoramento.controller;

import java.net.URI;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.sca.monitoramento.dto.MonitoramentoDTO;
import br.com.sca.monitoramento.dto.ResumoMonitoramentoDTO;
import br.com.sca.monitoramento.model.Monitoramento;
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


	@ApiOperation(value = " Resumo monitoramento da barragem")
	@RequestMapping(value = "/resumo", method = RequestMethod.GET)
	public ResponseEntity<ResumoMonitoramentoDTO> findResumo(
			@RequestParam(value = "idBarragem") Long idBarragem,
			@RequestParam(value = "initDate", required = false) @DateTimeFormat(pattern="dd/MM/yyyy") Date initDate,
			@RequestParam(value = "endDate", required = false) @DateTimeFormat(pattern="dd/MM/yyyy") Date endDate) {		
		ResumoMonitoramentoDTO dto = service.findResumo(idBarragem, initDate, endDate);
		return ResponseEntity.ok().body(dto);
	}

	@ApiOperation(value = "Lista de Monitoramento paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Monitoramento>> findPage(
			@RequestParam(value = "idBarragem") Long idBarragem,
			@RequestParam(value = "initDate", required = false) @DateTimeFormat(pattern="dd/MM/yyyy") Date initDate,
			@RequestParam(value = "endDate", required = false) @DateTimeFormat(pattern="dd/MM/yyyy") Date endDate,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "descricao") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestHeader(value = "Authorization") String authorization) {
		Page<Monitoramento> list = service.findPage(idBarragem, initDate, endDate, page, linesPerPage, orderBy,
				direction);
		return ResponseEntity.ok().body(list);
	}

}
