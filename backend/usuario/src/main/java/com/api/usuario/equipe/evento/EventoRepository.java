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
	
	@Query("SELECT e FROM Evento e WHERE e.dia = ?1 and e.hora =?2 and e.status <> 'I' ")
    List<Evento> findEventosPorDataHora(String data, String hora);
	
	@Query("SELECT e FROM Evento e WHERE e.dia LIKE %?1% and e.hora =?2 and e.status <> 'I' ")
	List<Evento> findEventosPorDataSemanaHora(String data, String hora);
	
	@Query("SELECT e FROM Evento e WHERE e.dia = ?1 and e.horafim =?2 and e.status <> 'F' ")
    List<Evento> findEventosPorDataHorafim(String data, String horafim);
	
	@Query("SELECT e FROM Evento e WHERE e.dia LIKE %?1% and e.horafim =?2 and e.status <> 'F' ")
	List<Evento> findEventosPorDataSemanaHorafim(String data, String hora);
}