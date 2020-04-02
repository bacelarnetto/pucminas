package br.com.sca.ativo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.ativo.enums.StatusMarcaEnum;
import br.com.sca.ativo.model.Marca;
import br.com.sca.ativo.repository.MarcaRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;


@Service
public class MarcaService {

	@Autowired
	private MarcaRepository repo;

	public Marca find(Long id) {
		Optional<Marca> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Marca.class.getName()));
	}

	@Transactional
	public Marca insert(Marca marca) {
		marca.setId(null);
		marca.setStatus(StatusMarcaEnum.ATIVO.getCodigo());
		marca = repo.save(marca);
		return marca;
	}

	public Marca update(Marca marca) {
		Marca newMarca = find(marca.getId());
		updateData(newMarca, marca);
		return repo.save(newMarca);
	}

	public void delete(Long id) {
		find(id);
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um Marca");
		}
	}
	
	
	public void deleteLogic(Long id) {
		Marca newMarca = find(id);
		newMarca.setStatus(StatusMarcaEnum.CANCELADO.getCodigo());
		repo.save(newMarca);
	}
	

	public List<Marca> findAll() {
		return repo.findListAll();
	}

	private void updateData(Marca newMarca, Marca marca) {
		newMarca.setNome(marca.getNome());	
	}

	public Page<Marca> findPage(String nome, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return nome == null || ("").equals(nome.trim()) ? repo.findListMarca(pageRequest) : repo.findListMarcaByNome(nome, pageRequest);
	}

}
