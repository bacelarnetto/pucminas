package br.com.sca.barragem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.barragem.dto.MoradorDTO;
import br.com.sca.barragem.dto.MoradorNewDTO;
import br.com.sca.barragem.model.Barragem;
import br.com.sca.barragem.model.Morador;
import br.com.sca.barragem.repository.MoradorRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;

@Service
public class MoradorService {

	@Autowired
	private MoradorRepository repo;

	public Morador find(Long id) {

		Optional<Morador> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Morador.class.getName()));
	}

	@Transactional
	public Morador insert(Morador pessoa) {
		pessoa.setId(null);
		pessoa = repo.save(pessoa);
		return pessoa;
	}

	public Morador update(Morador pessoa) {
		Morador newPessoa = find(pessoa.getId());
		updateData(newPessoa, pessoa);
		return repo.save(newPessoa);
	}

	public void delete(Long id) {
		find(id);
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma categoria que possui produtos");
		}
	}

	public List<Morador> findAll() {
		return repo.findAll();
	}
	
	public List<Morador> findListMoradorByIdBarragem(Long idBarragem ) {
		return repo.findListMoradorByIdBarragem(idBarragem);
	}

	private void updateData(Morador newPessoa, Morador pessoa) {
		newPessoa.setNome(pessoa.getNome());
		newPessoa.setEmail(pessoa.getEmail());
		newPessoa.setIdade(pessoa.getIdade());
		newPessoa.setTelefone(pessoa.getTelefone());
		newPessoa.setEndereco(pessoa.getEndereco());
		newPessoa.setNumero(pessoa.getNumero());    
		newPessoa.setBairro(pessoa.getBairro());
		newPessoa.setCidade(pessoa.getCidade());
		newPessoa.setUf(pessoa.getUf());
		newPessoa.setBarragem(pessoa.getBarragem());
		newPessoa.setCep(pessoa.getCep());
	}

	public Morador fromTO(MoradorNewDTO dto) {
		Barragem barragem = new Barragem();
		barragem.setId(dto.getIdBarragem());
		return new Morador(null, 
				dto.getNome(), 
				dto.getEmail(), 
				dto.getIdade(), 
				dto.getTelefone(),    
				dto.getEndereco(),    
				dto.getNumero(),    
				dto.getBairro(),
				dto.getCidade(), 
				dto.getUf(),
				dto.getCep(),
				barragem
				);
	}
	
	

	public Morador fromTO(MoradorDTO dto) {
		Barragem barragem = new Barragem();
		barragem.setId(dto.getIdBarragem());
		return new Morador(
				dto.getId(),
				dto.getNome(), 
				dto.getEmail(), 
				dto.getIdade(), 
				dto.getTelefone(),    
				dto.getEndereco(),    
				dto.getNumero(),    
				dto.getBairro(),
				dto.getCidade(), 
				dto.getUf(), 
				dto.getCep(),
				barragem);
	}
	
	public Page<Morador> findPage(String descricao, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return descricao == null || ("").equals(descricao.trim()) ? repo.findAll(pageRequest) : repo.findByNomeContainingIgnoreCase(descricao, pageRequest);
	}
	
	public long qntMorador() {		
		return repo.count();
	}

}
