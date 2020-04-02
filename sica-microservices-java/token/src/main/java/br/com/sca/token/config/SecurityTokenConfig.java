package br.com.sca.token.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


public class SecurityTokenConfig extends WebSecurityConfigurerAdapter{
		
	
	private static final String[] PUBLIC_MATCHERS = {
			"/**/swagger-ui.html",
			"/barragem/public/**"
	};

	private static final String[] PUBLIC_MATCHERS_GET = {
			"/**/swagger-resources/**", 
			"/**/webjars/springfox-swagger-ui/**", 
			"/**/v2/api-docs/**"
	};

	private static final String[] PUBLIC_MATCHERS_POST = {
			"/auth/login/**"
	};
	
	private static final String[] PRIVATE_MATCHERS_ADMIN = {
			"/auth/user/**",
			"/barragem/barragem/**",
			"/barragem/morador/**",
			"/ativo/manutencao/**",
			"/ativo/marca/**",
			"/ativo/insumo/**",
			"/ativo/fornecedor/**",
			"/ativo/pedido/**",
	};
	
	private static final String[] PRIVATE_MATCHERS_USER = {
			"/barragem/barragem/**",
			"/barragem/morador/**",
			"/ativo/manutencao/**",
			"/ativo/marca/**",
			"/ativo/insumo/**",
			"/ativo/fornecedor/**",
			"/ativo/pedido/**",
	};
	
	private static final String[] PRIVATE_MATCHERS_ENGINEER = {
			"/barragem/barragem/**",
			"/barragem/morador/**"
	};
	
	private static final String[] PRIVATE_MATCHERS_PROVIDER = {
			"/ativo/integration-suppliers/**"
	};


	@Override
	protected void configure(HttpSecurity http) throws Exception {		
		http.cors().and().csrf().disable();
		http.authorizeRequests()
			.antMatchers(HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll()
			.antMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
			.antMatchers(PUBLIC_MATCHERS).permitAll()
			.antMatchers(PRIVATE_MATCHERS_ADMIN).hasAnyRole("ADMIN")
			.antMatchers(PRIVATE_MATCHERS_USER).hasAnyRole("USER", "ADMIN")
            .antMatchers(PRIVATE_MATCHERS_ENGINEER).hasAnyRole("ENGINEER", "ADMIN") 
            .antMatchers(PRIVATE_MATCHERS_PROVIDER).hasAnyRole( "PROVIDER", "ADMIN")  
			.anyRequest().authenticated();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.exceptionHandling().authenticationEntryPoint((req, resp, e) -> resp.sendError(HttpServletResponse.SC_UNAUTHORIZED));
	}
		
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
