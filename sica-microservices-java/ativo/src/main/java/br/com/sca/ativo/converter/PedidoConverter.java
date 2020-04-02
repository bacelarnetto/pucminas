package br.com.sca.ativo.converter;

import java.util.ArrayList;
import java.util.List;

import br.com.sca.ativo.dto.ItemDTO;
import br.com.sca.ativo.dto.PedidoDTO;
import br.com.sca.ativo.model.Fornecedor;
import br.com.sca.ativo.model.Item;
import br.com.sca.ativo.model.Pedido;
import br.com.sca.ativo.model.TipoInsumo;

public class PedidoConverter {	

	public Pedido buildPedido(PedidoDTO dto) {
		Pedido model = new Pedido();
		model.setStatus(dto.getCodStatus());		
		model.setId(dto.getId());
		Fornecedor fornecedor = new Fornecedor();
		fornecedor.setId(dto.getIdFornecedor());
		model.setFornecedor(fornecedor);
		
		List<Item> itens = new ArrayList<>();
		for(ItemDTO itemDto : dto.getItens()) {
			Item item = new Item();
			item.setId(itemDto.getId());
			item.setDescricao(itemDto.getDescricao());
			item.setMarca(itemDto.getMarca());
			item.setQuantidade(itemDto.getQuantidade());
			
			TipoInsumo tipoInsumo = new TipoInsumo();
			tipoInsumo.setId(itemDto.getTipoInsumo());
			item.setTipoInsumo(tipoInsumo);
			itens.add(item);
		}
		
		model.setItens(itens);
		
		return model;
	}
	
	
	public PedidoDTO buildPedidoDTO(Pedido model) {
		PedidoDTO dto = new PedidoDTO();
		dto.setId(model.getId());
		dto.setIdFornecedor(model.getFornecedor().getId());
		dto.setNomeFornecedor(model.getFornecedor().getNome());
		dto.setCodStatus(model.getStatus());
		
		List<ItemDTO> itensDTO = new ArrayList<>();
		for(Item item : model.getItens()) {
			ItemDTO itemDTO = new ItemDTO();
			itemDTO.setId(item.getId());
			itemDTO.setDescricao(item.getDescricao());
			itemDTO.setMarca(item.getMarca());
			itemDTO.setQuantidade(item.getQuantidade());
			if(item.getTipoInsumo() !=null) {
				itemDTO.setTipoInsumo(item.getTipoInsumo().getId());
			}
			itensDTO.add(itemDTO);
		}
		dto.setItens(itensDTO);
		return dto;
	}
}
