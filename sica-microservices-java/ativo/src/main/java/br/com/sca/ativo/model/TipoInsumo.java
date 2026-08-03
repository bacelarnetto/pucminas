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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class TipoInsumo implements AbstractEntity{	

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private Long id;
	
	private String nome;
	
	@JsonIgnore
	@OneToMany(mappedBy="tipo")
	private List<Insumo> insumos= new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy="tipoInsumo")
	private List<Item> itens= new ArrayList<>();

	public TipoInsumo(String nome) {
		super();
		this.nome = nome;
	}
	
	
	
}
