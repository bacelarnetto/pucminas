package br.com.sca.token.config;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


public class SecurityTokenConfig {
		
	
	private static final String[] PUBLIC_MATCHERS = {
			"/**/swagger-ui.html",
			"/monitoramento/public/**",
			"/hystrix-dashboard/hystrix/**",
			"/**/alert/**"
	};

	private static final String[] PUBLIC_MATCHERS_GET = {
			"/**/swagger-resources/**", 
			"/**/webjars/springfox-swagger-ui/**", 
			"/**/v2/api-docs/**",
			"/**/v3/api-docs/**",
			"/monitoramento/defesa-civil/**"
	};

	private static final String[] PUBLIC_MATCHERS_POST = {
			"/auth/login/**"
	};
	
	private static final String[] PRIVATE_MATCHERS_ADMIN = {
			"/auth/user/**",
			"/monitoramento/barragem/**",
			"/monitoramento/morador/**",
			"/ativo/manutencao/**",
			"/ativo/marca/**",
			"/ativo/insumo/**",
			"/ativo/fornecedor/**",
			"/ativo/pedido/**",
	};
	
	private static final String[] PRIVATE_MATCHERS_FUNCTIONARY = {
			"/ativo/manutencao/**",
			"/ativo/marca/**",
			"/ativo/insumo/**",
			"/ativo/fornecedor/**",
			"/ativo/pedido/**",
	};
	
	private static final String[] PRIVATE_MATCHERS_ENGINEER = {
			"/monitoramento/barragem/**"
	};
	
	private static final String[] PRIVATE_MATCHERS_PROVIDER = {
			"/ativo/integration-suppliers/**"
	};
	
	private static final String[] PRIVATE_MATCHERS_RESIDENT = {
			"/monitoramento/morador/**"
	};
	
	private static final String[] PRIVATE_MATCHERS_CIVILDEFENSE = {
			"/monitoramento/defesacivil/**"
	};
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable();
		http.authorizeHttpRequests(authorize -> authorize
			.requestMatchers(HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll()
			.requestMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
			.requestMatchers(PUBLIC_MATCHERS).permitAll()
			.requestMatchers(PRIVATE_MATCHERS_ADMIN).hasRole("ADMIN")
			.requestMatchers(PRIVATE_MATCHERS_FUNCTIONARY).hasAnyRole("ADMIN", "FUNCTIONARY")
            .requestMatchers(PRIVATE_MATCHERS_ENGINEER).hasAnyRole("ADMIN", "ENGINEER") 
            .requestMatchers(PRIVATE_MATCHERS_PROVIDER).hasAnyRole("ADMIN", "PROVIDER")  
            .requestMatchers(PRIVATE_MATCHERS_RESIDENT).hasAnyRole("ADMIN", "FUNCTIONARY", "ENGINEER", "RESIDENT")
            .requestMatchers(PRIVATE_MATCHERS_CIVILDEFENSE).hasAnyRole("ADMIN", "CIVILDEFENSE")
			.anyRequest().authenticated());
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.exceptionHandling().authenticationEntryPoint((req, resp, e) -> resp.sendError(HttpServletResponse.SC_UNAUTHORIZED));
		return http.build();
	}
		
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
