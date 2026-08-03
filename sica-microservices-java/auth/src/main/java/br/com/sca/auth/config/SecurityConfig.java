package br.com.sca.auth.config;


import java.util.Arrays;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import br.com.sca.auth.filters.JWTAuthenticationFilter;
import br.com.sca.token.utils.JWTUtil;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JWTUtil jwtUtil;
	
	private static final String[] PUBLIC_MATCHERS = {
			"/swagger-ui.html",
			"/swagger-ui/**",
			"/v3/api-docs/**",
			"/user/**"
	};
	
	private static final String[] PUBLIC_MATCHERS_POST = {
			"/user/**",
			"/login/**"
	};

	private static final String[] PUBLIC_MATCHERS_GET = {
			"/user/**",
			"/swagger-resources/**", 
			"/webjars/springfox-swagger-ui/**", 
			"/v2/api-docs/**",
			"/v3/api-docs/**"
	};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
		http.cors().and().csrf().disable();
		http.authorizeHttpRequests(authorize -> authorize
		.requestMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
		.requestMatchers(HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll()
		.requestMatchers(PUBLIC_MATCHERS).permitAll()
			.anyRequest().authenticated());
		http.addFilter(new JWTAuthenticationFilter(authenticationManager, jwtUtil));
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED));
		return http.build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
