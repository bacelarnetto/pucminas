package br.com.sca.barragem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.sca.barragem.model.TipoBarragem;

/**
 * @author Jose Ribamar
 */
public interface TipoBarragemRepository extends JpaRepository<TipoBarragem, Long> {
	

}