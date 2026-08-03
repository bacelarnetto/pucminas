package br.com.sca.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"br.com.sca", "br.com.sca.auth", "br.com.sca.auth.email"})
public class AuthJwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthJwtApplication.class, args);
	}

}
