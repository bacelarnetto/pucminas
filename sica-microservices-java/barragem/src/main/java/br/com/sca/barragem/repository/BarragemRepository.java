package br.com.sca.barragem.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import br.com.sca.barragem.dto.BarragemMoradorDTO;
import br.com.sca.barragem.model.Barragem;

/**
 * @author Jose Ribamar
 */
public interface BarragemRepository extends PagingAndSortingRepository<Barragem, Long> {
	
	@Query(value = "SELECT b FROM Barragem b WHERE b.status = '1' ")
	Page<Barragem> findListBarragem(Pageable pageable);
	
	@Query(value = "SELECT b FROM Barragem b WHERE b.status = '1' AND lower(b.descricao) like lower(concat('%', :descricao,'%'))")
	Page<Barragem> findListBarragemByNome(@Param("descricao")String descricao, Pageable pageable);
	
	@Query(value = "SELECT b FROM Barragem b WHERE b.status = '1' ")
	public List<Barragem> findListAll();
	
	long count();
	
	@Query(" SELECT count(*) FROM Barragem b WHERE b.codigoCategoriaRisco= '3' ")
	public long countBarragemAlerta();

	@Query(value = " SELECT " + 
					"	b.id AS idBarragem, " + 
					"	b.descricao AS nomeBarragem, " + 
					"   b.codigo_dano_potencial AS codigoDanoPotencial, " + 
					"	COUNT(b.id) AS totalMorador " + 
					" FROM  " + 
					"	barragem b INNER JOIN " + 
					"	morador m ON b.id = m.id_barragem " + 
					" GROUP BY b.id  ORDER BY totalMorador DESC LIMIT 100 ", 
			  nativeQuery = true)
	public List<BarragemMoradorDTO> findResumoBarragemList();
	
	@Query(value = " SELECT  " + 
						"  b.id AS idBarragem, " + 
						"  b.descricao AS nomeBarragem, " + 
						"  b.codigo_dano_potencial AS codigoDanoPotencial, " + 
						"  COUNT(b.id) AS totalMorador " + 
					" FROM   " + 
						"  barragem b    " + 
					" INNER JOIN   " + 
						"  morador m ON b.id = m.id_barragem     " + 
					" WHERE b.codigo_categoria_risco = 3   " + 
			" GROUP BY  b.id  ORDER BY  totalMorador DESC LIMIT 30 ", 
			nativeQuery = true)
	public List<BarragemMoradorDTO> findResumoBarragemRiscoAltoList();

}