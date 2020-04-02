package br.com.sca.ativo.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import br.com.sca.ativo.model.Insumo;
import org.springframework.data.repository.query.Param;

/**
 * @author Jose Ribamar
 */
public interface InsumoRepository extends JpaRepository<Insumo, Long> {

    Page<Insumo> findByDescricaoContainingIgnoreCase(@Param("descricao") String descricao, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE Insumo i SET i.status = :codStatus WHERE i.id = :idInsumo")
    int updateInsumo(@Param("codStatus") Integer codStatus, @Param("idInsumo") Long idInsumo);
    
    long count();
    
}