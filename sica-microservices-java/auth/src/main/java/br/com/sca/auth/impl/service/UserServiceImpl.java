package br.com.sca.auth.impl.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.sca.auth.dto.UserDTO;
import br.com.sca.auth.dto.UserNewDTO;
import br.com.sca.auth.dto.UserUpdateDTO;
import br.com.sca.auth.model.Usuario;
import br.com.sca.auth.repository.UserRepository;
import br.com.sca.auth.service.UserService;
import br.com.sca.commons.lib.exception.DataIntegrityException;
import br.com.sca.commons.lib.exception.ObjectNotFoundException;
import br.com.sca.token.enums.RoleEnum;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	
	public UserDTO getUserByEmail(String email) {		
		Usuario user = userRepository.findByEmail(email);		
		return buildTO(user);
	}	
	
	@Transactional
	public Usuario insert(UserNewDTO dto) {	
		Usuario user = buildModel(dto);
		return userRepository.save(user);
	}
	
	private Usuario buildModel(UserNewDTO dto) {
		Usuario user = new Usuario(null, 
				dto.getUsername(), 
				dto.getEmail(), 
				pe.encode(dto.getSenha()), 
				RoleEnum.toEnum(dto.getTipo()));
		return user;
	}
	
	private UserDTO buildTO(Usuario model) {
		UserDTO dto = new UserDTO();
		dto.setUsername(model.getUsername());
		return dto;
	}
	
	public Page<Usuario> findPage(String username, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<Usuario> listPage;
		if(username == null || ("").equals(username.trim())) {
			listPage = userRepository.findAll(pageRequest);
		}else {
			listPage = userRepository.findByUsernameContainingIgnoreCase(username, pageRequest);
		}
		return listPage;
	}

	@Transactional
	public Usuario update(UserUpdateDTO dto) {
		Usuario newUser = find(dto.getId());
		userRepository.deleteRoleByIdUser(newUser.getId());
		updateData(newUser, dto);
		return userRepository.save(newUser);
	}
	
	private void updateData(Usuario newUser, UserUpdateDTO dto) {
		newUser.setEmail(dto.getEmail());
		newUser.setPassword(pe.encode(dto.getSenha()));
		newUser.setUsername(dto.getUsername());
		newUser.addRole(RoleEnum.toEnum(dto.getTipo()));
	}
	
	public Usuario find(Long id) {
		Optional<Usuario> obj = userRepository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", User: " + Usuario.class.getName()));
	}


	@Transactional
	public UserUpdateDTO findUser(Long id) {
		Usuario user = find(id);
		UserUpdateDTO dto = new UserUpdateDTO(); 
		dto.setEmail(user.getEmail());
		dto.setUsername(user.getUsername());
		dto.setId(user.getId());
		if(user.getRoles() != null && !user.getRoles().isEmpty() ) {			
			for(RoleEnum role : user.getRoles()) {
				dto.setTipo(role.getCodigo());
			}			
		}
		
		return dto;
	}
	
	@Transactional
	public void delete(Long id) {
		find(id);
		try {
			userRepository.deleteRoleByIdUser(id);
			userRepository.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir Usuario");
		}
	}


}
