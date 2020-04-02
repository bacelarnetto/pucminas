package br.com.sca.auth.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.sca.auth.model.Usuario;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
	
	@Transactional(readOnly=true)
	Usuario findByEmail(String email);
	
	Page<Usuario> findByUsernameContainingIgnoreCase(@Param("username") String username, Pageable pageable);
	
	@Transactional
	@Modifying
	@Query(value = "delete from role where usuario_id = :idUser", 
			  nativeQuery = true)
	void deleteRoleByIdUser(Long idUser);

}
