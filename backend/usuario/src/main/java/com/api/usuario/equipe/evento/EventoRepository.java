package com.api.usuario.equipe.evento;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;



public interface EventoRepository extends JpaRepository<Evento, Long> {
	
	List<Evento> findByEquipe(Long equipe);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM Evento p WHERE p.equipe = ?1")
	void deleteByEquipe(Long equipe);
	
}