package br.com.sca.ativo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan({"br.com.sca.ativo.model"})
@EnableJpaRepositories({"br.com.sca.ativo.repository"})
@ComponentScan("br.com.sca")
public class AtivoApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(AtivoApplication.class, args);
	}
	
}
