package br.com.sca.auth.db.service;
import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sca.auth.dto.UserNewDTO;
import br.com.sca.auth.service.UserService;


@Service
public class DBService {

	
	@Autowired
	private UserService userService;
	
	
	public void instantiateTestDatabase() throws ParseException {
		
		UserNewDTO dto = new UserNewDTO("ADMIN", "admin@admin.com", 1, "12345");
		
		userService.insert(dto);		

	}
}