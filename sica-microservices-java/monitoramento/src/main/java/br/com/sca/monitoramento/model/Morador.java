package br.com.sca.monitoramento.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import br.com.sca.commons.lib.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Morador implements AbstractEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
	private String nome;

	@Column(unique = true)
	private String email;
	private Integer idade;
    private String telefone;    
    private String endereco;    
    private String numero;    
    private String bairro;
	private String cidade;	
	private String uf;
	private String cep;
	
	@ManyToOne
	@JoinColumn(name = "id_barragem")
	private Barragem barragem;
	
	@Override
	public Long getId() {
		return id;
	}
}
