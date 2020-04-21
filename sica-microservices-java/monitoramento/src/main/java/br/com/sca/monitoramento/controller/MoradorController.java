package br.com.sca.monitoramento.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.sca.monitoramento.dto.EnvioAlertaDTO;
import br.com.sca.monitoramento.dto.MoradorAlertaDTO;
import br.com.sca.monitoramento.dto.MoradorDTO;
import br.com.sca.monitoramento.dto.MoradorNewDTO;
import br.com.sca.monitoramento.model.Morador;
import br.com.sca.monitoramento.service.MonitoramentoService;
import br.com.sca.monitoramento.service.MoradorService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "morador")
@Api(value = "Endpoints de Moradores")
public class MoradorController {

	@Autowired
	private MoradorService moradorService;
	
	
	@Autowired
	private MonitoramentoService monitoramentoService;

	@ApiOperation(value="Cadastrar um Morador")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody MoradorNewDTO dto,
			@RequestHeader(value = "Authorization") String authorization) {
		Morador morador = moradorService.fromTO(dto);
		morador = moradorService.insert(morador);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(morador.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@ApiOperation(value="Atualizar um Morador por id")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id, 
			@RequestBody MoradorDTO dto,
			@RequestHeader(value = "Authorization") String authorization) {
		Morador morador = moradorService.fromTO(dto);
		morador.setId(id);		
		morador = moradorService.update(morador);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value="Excluir um Morador por id")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		moradorService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value="Buscar Morador por id")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Morador> find(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		Morador morador = moradorService.find(id);
		return ResponseEntity.ok().body(morador);
	}

	@ApiOperation(value="Buscar a lista com todos os Moradores")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<MoradorDTO>> findAll(@RequestHeader(value = "Authorization") String authorization) {
		List<Morador> list = moradorService.findAll();
		List<MoradorDTO> listDTO = list.stream().map(morador -> new MoradorDTO(morador)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}
	
	@ApiOperation(value="Busca Moradores pelo id da barragem")
	@RequestMapping(value = "/barragem/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<MoradorAlertaDTO>> getMoradoresByIdBarragem(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		List<MoradorAlertaDTO> list = moradorService.findListMoradorByIdBarragem(id);
		return ResponseEntity.ok().body(list);
	}	
	
	@ApiOperation(value="Lista de Morador paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Morador>> findPage(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "nome") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Morador> list = moradorService.findPage(name, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Quantidade de Moradores")
	@RequestMapping(value = "/qnt-morador", method = RequestMethod.GET)
	public ResponseEntity<Long> getQntMorador(@RequestHeader(value = "Authorization") String authorization) {
		long cnt = moradorService.qntMorador();
		return ResponseEntity.ok().body(cnt);
	}
	
	@ApiOperation(value="Envio de Alert de perigo de rompimento de Barragem")
	@RequestMapping(value = "/enviar-alerta", method = RequestMethod.POST)
	public ResponseEntity<String> enviarAlerta(@RequestBody EnvioAlertaDTO dto,
			@RequestHeader(value = "Authorization") String authorization) {
		//String msn  = segurancaIntegration.enviarAlerta(dto);	
		
		String msn = monitoramentoService.enviarAlertaManual(dto);
		
		return ResponseEntity.ok().body(msn);
	}


}
