package br.com.sca.monitoramento.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.sca.monitoramento.dto.MoradorNewDTO;
import br.com.sca.monitoramento.model.Barragem;
import br.com.sca.monitoramento.model.Morador;
import br.com.sca.monitoramento.service.BarragemService;
import br.com.sca.monitoramento.service.MoradorService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "public")
@Api(value = "Endpoints publicos para ser acessados sem autenticação. cadastro de moradores.")
public class PublicController {
	
	@Autowired
	private MoradorService moradorService;
	
	@Autowired
	private BarragemService barragemService;

	@ApiOperation(value="Cadastrar um Morador")
	@RequestMapping(value = "/morador", method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody MoradorNewDTO dto) {
		Morador morador = moradorService.fromTO(dto);
		morador = moradorService.insert(morador, dto.getSenha());
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(morador.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	
	@ApiOperation(value="Buscar a lista com todas as Barragens")
	@RequestMapping(value = "/barragem", method = RequestMethod.GET)
	public ResponseEntity<List<Barragem>> findAll() {
		List<Barragem> list = barragemService.findAll();		
		return ResponseEntity.ok().body(list);
	}

	

    @ApiOperation(value="Find Barragem by morador")
    @RequestMapping(value = "/barragem-por-morador", method = RequestMethod.GET)
	public ResponseEntity<Barragem> find(
			@RequestParam(value = "email", required = false) String email) {
		Barragem dto = barragemService.findBarragemByEmailMorador(email);
		return ResponseEntity.ok().body(dto);
	}
}
