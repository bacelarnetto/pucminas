package br.com.sca.barragem.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import br.com.sca.barragem.model.Morador;
import br.com.sca.barragem.validation.MoradorUpdateValidation;
import br.com.sca.commons.lib.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@MoradorUpdateValidation
public class MoradorDTO implements AbstractEntity {

	private static final long serialVersionUID = 1L;

	private Long id;

	@NotEmpty(message = "Preenchimento obrigatório")
	@Size(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 120 caracteres")
	private String nome;

	@NotEmpty(message = "Preenchimento obrigatório")
	@Email(message = "Email inválido")
	private String email;

	private Integer idade;
	private String telefone;    
    private String endereco;    
    private String numero;    
    private String bairro;
	private String cidade;	
	private String uf;
	private Long idBarragem;
	private String cep;


	public MoradorDTO(Morador obj) {
		this.id = obj.getId();
		this.nome = obj.getNome();
		this.email = obj.getEmail();
		this.idade = obj.getIdade();
		this.telefone = obj.getTelefone();    
		this.endereco= obj.getEndereco();    
		this.numero= obj.getNumero();    
		this.bairro= obj.getBairro();
		this.cidade = obj.getCidade();
		this.uf = obj.getUf();
		this.idBarragem = obj.getBarragem().getId();
		this.cep = obj.getCep();
	}

	public Long getId() {
		return id;
	}

	

}
