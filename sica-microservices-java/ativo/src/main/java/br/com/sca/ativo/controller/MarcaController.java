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

import br.com.sca.ativo.model.Marca;
import br.com.sca.ativo.service.MarcaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@Api(value = "Endpoints de marcas de Insumos")
@RestController
@RequestMapping(value = "/marca")
public class MarcaController {

	@Autowired
	private MarcaService marcaService;

	@ApiOperation(value="Find Marca")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Marca> find(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		Marca marca = marcaService.find(id);
		return ResponseEntity.ok().body(marca);
	}

	@ApiOperation(value="Insert Marca")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody Marca marca,
			@RequestHeader(value = "Authorization") String authorization) {
		marcaService.insert(marca);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(marca.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@ApiOperation(value="Update Marca")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id, @RequestBody Marca Marca,
			@RequestHeader(value = "Authorization") String authorization) {
		marcaService.update(Marca);
		return ResponseEntity.noContent().build();
	}
	
	
	@ApiOperation(value="Exclusao da Marca")
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id")  Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		marcaService.deleteLogic(id);
		return ResponseEntity.noContent().build();
	}

	
	@ApiOperation(value="Lista de Marca")
	@RequestMapping(value = "/list",method = RequestMethod.GET)
	public ResponseEntity<List<Marca>> findAll(@RequestHeader(value = "Authorization") String authorization) {
		List<Marca> list = marcaService.findAll();
		return ResponseEntity.ok().body(list);
	}

	
	@ApiOperation(value="Lista de Marca paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Marca>> findPage(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "nome") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Marca> list = marcaService.findPage(name, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}

}
