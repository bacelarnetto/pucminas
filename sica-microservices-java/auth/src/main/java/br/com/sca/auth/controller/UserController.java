package br.com.sca.auth.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder; 

import br.com.sca.auth.dto.UserDTO;
import br.com.sca.auth.dto.UserNewDTO;
import br.com.sca.auth.dto.UserUpdateDTO;
import br.com.sca.auth.model.Usuario;
import br.com.sca.auth.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * @author Jose Bacelar
 */

@RestController
@RequestMapping(value = "/user")
@Api(value = "Endpoints to manage user")
public class UserController {

	
	@Autowired
	private UserService userService;
	
	@ApiOperation(value="Get user")
	@RequestMapping(value = "/email/{email}", method = RequestMethod.GET)
	public ResponseEntity<UserDTO> getUserByEmail(
			@PathVariable String email,
			@RequestHeader(value = "Authorization") String authorization) {
		UserDTO dto = userService.getUserByEmail(email);
		return ResponseEntity.ok().body(dto);
	}

	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> insert(
			@Valid @RequestBody UserNewDTO dto, 
			@RequestHeader(value = "Authorization") String authorization) {
		Usuario obj = userService.insert(dto);		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	
	@ApiOperation(value="Lista de usuarios paginada")
	@RequestMapping(value = "/list-page", method = RequestMethod.GET)
	public ResponseEntity<Page<Usuario>> findPage(
			@RequestHeader(value = "Authorization") String authorization,
			@RequestParam(value = "username", required = false) String username,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "lines_per_page", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "order_by", defaultValue = "username") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction
		) {
		Page<Usuario> list = userService.findPage(username, page, linesPerPage, orderBy, direction);
		return ResponseEntity.ok().body(list);
	}
	
	
	@ApiOperation(value="Find Usuario")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<UserUpdateDTO> find(
			@PathVariable Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		UserUpdateDTO user = userService.findUser(id);
		return ResponseEntity.ok().body(user);
	}
	
	@ApiOperation(value="Update Usuario")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @PathVariable Long id, 
			@RequestBody UserUpdateDTO user,
			@RequestHeader(value = "Authorization") String authorization) {
		userService.update(user);
		return ResponseEntity.noContent().build();
	}
	
	
	@ApiOperation(value="Exclusao da Usuario")
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id")  Long id,
			@RequestHeader(value = "Authorization") String authorization) {
		userService.delete(id);
		return ResponseEntity.noContent().build();
	}
}