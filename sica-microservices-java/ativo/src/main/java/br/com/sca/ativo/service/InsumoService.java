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

import br.com.sca.ativo.dto.StatusInsumoDTO;
import br.com.sca.ativo.enums.StatusInsumoEnum;
import br.com.sca.ativo.model.Insumo;
import br.com.sca.ativo.repository.InsumoRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;


@Service
public class InsumoService {

	@Autowired
	private InsumoRepository repo;

	public Insumo find(Long id) {
		Optional<Insumo> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Insumo.class.getName()));
	}

	@Transactional
	public Insumo insert(Insumo insumo) {
		insumo.setId(null);
		insumo.setDataHoraCadastro(new Date());
		insumo = repo.save(insumo);
		return insumo;
	}

	public Insumo update(Insumo insumo) {
		Insumo newInsumo = find(insumo.getId());
		updateData(newInsumo, insumo);
		return repo.save(newInsumo);
	}

	public void delete(Long id) {
		find(id);
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um insumo");
		}
	}

	public List<Insumo> findAll() {
		return repo.findAll();
	}
	
	public List<StatusInsumoDTO> findStatusInsumo(){
		List<StatusInsumoDTO> newStatus = new ArrayList<>();
		for(StatusInsumoEnum s : StatusInsumoEnum.values()) {
			StatusInsumoDTO status = new StatusInsumoDTO();
			status.setId(s.getCodigo().longValue());
			status.setNome(s.getDescricao());
			newStatus.add(status);
		}		
		return newStatus;
	}
	

	private void updateData(Insumo newInsumo, Insumo insumo) {
		newInsumo.setDescricao(insumo.getDescricao());
		newInsumo.setDataCompra(insumo.getDataCompra());
		newInsumo.setMarca(insumo.getMarca());
		newInsumo.setStatus(insumo.getStatus().getCodigo());
		newInsumo.setTipo(insumo.getTipo());		
	}

	public Page<Insumo> findPage(String descricao, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<Insumo> listPage;
		if(descricao == null || ("").equals(descricao.trim())) {
			listPage = repo.findAll(pageRequest);
		}else {
			listPage = repo.findByDescricaoContainingIgnoreCase(descricao.toUpperCase(), pageRequest);
		}
		return listPage;
	}

	public long qntInsumo() {		
		return repo.count();
	}

}
