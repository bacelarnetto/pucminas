package br.com.sca.barragem.service;
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

import br.com.sca.barragem.dto.BarragemMoradorDTO;
import br.com.sca.barragem.dto.BarragemMoradorRiscoAltoDTO;
import br.com.sca.barragem.dto.CategoriaRiscoDTO;
import br.com.sca.barragem.dto.DanoPotencialAssociadoDTO;
import br.com.sca.barragem.dto.ObjetivoContencaoDTO;
import br.com.sca.barragem.dto.SituacaoOperacionalDTO;
import br.com.sca.barragem.enums.CategoriaRiscoEnum;
import br.com.sca.barragem.enums.DanoPotencialAssociadoEnum;
import br.com.sca.barragem.enums.ObjetivoContencaoEnum;
import br.com.sca.barragem.enums.SituacaoOperacionalEnum;
import br.com.sca.barragem.enums.StatusBarragemEnum;
import br.com.sca.barragem.model.Barragem;
import br.com.sca.barragem.repository.BarragemRepository;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Jose Bacelar
 */
@Service
@Slf4j
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BarragemService {
	
    private final BarragemRepository repo;


	public Barragem find(Long id) {
		Optional<Barragem> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Barragem não encontrada! Id: " + id + ", Tipo: " + Barragem.class.getName()));
	}

	@Transactional
	public Barragem insert(Barragem barragem) {
		barragem.setId(null);	
		barragem.setDataCadastro(new Date());
		barragem.setStatus(StatusBarragemEnum.ATIVO.getCodigo());		
		barragem = repo.save(barragem);
		return barragem;
	}

	public Barragem update(Barragem barragem) {
		Barragem newBarragem = find(barragem.getId());
		updateData(newBarragem, barragem);
		return repo.save(newBarragem);
	}
	
	
	public Barragem mudaStatusRiscoAlto(String id) {
		Long idBarragem = Long.parseLong(id);		
		Barragem barragem = find(idBarragem);
		barragem.setCodigoCategoriaRisco(CategoriaRiscoEnum.ALTO.getCodigo());		
		return repo.save(barragem);		
	}

	public void delete(Long id) {
		find(id);
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um Barragem");
		}
	}
	
	

	private void updateData(Barragem newBarragem, Barragem barragem) {		
		newBarragem.setDescricao(barragem.getDescricao());		
		newBarragem.setEmpreendedor(barragem.getEmpreendedor());		
		newBarragem.setCnpjEmpreendedor(barragem.getCnpjEmpreendedor());		
		newBarragem.setMinerio(barragem.getMinerio());		
		newBarragem.setCodigoObjetivoContencao(barragem.getCodigoObjetivoContencao());		
		newBarragem.setCodigoSituacaoOperacional(barragem.getCodigoSituacaoOperacional());		
		newBarragem.setCodigoDanoPotencial(barragem.getCodigoDanoPotencial());		
		newBarragem.setCodigoCategoriaRisco(barragem.getCodigoCategoriaRisco());		
		//newBarragem.setStatus(barragem.getStatus());	
		newBarragem.setTipo(barragem.getTipo());
		newBarragem.setAlimentadoUsina(barragem.getAlimentadoUsina());
		newBarragem.setLatitude(barragem.getLatitude());
		newBarragem.setLongitude(barragem.getLongitude());		
		newBarragem.setCidade(barragem.getCidade());
		newBarragem.setUf(barragem.getUf());					
	}
	
	public List<Barragem> findAll() {
		return repo.findListAll();
	}

	public Page<Barragem> findPage(String descricao, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return descricao == null || ("").equals(descricao.trim()) ? repo.findListBarragem(pageRequest) : repo.findListBarragemByNome(descricao, pageRequest);
	}
	
	
	//list enums
	public List<CategoriaRiscoDTO> getAllCategoriaRisco(){
		List<CategoriaRiscoDTO> newStatus = new ArrayList<>();
		for(CategoriaRiscoEnum s : CategoriaRiscoEnum.values()) {
			CategoriaRiscoDTO status = new CategoriaRiscoDTO();
			status.setId(s.getCodigo().longValue());
			status.setDescricao(s.getDescricao());
			newStatus.add(status);
		}		
		return newStatus;
	}
	
	public List<DanoPotencialAssociadoDTO> getAllDanoPotencialAssociado(){
		List<DanoPotencialAssociadoDTO> newStatus = new ArrayList<>();
		for(DanoPotencialAssociadoEnum s : DanoPotencialAssociadoEnum.values()) {
			DanoPotencialAssociadoDTO status = new DanoPotencialAssociadoDTO();
			status.setId(s.getCodigo().longValue());
			status.setDescricao(s.getDescricao());
			newStatus.add(status);
		}		
		return newStatus;
	}
	
	public List<ObjetivoContencaoDTO> getAllObjetivoContencao(){
		List<ObjetivoContencaoDTO> newStatus = new ArrayList<>();
		for(ObjetivoContencaoEnum s : ObjetivoContencaoEnum.values()) {
			ObjetivoContencaoDTO status = new ObjetivoContencaoDTO();
			status.setId(s.getCodigo().longValue());
			status.setDescricao(s.getDescricao());
			newStatus.add(status);
		}		
		return newStatus;
	}
	
	public List<SituacaoOperacionalDTO> getAllSituacaoOperacional(){
		List<SituacaoOperacionalDTO> newStatus = new ArrayList<>();
		for(SituacaoOperacionalEnum s : SituacaoOperacionalEnum.values()) {
			SituacaoOperacionalDTO status = new SituacaoOperacionalDTO();
			status.setId(s.getCodigo().longValue());
			status.setDescricao(s.getDescricao());
			newStatus.add(status);
		}		
		return newStatus;
	}
	
	public long qntBarragem() {		
		return repo.count();
	}
	
	public long qntTotalBarragemAlerta() {		
		return repo.countBarragemAlerta();
	}
	
	public List<BarragemMoradorDTO> findResumoBarragemList() {
		return repo.findResumoBarragemList();
	}
	
	public List<BarragemMoradorRiscoAltoDTO> findResumoBarragemRiscoAltoList() {
		
		List<BarragemMoradorRiscoAltoDTO> barragensRiscoAlto = new ArrayList<>();
		
		List<BarragemMoradorDTO> barragens = repo.findResumoBarragemRiscoAltoList();
		
		if(barragens != null && !barragens.isEmpty()) {
			for(BarragemMoradorDTO barragem : barragens) {
				BarragemMoradorRiscoAltoDTO barragemRiscoAlto = new BarragemMoradorRiscoAltoDTO();
				barragemRiscoAlto.setIdBarragem(barragem.getIdBarragem());
				barragemRiscoAlto.setNomeBarragem(barragem.getNomeBarragem());
				barragemRiscoAlto.setTotalMorador(barragem.getTotalMorador());
				barragemRiscoAlto.setDanoPotencialAssociado(DanoPotencialAssociadoEnum.toEnum(barragem.getCodigoDanoPotencial()));
				barragensRiscoAlto.add(barragemRiscoAlto);
			}
		}
			
		
		return barragensRiscoAlto;
	}
	
}