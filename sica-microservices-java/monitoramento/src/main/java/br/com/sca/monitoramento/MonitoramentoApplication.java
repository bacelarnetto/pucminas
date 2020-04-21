package br.com.sca.monitoramento;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan({"br.com.sca.monitoramento.model"})
@EnableJpaRepositories({"br.com.sca.monitoramento.repository"})		// Enable eureka client.
@EnableEurekaClient
@EnableCircuitBreaker 	// Enable circuit breakers
@ComponentScan("br.com.sca")
public class MonitoramentoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MonitoramentoApplication.class, args);
	}
	
}
