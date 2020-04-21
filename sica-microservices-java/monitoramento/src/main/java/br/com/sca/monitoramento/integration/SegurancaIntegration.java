package br.com.sca.monitoramento.integration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

import br.com.sca.monitoramento.dto.EnvioAlertaDTO;
import br.com.sca.monitoramento.dto.MoradorAlertaDTO;
import br.com.sca.monitoramento.model.Morador;
import br.com.sca.monitoramento.repository.MoradorRepository;

@Service
public class SegurancaIntegration {

	@Value("${url.api.seguraca.moradores}")
	private String baseUrl;

	@Autowired
	private MoradorRepository repo;
	
	@Autowired
	private RestTemplate restTemplate;

	public List<Morador> findListMoradorByIdBarragem(Long idBarragem) {
		return repo.findListMoradorByIdBarragem(idBarragem);
	}

	@HystrixCommand(fallbackMethod = "fallback")
	public String enviarAlerta(EnvioAlertaDTO dto) {
		List<MoradorAlertaDTO> moradores = repo.findListMoradorAlertaByIdBarragem(dto.getIdBarragem());
		
		restTemplate.postForObject(baseUrl, moradores, Object[].class);
		
		return HttpStatus.OK.name();
	}

	// a fallback method to be called if failure happened
	public String fallback(EnvioAlertaDTO dto) {
		return "Não foi possivel enviar o alerta para os moradores. " + "ID Barragem: " + dto.getIdBarragem()
				+ ". Serviço indisponível.";
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
