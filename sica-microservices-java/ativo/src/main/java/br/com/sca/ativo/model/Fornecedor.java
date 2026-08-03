package br.com.sca.ativo.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.sca.commons.lib.model.AbstractEntity;
import lombok.AllArgsConstructor;
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
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Fornecedor implements AbstractEntity{	
	
 
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
	
	private String nome;

    private String email;
    
    private String telefone;
    
    private String endereco;
    
    private String numero;
    
    private String bairro;
    
    private String cidade;
    
    private String uf;    
    
    private Integer status;

    @JsonIgnore
	@OneToMany(mappedBy="fornecedor")
    private List<Pedido> pedidos = new ArrayList<>();


}
