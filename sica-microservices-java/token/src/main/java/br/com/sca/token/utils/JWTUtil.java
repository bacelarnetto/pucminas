package br.com.sca.token.utils;


import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTUtil {
	
	@Value("${jwt.secret:SequenciaDeCaracteresParaAssinarToken}")
	private String secret;

	@Value("${jwt.expiration:6000}")
	private Long expiration;
	
	@Value("${jwt.header:Authorization}")
    private String header;

    @Value("${jwt.prefix:Bearer }")
    private String prefix;
	
	public String generateToken(String username, List<String> authorities) {
		long now = Calendar.getInstance().getTimeInMillis() / 1000;
		
		long expire =  now + expiration;
		return Jwts.builder()
				.setSubject(username)	
				// Convert to list of strings. 
				// This is important because it affects the way we get them back in the Gateway.
				.claim("authorities", authorities)
				.setExpiration(new Date(expire * 1000))
				.signWith(SignatureAlgorithm.HS512, secret.getBytes())
				.compact();
	}
	
	public boolean tokenValido(String token) {
		Claims claims = getClaims(token);
		if (claims != null) {
			String username = claims.getSubject();
			Date expirationDate = claims.getExpiration();
			Date now = new Date(System.currentTimeMillis());
			if (username != null && expirationDate != null && now.before(expirationDate)) {
				return true;
			}
		}
		return false;
	}

	public String getUsername(String token) {
		Claims claims = getClaims(token);
		if (claims != null) {
			return claims.getSubject();
		}
		return null;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<String> getAuthorities(String token) {		
		Claims claims = getClaims(token);
		if (claims != null) {
			return (List<String>) claims.get("authorities");
		}
		return null;
	}
	
	private Claims getClaims(String token) {
		try {
			return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody();
		}catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	
	public String getHeader() {
		return header;
	}

	public String getPrefix() {
		return prefix;
	}

	public Long getExpiration() {
		return expiration;
	}
}