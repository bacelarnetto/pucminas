package br.com.sca.ativo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.ativo.converter.PedidoConverter;
import br.com.sca.ativo.dto.PedidoDTO;
import br.com.sca.ativo.dto.StatusPedidoDTO;
import br.com.sca.ativo.enums.StatusPedidoEnum;
import br.com.sca.ativo.model.HistoricoPedido;
import br.com.sca.ativo.model.Item;
import br.com.sca.ativo.model.Pedido;
import br.com.sca.ativo.repository.HistoricoPedidoRepository;
import br.com.sca.ativo.repository.ItemRepository;
import br.com.sca.ativo.repository.PedidoRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;


@Service
public class PedidoService {

	@Autowired
	private PedidoRepository repo;
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private HistoricoPedidoRepository historicoPedidoRepository;
	
	
	public PedidoDTO findPedido(Long id) {
		PedidoConverter build = new PedidoConverter();
		return build.buildPedidoDTO(find(id));
	}

	public Pedido find(Long id) {
		Optional<Pedido> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Pedido.class.getName()));
	}
	
	public PedidoDTO insert(PedidoDTO dto) {
		PedidoConverter build = new PedidoConverter();		
		return build.buildPedidoDTO(insert(build.buildPedido(dto)));
	}
	
	public PedidoDTO update(PedidoDTO dto) {
		PedidoConverter build = new PedidoConverter();		
		return build.buildPedidoDTO(update(build.buildPedido(dto)));
	}
	
	
	@Transactional
	private Pedido insert(Pedido pedido) {
		pedido.setId(null);
		pedido.setInstante(new Date());
		pedido.setStatus(StatusPedidoEnum.ENVIADO.getCodigo());
		pedido = repo.save(pedido);
		insertItens(pedido.getId(), pedido.getItens(), StatusPedidoEnum.ENVIADO);			
		return pedido;
	}

	@Transactional
	public Pedido update(Pedido pedido) {	
		itemRepository.deleteByPedido(pedido.getId());
		Pedido newPedido = find(pedido.getId());
		updateData(newPedido, pedido);		
		insertItens(pedido.getId(), pedido.getItens(), StatusPedidoEnum.toEnum(pedido.getStatus()));		
		return repo.save(newPedido);
	}
	
	
	private void insertItens(Long idPedido, List<Item> itens, StatusPedidoEnum status ) {
		List<Item> newItens = new ArrayList<>();
		for(Item it : itens) {
			Pedido pe = new Pedido();
			pe.setId(idPedido);
			Item item = new Item(null, it.getDescricao(), it.getQuantidade(), it.getMarca(), it.getTipoInsumo(), pe);
			newItens.add(item);	
			historicoPedidoRepository.save(
					new HistoricoPedido(null, 
							idPedido,
							new Date(),
							status.getCodigo(), 
							it.getDescricao(), 
							it.getQuantidade(),
							it.getMarca()));
		}
		itemRepository.saveAll(newItens);	
	}

	@Transactional
	public void delete(Long id) {
		find(id);
		try {
			itemRepository.deleteByPedido(id);
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um Pedido");
		}
	}

	public List<Pedido> findAll() {
		return repo.findAll();
	}

	private void updateData(Pedido newPedido, Pedido pedido) {
		newPedido.setStatus(pedido.getStatus());
		List<Item> items = new ArrayList<>();
		newPedido.setItens(items );
	}
	
	
	public List<StatusPedidoDTO> findStatusPedido(){
		List<StatusPedidoDTO> newStatus = new ArrayList<>();
		for(StatusPedidoEnum s : StatusPedidoEnum.values()) {
			StatusPedidoDTO status = new StatusPedidoDTO();
			status.setId(s.getCodigo().longValue());
			status.setDescricao(s.getDescricao());
			newStatus.add(status);
		}		
		return newStatus;
	}
	
	public Page<Pedido> findPage(Long idFornecedor, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findListPedidosByFornecedor(idFornecedor, pageRequest);
	}

	
	@Transactional
	public Pedido updateStatus(Long idPedido, Integer status) {	
		Pedido pedido = find(idPedido);
		pedido.setStatus(status);		
		return repo.save(pedido);
	}
	
	public Page<Pedido> findPagePedidoFornecedor(String email, Date dataInicio, Date dataFim, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<Pedido> listPage;
		if(dataInicio != null && dataFim != null ) {
			listPage = repo.findListPedidosFornecedor(email, dataInicio, dataFim, pageRequest);
		}else {
			listPage = repo.findListPedidosFornecedorEmail(email.trim(), pageRequest);
		}	
		
		return listPage;
	}

	public long qntPedido() {
		return repo.count();
	}

}
