package br.com.sca.ativo.db.service;
import java.text.ParseException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sca.ativo.model.TipoInsumo;
import br.com.sca.ativo.model.TipoManutencao;
import br.com.sca.ativo.repository.TipoInsumoRepository;
import br.com.sca.ativo.repository.TipoManutencaoRepository;


@Service
public class DBService {

	
	@Autowired
	private TipoInsumoRepository tipoInsumoRepository;
	
	@Autowired
	private TipoManutencaoRepository tipoManutencaoRepository;
	
	
	public void instantiateTestDatabase() throws ParseException {
		
		TipoInsumo tInsumo1 = new TipoInsumo("Máquinas");
		TipoInsumo tInsumo2 = new TipoInsumo("Sistemas de Energia");
		TipoInsumo tInsumo3 = new TipoInsumo("Acessórios");
		TipoInsumo tInsumo4 = new TipoInsumo("Peças");
		TipoInsumo tInsumo5 = new TipoInsumo("Tecnologia e Solução");		
		tipoInsumoRepository.saveAll(Arrays.asList(tInsumo1, tInsumo2, tInsumo3, tInsumo4, tInsumo5));
		
		
		TipoManutencao tManutencao1 = new TipoManutencao("Detectiva");
		TipoManutencao tManutencao2 = new TipoManutencao("Preditiva");
		TipoManutencao tManutencao3 = new TipoManutencao("Corretiva");		
		tipoManutencaoRepository.saveAll(Arrays.asList(tManutencao1, tManutencao2, tManutencao3));		

	}
}