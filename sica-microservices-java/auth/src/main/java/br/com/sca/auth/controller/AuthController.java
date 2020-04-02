package br.com.sca.auth.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.sca.auth.impl.service.UserAuthService;
import br.com.sca.auth.impl.service.UserSS;
import br.com.sca.auth.service.AuthService;
import br.com.sca.auth.dto.EmailDTO;
import br.com.sca.token.utils.JWTUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * @author Jose Bacelar
 */

@RestController
@RequestMapping(value = "/auth")
@Api(value = "Endpoints to manage authentication")
public class AuthController {

	@Autowired
	private JWTUtil jwtUtil;
	
	@Autowired
	private AuthService authService;
	
	@ApiOperation(value="Refresh token")
	@RequestMapping(value = "/refresh_token", method = RequestMethod.POST)
	public ResponseEntity<Void> refreshToken(HttpServletResponse response) {
		UserSS user = UserAuthService.authenticated();
		List<String> authorities = user.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority).collect(Collectors.toList());
		String token = jwtUtil.generateToken(user.getUsername(), authorities);
		response.addHeader(jwtUtil.getHeader(), jwtUtil.getPrefix() + token);
		response.addHeader("access-control-expose-headers", jwtUtil.getHeader());
		return ResponseEntity.noContent().build();
	}
	
	@ApiOperation(value="Request a new password")
	@RequestMapping(value = "/forgot", method = RequestMethod.POST)
	public ResponseEntity<Void> forgot(@Valid @RequestBody EmailDTO objDTO, 
			@RequestHeader(value = "Authorization") String authorization) {
		authService.sendNewPassword(objDTO.getEmail());
		return ResponseEntity.noContent().build();
	}
	
	
	
}