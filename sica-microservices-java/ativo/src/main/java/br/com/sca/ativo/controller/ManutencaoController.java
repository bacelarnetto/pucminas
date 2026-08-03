package br.com.sca.ativo.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

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

import br.com.sca.ativo.model.Manutencao;
import br.com.sca.ativo.model.TipoManutencao;
import br.com.sca.ativo.service.ManutencaoService;
import br.com.sca.ativo.service.TipoManutencaoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "Endpoints de manutencao de Insumos")
@RestController
@RequestMapping(value = "/manutencao")
public class ManutencaoController {

	@Autowired
	private ManutencaoService manutencaoService;

	@Autowired
	private  TipoManutencaoService tipoManutencaoService;
	
	@ApiOperation(value="Find Manutencao")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Manutencao> find(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		Manutencao dto = manutencaoService.find(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@ApiOperation(value="Find Manutencao by id insumo")
	@RequestMapping(value = "/insumo/{id}", method = RequestMethod.GET)
	public ResponseEntity<Manutencao> getManutencaoByIdInsumo(@PathVariable Long idInsumo,
			@RequestHeader(value = "Authorization") String authorization) {
		Manutencao dto = manutencaoService.getManutencaoByIdInsumo(idInsumo);
		return ResponseEntity.ok().body(dto);
	}

	@ApiOperation(value="Insert Manutencao")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody Manutencao manutencao,
			@RequestHeader(value = "Authorization") String authorization) {
		manutencaoService.insert(manutencao);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(manutencao.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@ApiOperation(value="Update Manutencao")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id, 
			@RequestBody Manutencao Manutencao,
			@RequestHeader(value = "Authorization") String authorization) {
		manutencaoService.update(Manutencao);
		return ResponseEntity.noContent().build();
	}
	
	
	@ApiOperation(value="Finalizar Manutencao")
	@RequestMapping(value = "/finalizar/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> finalizar(@Valid @PathVariable Long id, 
			@RequestBody Manutencao Manutencao,
			@RequestHeader(value = "Authorization") String authorization) {
		manutencaoService.finalizar(Manutencao);
		return ResponseEntity.noContent().build();
	}
	
	
	@ApiOperation(value="Exclusao da Manutencao")
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id")  Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		manutencaoService.delete(id);
		return ResponseEntity.noContent().build();
	}

	
	@ApiOperation(value="Lista de Manutencao paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Manutencao>> findPage(
			@RequestParam(value = "solicitante", required = false) String solicitante,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "instante") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Manutencao> list = manutencaoService.findPage(solicitante, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}
	
	
	@ApiOperation(value="Lista todos os tipos de Manutencao")
	@RequestMapping(value = "/types", method = RequestMethod.GET)
	public ResponseEntity<List<TipoManutencao>> findAllTypes(@RequestHeader(value = "Authorization") String authorization) {
		List<TipoManutencao> list = tipoManutencaoService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Quantidade de Manutenção")
	@RequestMapping(value = "/qnt-manutencao", method = RequestMethod.GET)
	public ResponseEntity<Long> getQntManutencao(@RequestHeader(value = "Authorization") String authorization) {
		long cnt = manutencaoService.qntMutencao();
		return ResponseEntity.ok().body(cnt);
	}

}
