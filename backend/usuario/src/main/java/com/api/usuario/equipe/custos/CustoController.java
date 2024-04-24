package com.api.usuario.equipe.custos;

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
@RequestMapping("/usuarios/equipe/evento/custo")
@CrossOrigin(origins = "*")
public class CustoController {
	@Autowired
    private CustoRepository custorepository;
	
	@PostMapping("/criar/{pos}")
    public int criarUsuario(@RequestBody Custo Custo,@PathVariable int pos) {	
		try {
			System.out.println("Antes do erro");
			System.out.println(Custo.getEvento());
			System.out.println(Custo.getCusto());
			System.out.println(Custo.getUsuario());
			
			if(pos ==0)
				custorepository.deleteByEvento(Custo.getEvento());		
			
			
			custorepository.save(Custo);
			
			return 0;
		}catch (Exception e) {
            return 1;
        }
		
    }
	
	@GetMapping("/obter/custos/{id}")
    public List<Custo> obterEventoporEquipe(@PathVariable Long id) {   	
		List<Custo> Custos = custorepository.findByEvento(id);  
        return Custos;
    }
}
