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

import br.com.sca.ativo.enums.StatusFornecedorEnum;
import br.com.sca.ativo.model.Fornecedor;
import br.com.sca.ativo.repository.FornecedorRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;


@Service
public class FornecedorService {

	@Autowired
	private FornecedorRepository repo;

	public Fornecedor find(Long id) {
		Optional<Fornecedor> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Fornecedor.class.getName()));
	}

	@Transactional
	public Fornecedor insert(Fornecedor fornecedor) {
		fornecedor.setId(null);
		fornecedor.setStatus(StatusFornecedorEnum.ATIVO.getCodigo());
		fornecedor = repo.save(fornecedor);
		return fornecedor;
	}

	public Fornecedor update(Fornecedor fornecedor) {
		Fornecedor newFornecedor = find(fornecedor.getId());
		updateData(newFornecedor, fornecedor);
		return repo.save(newFornecedor);
	}

	public void delete(Long id) {
		find(id);
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um Fornecedor");
		}
	}
	
	
	public void deleteLogic(Long id) {
		Fornecedor newFornecedor = find(id);
		newFornecedor.setStatus(StatusFornecedorEnum.CANCELADO.getCodigo());
		repo.save(newFornecedor);
	}
	

	public List<Fornecedor> findAll() {
		return repo.findListAll();
	}

	private void updateData(Fornecedor newFornecedor, Fornecedor Fornecedor) {
		newFornecedor.setNome(Fornecedor.getNome());
		newFornecedor.setEndereco(Fornecedor.getEndereco());
		newFornecedor.setBairro(Fornecedor.getBairro());
		newFornecedor.setNumero(Fornecedor.getNumero());
		newFornecedor.setCidade(Fornecedor.getCidade());
		newFornecedor.setUf(Fornecedor.getUf());
		newFornecedor.setEmail(Fornecedor.getEmail());
		newFornecedor.setTelefone(Fornecedor.getTelefone());		
	}

	public Page<Fornecedor> findPage(String nome, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return nome == null || ("").equals(nome.trim()) ? repo.findListFornecedor(pageRequest) : repo.findListFornecedorByNome(nome, pageRequest);
	}

}
