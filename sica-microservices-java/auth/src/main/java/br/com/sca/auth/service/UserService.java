package br.com.sca.auth.service;

import org.springframework.data.domain.Page;

import br.com.sca.auth.dto.UserDTO;
import br.com.sca.auth.dto.UserNewDTO;
import br.com.sca.auth.dto.UserUpdateDTO;
import br.com.sca.auth.model.Usuario;

public interface UserService {
	
	public UserDTO getUserByEmail(String email) ;
	
	public Usuario insert(UserNewDTO dto);
	
	public Usuario update(UserUpdateDTO dto);
	
	public Usuario find(Long id) ;
	
	public UserUpdateDTO findUser(Long id) ;
	
	public void delete(Long id);
	
	public Page<Usuario> findPage(String username, Integer page, Integer linesPerPage, String orderBy, String direction);

}
