package com.api.usuario.equipe.participante;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/usuarios/Equipe/Participantes")
@CrossOrigin(origins = "*")
public class ParticipanteController {
	@Autowired
    private ParticipanteRepository participanterepository;

	@PostMapping("/criar/{posparticipante}")
    public int criarUsuario(@RequestBody Participante participante,@PathVariable int posparticipante) {	
		try {
			if(posparticipante ==0)
				participanterepository.deleteByEquipe(participante.getEquipe());	
			
	        participanterepository.save(participante);
	        return 0;
	    } catch (Exception e) {
	        return 1;
	    }
		
    }
	
	@GetMapping("/obter/{id}")
    public List<Participante> obterParticipantes(@PathVariable Long id) {
		List<Participante> participantes = participanterepository.findByEquipe(id); 
		System.out.println(participantes.get(0).getModerador());
        return participantes;
    }
	
	@DeleteMapping("/deletar/{equipe}/{usuario}")
    public int deletarUsuario(@PathVariable Long equipe, @PathVariable Long usuario) {
		try
		{
			participanterepository.deleteByEquipeAndUsuario(equipe, usuario);
			return 0;
		} catch (Exception e) {
	        return 1;
	    }
    }

    
    @GetMapping("/obter/Equipes/participantes/{id}")
    public List<Long> LevantarEquipeporparticipante(@PathVariable Long id) {
    	return participanterepository.findEquipesWithUserAsOnlyModerator(id);
    	
    }
}
