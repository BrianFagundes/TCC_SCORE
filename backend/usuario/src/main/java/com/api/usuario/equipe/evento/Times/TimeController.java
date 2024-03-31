package com.api.usuario.equipe.evento.Times;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/usuarios/equipe/evento/time")
@CrossOrigin(origins = "http://localhost:4200")
public class TimeController {

	@Autowired
    private TimeRepository timerepository;
	
	@PostMapping("/criar/{pos}")
    public int criarUsuario(@RequestBody Time Time,@PathVariable int pos) {	
		try {
			if(pos ==0)
				timerepository.deleteByEvento(Time.getEvento());			
			
			timerepository.save(Time);
			
			return 0;
		}catch (Exception e) {
            return 1;
        }
		
    }
	
	@GetMapping("/obter/times/{id}")
    public List<Time> obterEventoporEquipe(@PathVariable Long id) {   	
		List<Time> Times = timerepository.findByEvento(id);  
        return Times;
    }
	
}
