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
	
	@Modifying
	@Query(value = "delete from role where usuario_id = :idUser", 
			  nativeQuery = true)
	void deleteRoleByIdUser(Long idUser);
	

	@Query(value = "select roles from role where usuario_id = :idUser and roles = :idRole", 
	  nativeQuery = true)
	public Long findIdRoleByIdUser(Integer idRole, Long idUser);
	
	@Modifying(clearAutomatically = true)
	@Query(value =  " update role  set roles = :idRole "
			+ " where usuario_id  = :idUser ",
			nativeQuery = true)
	void updateRole( Long idUser, Integer idRole);
	
	@Modifying(clearAutomatically = true)
	@Query("update Usuario u set "
			+ " u.username = :username, u.password = :password,  u.email = :email"
			+ " where u.id = :id")	 
	void updateUserById(
			@Param("id") Long id, 
			@Param("username") String username,
			@Param("password") String password,
			@Param("email") String email);
	
	@Modifying(clearAutomatically = true)
	@Query("update Usuario u set "
			+ " u.username = :username, u.password = :password"
			+ " where u.email = :email ")	 
	void updateUserByEmail(
			@Param("username") String username,
			@Param("password") String ppassword,
			@Param("email") String email);

}
