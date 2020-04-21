package br.com.sca.monitoramento.controller;
import java.net.URI;
import java.util.List;

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

import br.com.sca.monitoramento.dto.BarragemMoradorDTO;
import br.com.sca.monitoramento.dto.BarragemMoradorRiscoAltoDTO;
import br.com.sca.monitoramento.dto.CategoriaRiscoDTO;
import br.com.sca.monitoramento.dto.DanoPotencialAssociadoDTO;
import br.com.sca.monitoramento.dto.ObjetivoContencaoDTO;
import br.com.sca.monitoramento.dto.SituacaoOperacionalDTO;
import br.com.sca.monitoramento.model.Barragem;
import br.com.sca.monitoramento.model.TipoBarragem;
import br.com.sca.monitoramento.service.BarragemService;
import br.com.sca.monitoramento.service.TipoBarragemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * @author Jose Bacelar
 */
@RestController
@RequestMapping(value = "barragem")
@Api(value = "Endpoints de Barragens")
public class BarragemController {
	
	@Autowired
    private  BarragemService barragemService;
    
	@Autowired
    private  TipoBarragemService tipoBarragemService;
    
    @ApiOperation(value="Find Barragem")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Barragem> find(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		Barragem dto = barragemService.find(id);
		return ResponseEntity.ok().body(dto);
	}

	@ApiOperation(value="Insert Barragem")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody Barragem barragem,
			@RequestHeader(value = "Authorization") String authorization) {
		barragemService.insert(barragem);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(barragem.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@ApiOperation(value="Update Barragem")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id, 
			@RequestBody Barragem Barragem,
			@RequestHeader(value = "Authorization") String authorization) {
		barragemService.update(Barragem);
		return ResponseEntity.noContent().build();
	}
	
	
	@ApiOperation(value="Exclusao da Barragem")
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id")  Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		barragemService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value="Buscar a lista com todas as Barragens")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Barragem>> findAll(@RequestHeader(value = "Authorization") String authorization) {
		List<Barragem> list = barragemService.findAll();		
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
	
	@ApiOperation(value="Lista todos os tipos de Barragem")
	@RequestMapping(value = "/types", method = RequestMethod.GET)
	public ResponseEntity<List<TipoBarragem>> findAllTypes(@RequestHeader(value = "Authorization") String authorization) {
		List<TipoBarragem> list = tipoBarragemService.findAll();
		return ResponseEntity.ok().body(list);
	}
		
	
	@ApiOperation(value="Lista todos as Categorias de Risco")
	@RequestMapping(value = "/lista-categorias-risco", method = RequestMethod.GET)
	public ResponseEntity<List<CategoriaRiscoDTO>> getAllCategoriaRisco(@RequestHeader(value = "Authorization") String authorization) {
		List<CategoriaRiscoDTO> list = barragemService.getAllCategoriaRisco();
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Lista todos os Danos pontenciais associados")
	@RequestMapping(value = "/lista-danos-potenciais", method = RequestMethod.GET)
	public ResponseEntity<List<DanoPotencialAssociadoDTO>> getAllDanoPotencialAssociado(@RequestHeader(value = "Authorization") String authorization) {
		List<DanoPotencialAssociadoDTO> list = barragemService.getAllDanoPotencialAssociado();
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Lista todos os objetivos de contencao")
	@RequestMapping(value = "/lista-objetivos-contencao", method = RequestMethod.GET)
	public ResponseEntity<List<ObjetivoContencaoDTO>> getAllObjetivoContencao(@RequestHeader(value = "Authorization") String authorization) {
		List<ObjetivoContencaoDTO> list = barragemService.getAllObjetivoContencao();
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Lista todas as situacoes operacionais")
	@RequestMapping(value = "/lista-situacoes-operacionais", method = RequestMethod.GET)
	public ResponseEntity<List<SituacaoOperacionalDTO>> getAllSituacaoOperacional(@RequestHeader(value = "Authorization") String authorization) {
		List<SituacaoOperacionalDTO> list = barragemService.getAllSituacaoOperacional();
		return ResponseEntity.ok().body(list);
	}
	
	
	@ApiOperation(value="Quantidade de Barragens")
	@RequestMapping(value = "/qnt-barragem", method = RequestMethod.GET)
	public ResponseEntity<Long> getQntBarragem(@RequestHeader(value = "Authorization") String authorization) {
		long cnt = barragemService.qntBarragem();
		return ResponseEntity.ok().body(cnt);
	}
	
	@ApiOperation(value="Quantidade de Barragens em alerta par rompimento")
	@RequestMapping(value = "/qnt-barragem-alert", method = RequestMethod.GET)
	public ResponseEntity<Long> getQntTotalBarragemAlerta(@RequestHeader(value = "Authorization") String authorization) {
		long cnt = barragemService.qntTotalBarragemAlerta();
		return ResponseEntity.ok().body(cnt);
	}
	
	@ApiOperation(value="Buscar a lista com as Barragens com mais moradores na sua proximidades")
	@RequestMapping(value = "/list-barragem-morador", method = RequestMethod.GET)
	public ResponseEntity<List<BarragemMoradorDTO>> findResumoBarragemList(@RequestHeader(value = "Authorization") String authorization) {
		List<BarragemMoradorDTO> list = barragemService.findResumoBarragemList();		
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Buscar a lista com as Barragens com mais moradores e com Risco Alto")
	@RequestMapping(value = "/list-barragem-morador-risco-alto", method = RequestMethod.GET)
	public ResponseEntity<List<BarragemMoradorRiscoAltoDTO>> findResumoBarragemRiscoAltoList(@RequestHeader(value = "Authorization") String authorization) {
		List<BarragemMoradorRiscoAltoDTO> list = barragemService.findResumoBarragemRiscoAltoList();		
		return ResponseEntity.ok().body(list);
	}
	
}