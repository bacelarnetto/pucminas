package br.com.sca.monitoramento.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.monitoramento.model.Monitoramento;

/**
 * @author Jose Ribamar
 */
public interface MonitoramentoRepository extends JpaRepository<Monitoramento, Long> {

	@Transactional(readOnly = true)
	@Query(value = "SELECT m FROM Monitoramento m WHERE m.idBarragem = :idBarragem "
			+ " AND m.dataCadastro BETWEEN :initDate AND :endDate ")
	public List<Monitoramento> findListByIdBarragemAndPeriodo(@Param("idBarragem") Long idBarragem,
			@Param("initDate") Date initDate, @Param("endDate") Date endDate);


	@Query(value = "SELECT m FROM Monitoramento m WHERE m.idBarragem = :idBarragem "
			+ " AND m.dataCadastro BETWEEN :initDate AND :endDate ")
	Page<Monitoramento> findListMonitoramento(@Param("idBarragem") Long idBarragem, @Param("initDate") Date initDate,
			@Param("endDate") Date endDate, Pageable pageable);

}