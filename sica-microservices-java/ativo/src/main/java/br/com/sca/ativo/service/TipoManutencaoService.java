package br.com.sca.ativo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sca.ativo.model.TipoManutencao;
import br.com.sca.ativo.repository.TipoManutencaoRepository;


@Service
public class TipoManutencaoService {

	@Autowired
	private TipoManutencaoRepository repo;

	
	public List<TipoManutencao> findAll() {
		return repo.findAll();
	}

	
}
