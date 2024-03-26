package com.api.usuario.equipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface EquipeRepository extends JpaRepository<Equipe, Long> {
	
	List<Equipe> findByModerador(Long moderador);
}
