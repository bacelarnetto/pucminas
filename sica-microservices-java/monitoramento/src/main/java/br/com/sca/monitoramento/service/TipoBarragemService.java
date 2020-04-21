package br.com.sca.monitoramento.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sca.monitoramento.model.TipoBarragem;
import br.com.sca.monitoramento.repository.TipoBarragemRepository;


@Service
public class TipoBarragemService {

	@Autowired
	private TipoBarragemRepository repo;

	
	public List<TipoBarragem> findAll() {
		return repo.findAll();
	}

	
}