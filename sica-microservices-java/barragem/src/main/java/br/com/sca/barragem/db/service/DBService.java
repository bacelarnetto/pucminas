package br.com.sca.barragem.db.service;
import java.text.ParseException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sca.barragem.model.TipoBarragem;
import br.com.sca.barragem.repository.TipoBarragemRepository;




@Service
public class DBService {

	
	@Autowired
	private TipoBarragemRepository tipoBarragemRepository;	
	
	
	public void instantiateTestDatabase() throws ParseException {
		
		TipoBarragem tBarragem1 = new TipoBarragem("Barragem/Barramento/Dique");
		TipoBarragem tBarragem2 = new TipoBarragem("Cava com Barramento Construído");
		TipoBarragem tBarragem3 = new TipoBarragem("Empilhamento drenado construído hidraulicamente e suscetível à liquefação");	
		
		tipoBarragemRepository.saveAll(Arrays.asList(tBarragem1, tBarragem2, tBarragem3));
		
		
	}
}