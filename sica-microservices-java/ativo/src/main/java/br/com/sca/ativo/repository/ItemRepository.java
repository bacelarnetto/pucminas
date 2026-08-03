package br.com.sca.ativo.repository;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import br.com.sca.ativo.model.Item;

/**
 * @author Jose Ribamar
 */
public interface ItemRepository extends JpaRepository<Item, Long> {

	@Transactional
	@Modifying
	@Query("delete from Item i where i.pedido.id = :idPedido")
	void deleteByPedido(Long idPedido);
	
	

}