package br.com.sca.monitoramento.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.sca.monitoramento.dto.BarragemMoradorDTO;
import br.com.sca.monitoramento.dto.BarragemMoradorRiscoAltoDTO;
import br.com.sca.monitoramento.model.Barragem;
import br.com.sca.monitoramento.service.BarragemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value =  "defesacivil" )
@Api(value = "Endpoints para uso da Defesa Civil")
public class DefesaCivilController {

	@Autowired
    private  BarragemService barragemService;
	
	@ApiOperation(value="Buscar a lista com as Barragens com mais moradores na sua proximidades. Limite de 50 registros")
	@RequestMapping(value = "/list-barragem-morador", method = RequestMethod.GET)
	public ResponseEntity<List<BarragemMoradorDTO>> findResumoBarragemList(@RequestHeader(value = "Authorization") String authorization) {
		List<BarragemMoradorDTO> list = barragemService.findResumoBarragemList();		
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Buscar a lista com as Barragens com mais moradores e com Risco Alto. Limite de 50 registros")
	@RequestMapping(value = "/list-barragem-morador-risco-alto", method = RequestMethod.GET)
	public ResponseEntity<List<BarragemMoradorRiscoAltoDTO>> findResumoBarragemRiscoAltoList(@RequestHeader(value = "Authorization") String authorization) {
		List<BarragemMoradorRiscoAltoDTO> list = barragemService.findResumoBarragemRiscoAltoList();		
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Lista de Barragem paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Barragem>> findPage(
			@RequestParam(value = "description", required = false) String description,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "descricao") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Barragem> list = barragemService.findPage(description, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}
    
}
