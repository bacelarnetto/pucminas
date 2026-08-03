package br.com.sca.monitoramento.integration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import br.com.sca.monitoramento.dto.UserDTO;

@Service
public class AuthIntegration {

	@Value("${url.api.auth.user}")
	private String baseUrl;

	@Autowired
	private RestTemplate restAuthTemplate;

	public String insertUser(UserDTO dto) {
		try {
			HttpHeaders headers = new HttpHeaders();

			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "API_BARRAGEM_XPIIHSHJHH*(*0006$%");
			
			HttpEntity<UserDTO> request = new HttpEntity<UserDTO>(dto, headers);
			
			ResponseEntity<UserDTO> responseEntity = restAuthTemplate.exchange(baseUrl, HttpMethod.POST, request, UserDTO.class);
			
			return responseEntity.getStatusCode().toString();
		} catch (Exception e) {
			return fallbackInsert(dto);
		}
	}
	
	public String updateUser(UserDTO dto) {
		try {
			HttpHeaders headers = new HttpHeaders();

			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "API_BARRAGEM_XPIIHSHJHH*(*0006$%");
			
			HttpEntity<UserDTO> request = new HttpEntity<UserDTO>(dto, headers);
			
			ResponseEntity<UserDTO> responseEntity = restAuthTemplate.exchange(baseUrl, HttpMethod.PUT, request, UserDTO.class);
			
			return responseEntity.getStatusCode().toString();
		} catch (Exception e) {
			return fallbackUpdate(dto);
		}
	}

	// a fallback method to be called if failure happened
	public String fallbackInsert(UserDTO dto) {
		return "Não foi possivel cadastrar o moradores como usuario. " + "Email: " + dto.getEmail()
				+ ". Serviço indisponível.";
	}
	
	// a fallback method to be called if failure happened
		public String fallbackUpdate(UserDTO dto) {
			return "Não foi possivel atualizar o moradores como usuario. " + "Email: " + dto.getEmail()
					+ ". Serviço indisponível.";
		}

}
