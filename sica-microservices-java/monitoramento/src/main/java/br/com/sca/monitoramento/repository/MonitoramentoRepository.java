package br.com.sca.monitoramento.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.sca.monitoramento.model.Monitoramento;

/**
 * @author Jose Ribamar
 */
public interface MonitoramentoRepository extends PagingAndSortingRepository<Monitoramento, Long> {
	
	
}