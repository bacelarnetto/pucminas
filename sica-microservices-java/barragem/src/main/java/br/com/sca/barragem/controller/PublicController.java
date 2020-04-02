package br.com.sca.barragem.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.sca.barragem.dto.MoradorNewDTO;
import br.com.sca.barragem.model.Barragem;
import br.com.sca.barragem.model.Morador;
import br.com.sca.barragem.service.BarragemService;
import br.com.sca.barragem.service.MoradorService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "public")
public class PublicController {
	
	@Autowired
	private MoradorService moradorService;
	
	@Autowired
	private BarragemService barragemService;

	@ApiOperation(value="Cadastrar um Morador")
	@RequestMapping(value = "/morador", method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody MoradorNewDTO dto) {
		Morador morador = moradorService.fromTO(dto);
		morador = moradorService.insert(morador);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(morador.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	
	@ApiOperation(value="Buscar a lista com todas as Barragens")
	@RequestMapping(value = "/barragem", method = RequestMethod.GET)
	public ResponseEntity<List<Barragem>> findAll() {
		List<Barragem> list = barragemService.findAll();		
		return ResponseEntity.ok().body(list);
	}

}
