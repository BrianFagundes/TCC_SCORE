package com.api.usuario.equipe.evento.Times;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface TimeRepository extends JpaRepository<Time, TimeId>  {
	
	List<Time> findByEvento(Long Evento);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM Time p WHERE p.evento = ?1")
	void deleteByEvento(Long evento);
	
}
