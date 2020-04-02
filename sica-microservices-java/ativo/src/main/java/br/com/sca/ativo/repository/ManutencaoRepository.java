package br.com.sca.ativo.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sca.ativo.model.Manutencao;


@Repository
public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {
	
	@Query(value = "SELECT m FROM Manutencao m WHERE m.insumo.id = :idInsumo ")
	public Optional<Manutencao> findManutencaoByIdInsumo(Long idInsumo);
	
	Page<Manutencao> findBySolicitanteContainingIgnoreCase(@Param("solicitante") String solicitante, Pageable pageable);

	long count();
	
}
