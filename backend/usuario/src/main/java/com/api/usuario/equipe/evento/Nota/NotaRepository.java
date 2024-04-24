package com.api.usuario.equipe.evento.Nota;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface NotaRepository extends JpaRepository<Nota, NotaId> {

    List<Nota> findByNotaIdDataHoraEventoAndNotaIdIdEventoAndNotaIdIdUsuarioOrigem(String dataHoraEvento, Long idEvento, Long idUsuarioOrigem);
    List<Nota> findByNotaIdDataHoraEventoAndNotaIdIdEventoAndNotaIdIdUsuarioDestino(String dataHoraEvento, Long idEvento, Long idUsuarioDestino);
    List<Nota> findByNotaIdIdEventoAndNotaIdIdUsuarioDestino(Long idEvento, Long idUsuarioDestino);
    List<Nota> findByNotaIdIdEventoAndNotaIdIdUsuarioOrigem(Long idEvento, Long idUsuarioOrigem);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Nota n WHERE n.notaId.idEvento = ?1")
    void deleteByEvento(Long idEvento);

}
