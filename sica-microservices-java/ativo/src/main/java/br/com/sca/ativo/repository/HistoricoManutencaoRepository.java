package br.com.sca.ativo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.sca.ativo.model.HistoricoManutencao;

/**
 * @author Jose Ribamar
 */
public interface HistoricoManutencaoRepository extends JpaRepository<HistoricoManutencao, Long> {
	

    
}