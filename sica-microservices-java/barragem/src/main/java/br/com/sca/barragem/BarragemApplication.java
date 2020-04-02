package br.com.sca.barragem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan({"br.com.sca.barragem.model"})
@EnableJpaRepositories({"br.com.sca.barragem.repository"})
@ComponentScan("br.com.sca")
public class BarragemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BarragemApplication.class, args);
	}

}
