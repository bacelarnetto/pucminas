package br.com.sca.ativo.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sca.ativo.model.Marca;


@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
	
	@Query(value = "SELECT m FROM Marca m WHERE m.status = 1 ")
	Page<Marca> findListMarca(Pageable pageable);
	
	@Query(value = "SELECT m FROM Marca m WHERE m.status = 1 AND lower(m.nome) like lower(concat('%', :nome,'%'))")
	Page<Marca> findListMarcaByNome(@Param("nome")String nome, Pageable pageable);
	
	@Query(value = "SELECT m FROM Marca m WHERE m.status = 1 ")
	public List<Marca> findListAll();
	
}
