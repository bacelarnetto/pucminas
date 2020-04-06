package br.com.sca.barragem.integration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

import br.com.sca.barragem.dto.EnvioAlertaDTO;
import br.com.sca.barragem.model.Morador;
import br.com.sca.barragem.repository.MoradorRepository;

@Service
public class SegurancaIntegration {

	private final String baseUrl = "http://localhost:3333/cidades";

	@Autowired
	private MoradorRepository repo;
	
	@Autowired
	private RestTemplate restTemplate;

	public List<Morador> findListMoradorByIdBarragem(Long idBarragem) {
		return repo.findListMoradorByIdBarragem(idBarragem);
	}

	@HystrixCommand(fallbackMethod = "fallback")
	public String enviarAlerta(EnvioAlertaDTO dto) {
		List<Morador> moradores = repo.findListMoradorByIdBarragem(dto.getIdBarragem());
		restTemplate.postForObject(baseUrl, moradores, ResponseEntity.class);
		return "OK";
	}

	// a fallback method to be called if failure happened
	public String fallback(EnvioAlertaDTO dto, Throwable hystrixCommand) {
		return "Não foi possivel enviar o alerta para os moradores. " + "ID Barragem: " + dto.getIdBarragem()
				+ ". Serviço indisponível.";
	}

	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
