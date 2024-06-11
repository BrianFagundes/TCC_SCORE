package com.api.usuario.equipe.custos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface CustoRepository extends JpaRepository<Custo, CustoId>  {
	
	List<Custo> findByEvento(Long Evento);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM Custo p WHERE p.evento = ?1")
	void deleteByEvento(Long evento);
	
	boolean existsByEventoAndUsuarioAndCusto(Long evento, Long usuario, Boolean custo);
	
	@Modifying
	@Transactional
	@Query("UPDATE Custo c SET c.custo = false WHERE c.evento = ?1")
	void updateCustoToFalseByEvento(Long evento);

	
	long countByEventoAndCusto(Long evento, Boolean custo);

	
}