package br.com.sca.auth.model;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import br.com.sca.commons.lib.model.AbstractEntity;
import br.com.sca.token.enums.RoleEnum;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Jose Bacelar
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Usuario implements AbstractEntity {
   
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    
    @Column(nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
	private String email;
   
    @Column(nullable = false)
    @ToString.Exclude
    private String password;
    
    @ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name = "ROLE")    
	private Set<Integer> roles = new HashSet<>();


    public Usuario(Long id, String username, String email, String password, RoleEnum role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        addRole(role);
    }
    
    public Set<RoleEnum> getRoles(){
		return roles.stream().map(x -> RoleEnum.toEnum(x)).collect(Collectors.toSet());		
	}
    
    public void addRole(RoleEnum role) {
		roles.add(role.getCodigo());
	}
    
}