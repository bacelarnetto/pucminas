package br.com.sca.barragem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan({"br.com.sca.barragem.model"})
@EnableJpaRepositories({"br.com.sca.barragem.repository"})		// Enable eureka client.
@EnableEurekaClient
@EnableCircuitBreaker 	// Enable circuit breakers
@ComponentScan("br.com.sca")
public class BarragemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarragemApplication.class, args);
	}
	
}
