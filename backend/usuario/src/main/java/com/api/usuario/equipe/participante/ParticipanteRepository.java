package com.api.usuario.equipe.participante;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

public interface ParticipanteRepository extends JpaRepository<Participante, Long> {
    List<Participante> findByEquipe(Long equipe);
    List<Participante> findByUsuario(Long usuario);
    
    
    
    @Query("SELECT p FROM Participante p WHERE p.equipe = ?1 AND p.usuario = ?2")
    Optional<Participante> findByEquipeAndUsuario(Long equipe, Long usuario);

    @Modifying
    @Transactional
    @Query("DELETE FROM Participante p WHERE p.equipe = ?1 AND p.usuario = ?2")
    void deleteByEquipeAndUsuario(Long equipe, Long usuario);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Participante p WHERE p.usuario = ?1")
    void deleteByUsuario(Long usuario);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Participante p WHERE p.equipe = ?1")
    void deleteByEquipe(Long equipe);
    
    @Query(value = "SELECT p.equipe FROM Participante p " +
            "GROUP BY p.equipe " +
            "HAVING SUM(CASE WHEN p.usuario = ?1 AND p.moderador = 1 THEN 1 ELSE 0 END) > 0 " +
            "AND SUM(CASE WHEN p.usuario != ?1 AND p.moderador = 1 THEN 1 ELSE 0 END) = 0",
            nativeQuery = true)
    List<Long> findEquipesWithUserAsOnlyModerator(Long usuarioId);
}

