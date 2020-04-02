package br.com.sca.ativo.controller;

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

import br.com.sca.ativo.dto.StatusInsumoDTO;
import br.com.sca.ativo.model.Insumo;
import br.com.sca.ativo.model.TipoInsumo;
import br.com.sca.ativo.service.InsumoService;
import br.com.sca.ativo.service.TipoInsumoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@Api(value = "Endpoints to insumos")
@RestController
@RequestMapping(value = "/insumo")
public class InsumoController {

	@Autowired
	private InsumoService insumoService;
	
	@Autowired
	private TipoInsumoService tipoInsumoService;

	@ApiOperation(value="Find Insumo")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Insumo> find(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		Insumo dto = insumoService.find(id);
		return ResponseEntity.ok().body(dto);
	}

	@ApiOperation(value="Insert Insumo")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody Insumo insumo,
			@RequestHeader(value = "Authorization") String authorization) {
		insumoService.insert(insumo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(insumo.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@ApiOperation(value="Update Insumo")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id, 
			@RequestBody Insumo insumo,
			@RequestHeader(value = "Authorization") String authorization) {
		insumo.setId(id);
		insumoService.update(insumo);
		return ResponseEntity.noContent().build();
	}
	
	@ApiOperation(value="Update Insumo")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		insumoService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@ApiOperation(value="Lista de Insumo")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<List<Insumo>> findAll(@RequestHeader(value = "Authorization") String authorization) {
		List<Insumo> list = insumoService.findAll();
		return ResponseEntity.ok().body(list);
	}

	@ApiOperation(value="Lista de Insumo paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Insumo>> findPage(
			@RequestParam(value = "description", required = false) String description,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines-per-page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order-by", defaultValue = "descricao") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Insumo> list = insumoService.findPage(description, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Lista todos os tipos de Insumo")
	@RequestMapping(value = "/types", method = RequestMethod.GET)
	public ResponseEntity<List<TipoInsumo>> findAllTypes(@RequestHeader(value = "Authorization") String authorization) {
		List<TipoInsumo> list = tipoInsumoService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Lista todos os status de Insumo")
	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public ResponseEntity<List<StatusInsumoDTO>> findAllStatus(@RequestHeader(value = "Authorization") String authorization) {
		List<StatusInsumoDTO> list = insumoService.findStatusInsumo();
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Quantidade de Insumo")
	@RequestMapping(value = "/qnt-insumo", method = RequestMethod.GET)
	public ResponseEntity<Long> getQntInsumo(@RequestHeader(value = "Authorization") String authorization) {
		long cnt = insumoService.qntInsumo();
		return ResponseEntity.ok().body(cnt);
	}

}
