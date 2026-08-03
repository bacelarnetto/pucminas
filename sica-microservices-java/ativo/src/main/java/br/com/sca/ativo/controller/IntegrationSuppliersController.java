package br.com.sca.ativo.controller;

import java.util.Date;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.sca.ativo.dto.StatusPedidoDTO;
import br.com.sca.ativo.model.Pedido;
import br.com.sca.ativo.service.PedidoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "Endpoints de integração com fornecedores para realizar pedidos")
@RestController
@RequestMapping(value = "/integration-suppliers")
public class IntegrationSuppliersController {
	
	@Autowired
	private PedidoService pedidoService;
	
	
	@ApiOperation(value="Lista de Pedidos paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Pedido>> findPage(
			@RequestParam(value = "email_fornecedor") String email,
			@RequestParam(value = "data_inicio", required = false) @JsonFormat(pattern="dd/MM/yyyy") Date data_inicio,
			@RequestParam(value = "data_fim", required = false) @JsonFormat(pattern="dd/MM/yyyy") Date data_fim,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "instante") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestHeader(value = "Authorization") String authorization
		) {
		Page<Pedido> list = pedidoService.findPagePedidoFornecedor(email, data_inicio, data_fim, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}

	
	@ApiOperation(value="Lista todos os status de Pedidos")
	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public ResponseEntity<List<StatusPedidoDTO>> findAllStatus(@RequestHeader(value = "Authorization") String authorization) {
		List<StatusPedidoDTO> list = pedidoService.findStatusPedido();
		return ResponseEntity.ok().body(list);
	}
	
	
	@ApiOperation(value="Update Status do Pedido")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id, 
			@RequestParam(value = "codigo_status") Integer status,
			@RequestHeader(value = "Authorization") String authorization) {
		pedidoService.updateStatus(id, status);
		return ResponseEntity.noContent().build();
	}

}
