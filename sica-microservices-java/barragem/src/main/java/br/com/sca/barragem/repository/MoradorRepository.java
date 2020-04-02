package br.com.sca.barragem.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.barragem.model.Morador;


@Repository
public interface MoradorRepository extends JpaRepository<Morador, Long> {
	
	@Transactional(readOnly=true)
	Morador findByEmail(String email);
	
	@Transactional(readOnly=true)
	@Query(value = "SELECT m FROM Morador m WHERE m.barragem.id = :idBarragem ")
	public List<Morador> findListMoradorByIdBarragem(Long idBarragem);
	
	Page<Morador> findByNomeContainingIgnoreCase(@Param("nome") String nome, Pageable pageable);
	
	long count();
	
}
