package com.api.usuario.equipe;

import java.util.List;
import java.util.ArrayList;

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


import com.api.usuario.equipe.participante.Participante;
import com.api.usuario.equipe.participante.ParticipanteRepository;




@RestController
@RequestMapping("/usuarios/Equipe")
@CrossOrigin(origins = "http://localhost:4200")
public class EquipeController {
	
	@Autowired
    private EquipeRepository equipeRepository;
	
	@Autowired
    private ParticipanteRepository participanteRepository;
	
	@PostMapping("/criar")
    public int criarUsuario(@RequestBody Equipe equipe) {	
		try {
			equipeRepository.save(equipe);
			Participante participante = new Participante();
			participante.setEquipe(equipe.getid());
			participante.setUsuario(equipe.getModerador());
			participante.setModerador(true);
			participanteRepository.save(participante);
			return 0;
		}catch (Exception e) {
            return 1;
        }
		
    } 
	
	@DeleteMapping("/deletar/{id}")
    public void deletarUsuario(@PathVariable Long id) {
		equipeRepository.deleteById(id);
		participanteRepository.deleteByEquipe(id);
    }
	
	@GetMapping("/obter/{id}")
    public List<Equipe> obterEquipes(@PathVariable Long id) {
		
		List<Participante> participantes =  participanteRepository.findByUsuario(id);	

		 List<Equipe> equipes = new ArrayList<>();
		 
		 for (Participante participante : participantes) { 
			 if(participante.getModerador())
				 equipes.add(equipeRepository.findById(participante.getEquipe()).orElse(null));
         }
		 
        return equipes;
    }
	
	
	@GetMapping("/obter/equipe/{id}")
    public Equipe obterEquipe(@PathVariable Long id) {   	
		Equipe equipe = equipeRepository.findById(id).orElse(null);  
        return equipe;
    }
	
	@PutMapping("/Carrega/Logo/{id}")
    public int atualizarUsuario(@PathVariable Long id, @RequestBody String Foto) {
		try {
		Equipe equipe = equipeRepository.findById(id).orElse(null);
        equipe.setfoto(Foto);
        equipeRepository.save(equipe);
        return 0;
		}catch (Exception e) {
            return 1;
        }
        
     }
	
	@PutMapping("/Alterar")
    public int alterarUsuario(@RequestBody Equipe equipe) {
		try {			
			Equipe equipealterar = equipeRepository.findById(equipe.getid()).orElse(null);
			equipealterar.setfoto(equipe.getfoto());
			equipealterar.setInformacoes(equipe.getInformacoes());
			equipealterar.setModerador(equipe.getModerador());
			equipealterar.setNome(equipe.getNome());
			equipealterar.setNomeparametro1(equipe.getNomeparametro1());
			equipealterar.setNomeparametro2(equipe.getNomeparametro2());
			equipealterar.setNomeparametro3(equipe.getNomeparametro3());
			equipealterar.setNomeparametro4(equipe.getNomeparametro4());
			equipealterar.setNomeparametro5(equipe.getNomeparametro5());
			equipealterar.setNomeparametro6(equipe.getNomeparametro6());
			equipealterar.setNomeparametro7(equipe.getNomeparametro7());
			equipealterar.setNomeparametro8(equipe.getNomeparametro8());
			equipealterar.setNomeparametro9(equipe.getNomeparametro9());
			equipealterar.setNomeparametro10(equipe.getNomeparametro10());
			equipealterar.setNomeparametro11(equipe.getNomeparametro11());
			equipealterar.setNomeparametro12(equipe.getNomeparametro12());
			equipealterar.setNomeparametro13(equipe.getNomeparametro13());
			equipealterar.setNomeparametro14(equipe.getNomeparametro14());
			equipealterar.setNomeparametro15(equipe.getNomeparametro15());
			equipealterar.setNomeparametro16(equipe.getNomeparametro16());
			equipealterar.setNomeparametro17(equipe.getNomeparametro17());
			equipealterar.setNomeparametro18(equipe.getNomeparametro18());
			equipealterar.setNomeparametro19(equipe.getNomeparametro19());
			equipealterar.setNomeparametro20(equipe.getNomeparametro20());
			equipealterar.setSigla(equipe.getSigla());			
			
			equipeRepository.save(equipealterar);
			return 0;
		}catch (Exception e) {
            return 1;
        }
		
    }
	
	
}
