package br.com.sca.ativo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.sca.ativo.model.TipoManutencao;


@Repository
public interface TipoManutencaoRepository extends JpaRepository<TipoManutencao, Long> {
	
		
}
