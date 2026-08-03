package br.com.sca.gateway.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import br.com.sca.gateway.security.filter.JWTAuthorizationFilter;
import br.com.sca.token.utils.JWTUtil;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

	@Autowired
	private JWTUtil jwtUtil;

	private static final String[] PUBLIC_MATCHERS = {
			"/api/swagger-ui.html",
			"/api/swagger-ui/**",
			"/api/webjars/**",
			"/api/monitoramento/public/**"
	};

	private static final String[] PUBLIC_MATCHERS_GET = {
			"/api/v3/api-docs/**",
			"/api/monitoramento/defesacivil/**"
	};

	private static final String[] PUBLIC_MATCHERS_POST = {
			"/api/auth/login/**"
	};

	private static final String[] PRIVATE_MATCHERS_ADMIN = {
			"/api/auth/user/**",
			"/api/monitoramento/barragem/**",
			"/api/monitoramento/morador/**",
			"/api/ativo/manutencao/**",
			"/api/ativo/marca/**",
			"/api/ativo/insumo/**",
			"/api/ativo/fornecedor/**",
			"/api/ativo/pedido/**",
	};

	private static final String[] PRIVATE_MATCHERS_FUNCTIONARY = {
			"/api/ativo/manutencao/**",
			"/api/ativo/marca/**",
			"/api/ativo/insumo/**",
			"/api/ativo/fornecedor/**",
			"/api/ativo/pedido/**",
	};

	private static final String[] PRIVATE_MATCHERS_ENGINEER = {
			"/api/monitoramento/barragem/**"
	};

	private static final String[] PRIVATE_MATCHERS_PROVIDER = {
			"/api/ativo/integration-suppliers/**"
	};

	private static final String[] PRIVATE_MATCHERS_RESIDENT = {
			"/api/monitoramento/morador/**"
	};

	private static final String[] PRIVATE_MATCHERS_CIVILDEFENSE = {
			"/api/monitoramento/defesacivil/**"
	};

	@Bean
	public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
		http
			.csrf().disable()
			.cors().and()
			.httpBasic().disable()
			.addFilterAt(new JWTAuthorizationFilter(jwtUtil), SecurityWebFiltersOrder.AUTHENTICATION)
			.authorizeExchange(exchanges -> exchanges
				.pathMatchers(HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll()
				.pathMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
				.pathMatchers(PUBLIC_MATCHERS).permitAll()
				.pathMatchers(PRIVATE_MATCHERS_ADMIN).hasRole("ADMIN")
				.pathMatchers(PRIVATE_MATCHERS_FUNCTIONARY).hasAnyRole("ADMIN", "FUNCTIONARY")
				.pathMatchers(PRIVATE_MATCHERS_ENGINEER).hasAnyRole("ADMIN", "ENGINEER")
				.pathMatchers(PRIVATE_MATCHERS_PROVIDER).hasAnyRole("ADMIN", "PROVIDER")
				.pathMatchers(PRIVATE_MATCHERS_RESIDENT).hasAnyRole("ADMIN", "FUNCTIONARY", "ENGINEER", "RESIDENT")
				.pathMatchers(PRIVATE_MATCHERS_CIVILDEFENSE).hasAnyRole("ADMIN", "CIVILDEFENSE")
				.anyExchange().authenticated());
		return http.build();
	}
}
