package br.com.sca.ativo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sca.ativo.model.TipoInsumo;
import br.com.sca.ativo.repository.TipoInsumoRepository;


@Service
public class TipoInsumoService {

	@Autowired
	private TipoInsumoRepository repo;

	
	public List<TipoInsumo> findAll() {
		return repo.findAll();
	}

	
}
