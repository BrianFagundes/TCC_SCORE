package com.api.usuario.equipe.evento.Nota;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/usuarios/equipe/evento/notas")
@CrossOrigin(origins = "*")
public class NotaController {

    private final NotaRepository notaRepository;

    @Autowired
    public NotaController(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }    

    // Listar notas por data, idEvento, e idUsuario
    @GetMapping("/listar/{dataHoraEvento}/{idEvento}/{idUsuario}")
    public List<Nota> listarNotas(
    		@PathVariable String dataHoraEvento,
    		@PathVariable Long idEvento,
    		@PathVariable Long idUsuario) {
        return notaRepository.findByNotaIdDataHoraEventoAndNotaIdIdEventoAndNotaIdIdUsuarioOrigem(dataHoraEvento, idEvento, idUsuario);
    }
    
 // Listar notas por data, idEvento, e idUsuario
    @GetMapping("/listar/Destino/{dataHoraEvento}/{idEvento}/{idUsuario}")
    public List<Nota> listarNotasRecebidasEvento(
    		@PathVariable String dataHoraEvento,
    		@PathVariable Long idEvento,
    		@PathVariable Long idUsuario) {
        return notaRepository.findByNotaIdDataHoraEventoAndNotaIdIdEventoAndNotaIdIdUsuarioDestino(dataHoraEvento, idEvento, idUsuario);
    }

    // Atualizar nota
    @PutMapping("/atualizar")
    public Nota atualizarNota(@RequestBody Nota nota) {
        Nota notaAtualizada = notaRepository.save(nota);
        return notaAtualizada;
    }   
 

    // Listar notas por idEvento e idUsuario
    @GetMapping("/listarPorEventoEUsuario/{idEvento}/{idUsuario}")
    public List<Nota> listarNotasPorEventoEUsuario(
    		@PathVariable Long idEvento,
    		@PathVariable Long idUsuario) {
        return notaRepository.findByNotaIdIdEventoAndNotaIdIdUsuarioDestino(idEvento, idUsuario);
    }   
    
 // Listar notas por idEvento e idUsuario
    @GetMapping("/listarPorEventoEUsuarioOrigem/{idEvento}/{idUsuario}")
    public List<Nota> listarNotasPorEventoEUsuarioOrigem(
    		@PathVariable Long idEvento,
    		@PathVariable Long idUsuario) {
        return notaRepository.findByNotaIdIdEventoAndNotaIdIdUsuarioOrigem(idEvento, idUsuario);
    }   
    
}


