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

import br.com.sca.ativo.dto.PedidoDTO;
import br.com.sca.ativo.dto.StatusPedidoDTO;
import br.com.sca.ativo.model.Pedido;
import br.com.sca.ativo.service.PedidoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@Api(value = "Endpoints de pedidos de Insumos")
@RestController
@RequestMapping(value = "/pedido")
public class PedidoController {

	@Autowired
	private PedidoService pedidoService;

	@ApiOperation(value="Find Pedido")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<PedidoDTO> find(@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		PedidoDTO dto = pedidoService.findPedido(id);
		return ResponseEntity.ok().body(dto);
	}

	@ApiOperation(value="Insert Pedido")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@Valid @RequestBody PedidoDTO dto,
			@RequestHeader(value = "Authorization") String authorization) {
		pedidoService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@ApiOperation(value="Update Pedido")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id,
			@RequestBody PedidoDTO dto,
			@RequestHeader(value = "Authorization") String authorization) {
		dto.setId(id);
		pedidoService.update(dto);
		return ResponseEntity.noContent().build();
	}
	
	
	@ApiOperation(value="Exclusao da Pedido")
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id")  Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		pedidoService.delete(id);
		return ResponseEntity.noContent().build();
	}

	
	@ApiOperation(value="Lista de Pedido")
	@RequestMapping(value = "/list",method = RequestMethod.GET)
	public ResponseEntity<List<Pedido>> findAll(@RequestHeader(value = "Authorization") String authorization) {
		List<Pedido> list = pedidoService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@ApiOperation(value="Lista de Pedidos paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Pedido>> findPage(
			@RequestParam(value = "id_fornecedor", required = false) Long  idFornecedor,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "instante") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Pedido> list = pedidoService.findPage(idFornecedor, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}

	
	@ApiOperation(value="Lista todos os status de Pedidos")
	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public ResponseEntity<List<StatusPedidoDTO>> findAllStatus(@RequestHeader(value = "Authorization") String authorization) {
		List<StatusPedidoDTO> list = pedidoService.findStatusPedido();
		return ResponseEntity.ok().body(list);
	}
	
	
	@ApiOperation(value="Quantidade de Pedido")
	@RequestMapping(value = "/qnt-pedido", method = RequestMethod.GET)
	public ResponseEntity<Long> getQntPedido(@RequestHeader(value = "Authorization") String authorization) {
		long cnt = pedidoService.qntPedido();
		return ResponseEntity.ok().body(cnt);
	}
	

}
