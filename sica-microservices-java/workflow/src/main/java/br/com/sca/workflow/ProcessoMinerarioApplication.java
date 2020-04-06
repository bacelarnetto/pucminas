package br.com.sca.workflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ProcessoMinerarioApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ProcessoMinerarioApplication.class, args);
	}

}
