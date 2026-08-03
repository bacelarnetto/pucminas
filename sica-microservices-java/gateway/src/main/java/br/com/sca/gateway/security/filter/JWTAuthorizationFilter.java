package br.com.sca.gateway.security.filter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import br.com.sca.token.utils.JWTUtil;
import reactor.core.publisher.Mono;

public class JWTAuthorizationFilter implements WebFilter {

	private JWTUtil jwtUtil;

	public JWTAuthorizationFilter(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
		String header = exchange.getRequest().getHeaders().getFirst(jwtUtil.getHeader());
		if (header != null && header.startsWith(jwtUtil.getPrefix())) {
			String token = header.substring(jwtUtil.getPrefix().length());
			if (jwtUtil.tokenValido(token)) {
				String username = jwtUtil.getUsername(token);
				List<String> authorities = jwtUtil.getAuthorities(token);
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null,
						authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
				SecurityContext context = SecurityContextHolder.createEmptyContext();
				context.setAuthentication(auth);
				return chain.filter(exchange)
						.contextWrite(ReactiveSecurityContextHolder.withSecurityContext(Mono.just(context)));
			}
		}
		return chain.filter(exchange);
	}
}
