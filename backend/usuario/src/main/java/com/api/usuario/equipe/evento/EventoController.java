package com.api.usuario.equipe.evento;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.usuario.equipe.custos.CustoRepository;
import com.api.usuario.equipe.evento.Times.TimeRepository;


@RestController
@RequestMapping("/usuarios/equipe/evento")
@CrossOrigin(origins = "http://localhost:4200")
public class EventoController {
	
	@Autowired
    private EventoRepository eventoRepository;
	@Autowired
    private CustoRepository custorepository;
	@Autowired
    private TimeRepository timerepository;
	
	
	@PostMapping("/criar")
    public int criarUsuario(@RequestBody Evento Evento) {	
		try {
			eventoRepository.save(Evento);
			
			return 0;
		}catch (Exception e) {
            return 1;
        }
		
    } 
	
	@DeleteMapping("/deletar/{id}")
    public void deletarUsuario(@PathVariable Long id) {
		eventoRepository.deleteById(id);
		custorepository.deleteByEvento(id);
		timerepository.deleteByEvento(id);
		
    }
	
	@GetMapping("/obter/Evento/{id}")
    public Evento obterEvento(@PathVariable Long id) {   	
		Evento Evento = eventoRepository.findById(id).orElse(null);  
        return Evento;
    }
	
	@GetMapping("/obter/Evento/Equipe/{id}")
    public List<Evento> obterEventoporEquipe(@PathVariable Long id) {   	
		List<Evento> Evento = eventoRepository.findByEquipe(id);  
        return Evento;
    }
	
	
	
	@PutMapping("/Alterar")
    public int alterarUsuario(@RequestBody Evento Evento) {
		try {			
			Evento Eventoalterar = eventoRepository.findById(Evento.getid()).orElse(null);
			Eventoalterar.setDia(Evento.getDia());
			Eventoalterar.setEquipe(Evento.getEquipe());
			Eventoalterar.setHora(Evento.getHora());
			Eventoalterar.setLocal(Evento.getLocal());
			Eventoalterar.setNome(Evento.getNome());
			Eventoalterar.setPeridiocidade(Evento.getPeridiocidade());
			Eventoalterar.setQuantidade_time(Evento.getQuantidade_time());						
			
			eventoRepository.save(Eventoalterar);
			return 0;
		}catch (Exception e) {
            return 1;
        }
		
    }
	
	
}