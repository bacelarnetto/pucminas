package br.com.sca.ativo.repository;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.sca.ativo.model.Pedido;

/**
 * @author Jose Ribamar
 */
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
	
	@Query(value = "SELECT p FROM Pedido p INNER JOIN p.fornecedor f  "
			+ " WHERE f.id = :idFornecedor ")
	Page<Pedido> findListPedidosByFornecedor(@Param("idFornecedor") Long idFornecedor,  Pageable pageable);
	
	@Query(value = "SELECT p FROM Pedido p INNER JOIN p.fornecedor f  "
			+ " WHERE f.email = :email  ")
	Page<Pedido> findListPedidosFornecedorEmail(@Param("email") String email, Pageable pageable);

	@Query(value = "SELECT p FROM Pedido p INNER JOIN p.fornecedor f  "
			+ " WHERE f.email = :email  AND "
			+ " p.instante >= :dataInicio AND "
			+ " p.instante <= :dataFim ")
	Page<Pedido> findListPedidosFornecedor(@Param("email") String email, @Param("dataInicio") Date dataInicio, @Param("dataFim") Date dataFim, Pageable pageable);

	long count();
	
}