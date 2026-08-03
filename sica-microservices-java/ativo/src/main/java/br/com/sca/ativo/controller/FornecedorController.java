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

import br.com.sca.ativo.model.Fornecedor;
import br.com.sca.ativo.service.FornecedorService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@Api(value = "Endpoints de fornecedors de Insumos")
@RestController
@RequestMapping(value = "/fornecedor")
public class FornecedorController {

	@Autowired
	private FornecedorService fornecedorService;

	@ApiOperation(value="Find Fornecedor")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Fornecedor> find(
			@PathVariable Long id, 
			@RequestHeader(value = "Authorization") String authorization) {
		Fornecedor dto = fornecedorService.find(id);
		return ResponseEntity.ok().body(dto);
	}

	@ApiOperation(value="Insert Fornecedor")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody Fornecedor fornecedor, @RequestHeader(value = "Authorization") String authorization) {
		fornecedorService.insert(fornecedor);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(fornecedor.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@ApiOperation(value="Update Fornecedor")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id,
			@RequestBody Fornecedor Fornecedor, 
			@RequestHeader(value = "Authorization") String authorization) {
		fornecedorService.update(Fornecedor);
		return ResponseEntity.noContent().build();
	}
	
	
	@ApiOperation(value="Exclusao da Fornecedor")
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id")  Long id, 
			@RequestHeader(value = "Authorization") String authorization) {
		fornecedorService.deleteLogic(id);
		return ResponseEntity.noContent().build();
	}

	
	@ApiOperation(value="Lista de Fornecedor")
	@RequestMapping(value = "/list",method = RequestMethod.GET)
	public ResponseEntity<List<Fornecedor>> findAll(@RequestHeader(value = "Authorization") String authorization) {
		List<Fornecedor> list = fornecedorService.findAll();
		return ResponseEntity.ok().body(list);
	}

	
	@ApiOperation(value="Lista de Fornecedor paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Fornecedor>> findPage(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "nome") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction, 
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Fornecedor> list = fornecedorService.findPage(name, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}

}
