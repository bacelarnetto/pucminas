package br.com.sca.ativo.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.sca.ativo.model.Fornecedor;


@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
	
	@Query(value = "SELECT f FROM Fornecedor f WHERE f.status = 1 ")
	Page<Fornecedor> findListFornecedor(Pageable pageable);
	
	@Query(value = "SELECT f FROM Fornecedor f WHERE f.status = 1 AND lower(f.nome) like lower(concat('%', :nome,'%'))")
	Page<Fornecedor> findListFornecedorByNome(@Param("nome")String nome, Pageable pageable);
	
	@Query(value = "SELECT f FROM Fornecedor f WHERE f.status = 1 ")
	public List<Fornecedor> findListAll();
	
}
