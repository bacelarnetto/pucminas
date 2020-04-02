package br.com.sca.ativo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.sca.ativo.model.HistoricoPedido;

/**
 * @author Jose Ribamar
 */
public interface HistoricoPedidoRepository extends JpaRepository<HistoricoPedido, Long> {
	

    
}