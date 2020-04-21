package br.com.sca.monitoramento.dto;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import br.com.sca.monitoramento.validation.MoradorInsertValidation;

@MoradorInsertValidation
public class MoradorNewDTO implements Serializable {

	private static final long serialVersionUID = 1L;

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
	private String senha;

	public MoradorNewDTO() {
	}

	public MoradorNewDTO(String nome, 
			String email, 
			Integer idade, 
		    String telefone,   
		    String endereco,    
		    String numero,
			String bairro,
			String cidade,
			String uf, 
			Long idBarragem, 
			String cep) {
		super();
		this.nome = nome;
		this.email = email;
		this.idade = idade;
		this.telefone = telefone;   
		this.endereco = endereco;    
		this.numero = numero;
		this.bairro = bairro;
		this.cep = cep;
		this.cidade = cidade;
		this.uf = uf;
		this.idBarragem = idBarragem;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getIdade() {
		return idade;
	}

	public void setIdade(Integer idade) {
		this.idade = idade;
	}


	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public Long getIdBarragem() {
		return idBarragem;
	}

	public void setIdBarragem(Long idBarragem) {
		this.idBarragem = idBarragem;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	
	
	

}