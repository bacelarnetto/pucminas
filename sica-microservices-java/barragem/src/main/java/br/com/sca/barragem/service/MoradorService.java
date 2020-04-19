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

import br.com.sca.barragem.dto.MoradorAlertaDTO;
import br.com.sca.barragem.dto.MoradorDTO;
import br.com.sca.barragem.dto.MoradorNewDTO;
import br.com.sca.barragem.dto.UserDTO;
import br.com.sca.barragem.integration.AuthIntegration;
import br.com.sca.barragem.model.Barragem;
import br.com.sca.barragem.model.Morador;
import br.com.sca.barragem.repository.MoradorRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;

@Service
public class MoradorService {

	@Autowired
	private MoradorRepository repo;
	
	@Autowired
	private AuthIntegration authIntegration;

	public Morador find(Long id) {

		Optional<Morador> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Morador.class.getName()));
	}

	@Transactional
	public Morador insert(Morador morador, String senha) {
		morador.setId(null);
		UserDTO user = new UserDTO(morador.getEmail(), senha, 5 , morador.getEmail());
		authIntegration.insertUser(user);
		morador = repo.save(morador);
		return morador;
	}
	
	
	@Transactional
	public Morador insert(Morador morador) {
		morador.setId(null);
		morador = repo.save(morador);
		return morador;
	}

	
	public Morador update(Morador morador) {
		Morador newMorador = find(morador.getId());
		updateData(newMorador, morador);
		return repo.save(newMorador);
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
	
	public List<MoradorAlertaDTO> findListMoradorByIdBarragem(Long idBarragem ) {
		return repo.findListMoradorAlertaByIdBarragem(idBarragem);
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
	
	
	private void updateData(Morador newMorador, Morador morador) {
		newMorador.setNome(morador.getNome());
		newMorador.setEmail(morador.getEmail());
		newMorador.setIdade(morador.getIdade());
		newMorador.setTelefone(morador.getTelefone());
		newMorador.setEndereco(morador.getEndereco());
		newMorador.setNumero(morador.getNumero());    
		newMorador.setBairro(morador.getBairro());
		newMorador.setCidade(morador.getCidade());
		newMorador.setUf(morador.getUf());
		newMorador.setBarragem(morador.getBarragem());
		newMorador.setCep(morador.getCep());
	}

}
