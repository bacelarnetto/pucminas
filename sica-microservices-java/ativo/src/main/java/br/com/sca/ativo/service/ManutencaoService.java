package br.com.sca.ativo.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.ativo.enums.StatusInsumoEnum;
import br.com.sca.ativo.model.HistoricoManutencao;
import br.com.sca.ativo.model.Manutencao;
import br.com.sca.ativo.repository.HistoricoManutencaoRepository;
import br.com.sca.ativo.repository.InsumoRepository;
import br.com.sca.ativo.repository.ManutencaoRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;


@Service
public class ManutencaoService {

	@Autowired
	private ManutencaoRepository repo;
	
	@Autowired
	private InsumoRepository insumoRepository;
	
	@Autowired
	private HistoricoManutencaoRepository historicoManutencaoRepository;
	

	public Manutencao find(Long id) {
		Optional<Manutencao> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Manutencao.class.getName()));
	}
	
	public Manutencao getManutencaoByIdInsumo(Long idInsumo) {
		Optional<Manutencao> obj = repo.findManutencaoByIdInsumo(idInsumo);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id Insumo: " + idInsumo + ", Tipo: " + Manutencao.class.getName()));
	}

	@Transactional
	public Manutencao insert(Manutencao manutencao) {
		
		Optional<Manutencao> existeManutencao =  repo.findManutencaoByIdInsumo(manutencao.getInsumo().getId());
		if(existeManutencao != null && !existeManutencao.isEmpty()) {
			throw new DataIntegrityException("Já existe agendamento de manutenção para esse insumo");
		}
		
		manutencao.setId(null);
		manutencao.setInstante(new Date());
		manutencao = repo.save(manutencao);		
		insumoRepository.updateInsumo(StatusInsumoEnum.MANUTENCAO.getCodigo(), manutencao.getInsumo().getId());	
		historicoManutencaoRepository.save(new HistoricoManutencao(
				null, 
				manutencao.getId(), 
				manutencao.getInsumo().getId(), 
				manutencao.getSolicitante(), 
				manutencao.getDescricao(), 
				manutencao.getInstante(), 
				manutencao.getInstante(), 
				manutencao.getDataInicio(), 
				manutencao.getDataFim(), 
				manutencao.getTipo() != null ? manutencao.getTipo().getId() : null, 
				manutencao.getResponsavel(), 
				manutencao.getParecerResponsavel()));
		return manutencao;
	}

	@Transactional
	public Manutencao update(Manutencao manutencao) {
		Manutencao newManutencao = find(manutencao.getId());
		updateData(newManutencao, manutencao);
		insumoRepository.updateInsumo(manutencao.getInsumo().getStatus().getCodigo(), manutencao.getInsumo().getId());	
		historicoManutencaoRepository.save(new HistoricoManutencao(
				null, 
				manutencao.getId(), 
				manutencao.getInsumo().getId(), 
				manutencao.getSolicitante(), 
				manutencao.getDescricao(), 
				new Date(), 
				newManutencao.getInstante(), 
				manutencao.getDataInicio(), 
				manutencao.getDataFim(), 
				manutencao.getTipo() != null ? manutencao.getTipo().getId() : null,
				manutencao.getResponsavel(), 
				manutencao.getParecerResponsavel()));
		return repo.save(newManutencao);
	}
	
	
	@Transactional
	public Manutencao finalizar(Manutencao manutencao) {
		Manutencao newManutencao = find(manutencao.getId());
		updateData(newManutencao, manutencao);
		insumoRepository.updateInsumo(manutencao.getInsumo().getStatus().getCodigo(), manutencao.getInsumo().getId());	
		historicoManutencaoRepository.save(new HistoricoManutencao(
				null, 
				manutencao.getId(), 
				manutencao.getInsumo().getId(), 
				manutencao.getSolicitante(), 
				manutencao.getDescricao(), 
				new Date(), 
				newManutencao.getInstante(), 
				manutencao.getDataInicio(), 
				manutencao.getDataFim(), 
				manutencao.getTipo() != null ? manutencao.getTipo().getId() : null,
				manutencao.getResponsavel(), 
				manutencao.getParecerResponsavel()));
		
		Manutencao mSave = repo.save(newManutencao);		
		try {
			repo.deleteById(mSave.getId());
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um Manutencao");
		}
		
		return mSave;
	}

	@Transactional
	public void delete(Long id) {
		Manutencao manutencao = find(id);
		insumoRepository.updateInsumo(StatusInsumoEnum.ATIVO.getCodigo(), manutencao.getInsumo().getId());	
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um Manutencao");
		}
	}

	private void updateData(Manutencao newManutencao, Manutencao manutencao) {
		newManutencao.setDataInicio(manutencao.getDataInicio());	
		newManutencao.setDataFim(manutencao.getDataFim());	
		newManutencao.setDescricao(manutencao.getDescricao());
		newManutencao.setTipo(manutencao.getTipo());
		newManutencao.setDescricao(manutencao.getDescricao());
		newManutencao.setResponsavel(manutencao.getResponsavel());
		newManutencao.setParecerResponsavel(manutencao.getParecerResponsavel());		
	}
	

	public Page<Manutencao> findPage(String solicitante, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<Manutencao> listPage;
		if(solicitante == null || ("").equals(solicitante.trim())) {
			listPage = repo.findAll(pageRequest);
		}else {
			listPage = repo.findBySolicitanteContainingIgnoreCase(solicitante.toUpperCase(), pageRequest);
		}
		return listPage;
	}

	public long qntMutencao() {
		return repo.count();
	}

}
