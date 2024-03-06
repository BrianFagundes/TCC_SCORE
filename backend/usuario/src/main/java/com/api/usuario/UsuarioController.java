package com.api.usuario;

import com.api.usuario.Usuario;
import com.api.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.persistence.Convert;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public int criarUsuario(@RequestBody Usuario usuario) {
    	List<Usuario> usuarios = usuarioRepository.findByEmail(usuario.getEmail());      
    	if (usuarios != null && !usuarios.isEmpty()) {
    		return 1;
    	}
    	else
    	{    		
    		usuarioRepository.save(usuario);
    		return 0;
    	} 
    } 
    
    @PostMapping("/Automatico")
    public Long criarUsuarioAutomatico(@RequestBody Usuario usuario) {
    	List<Usuario> usuarios = usuarioRepository.findByEmail(usuario.getEmail());  
    	int valida = 0;
    	Long Saida = (long) valida;
    	
    	if (usuarios != null && !usuarios.isEmpty()) {
    		valida = 1;
    	}
        if(valida==0)	
		{
			usuarioRepository.save(usuario);
			usuarios = usuarioRepository.findByEmail(usuario.getEmail());
		} 	        
        
        if (usuarios != null) {
    		for (Usuario usuario_aux : usuarios) {    			
				if (usuario_aux.getEmail().equals(usuario.getEmail()) && (usuario_aux.getsenha().equals("")))
					Saida = usuario_aux.getId();				
			}
    	}
    	
        return Saida;       
        
    }
    
    @PostMapping("/Imagem")
    public Long uploadImagem(@RequestBody String imagem, @RequestBody Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setfoto(imagem); // Presumindo que setFoto é o método para definir a imagem em base64
            usuarioRepository.save(usuario);
            return id;
        }
        return null; // Ou outra forma de erro
    }
    
    
    
    @GetMapping("/Nome/Levanta/{id}")
    public String obterNomeUsuario(@PathVariable Long id) {
    	
    	Usuario usuario = usuarioRepository.findById(id).orElse(null);        	
		
    	return usuario.getNome();
    }
    
    @GetMapping("/Foto/Levanta/{id}")
    public String obterFotoUsuario(@PathVariable Long id) {
    	
    	Usuario usuario = usuarioRepository.findById(id).orElse(null);        	
		
    	return usuario.getfoto();
    }
    
    
    
    
    @GetMapping("/{id}")
    public Usuario obterUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
    
    
    @GetMapping("/{email}/{senha}")
    public Long obterUsuario(@PathVariable String email, @PathVariable String senha) {
    	
    	int intValue = 0;
    	Long Saida = (long) intValue;    	 
    	
    	List<Usuario> usuarios = usuarioRepository.findByEmail(email);
    	
    	if (usuarios != null) {
    		for (Usuario usuario : usuarios) {    			
				if (usuario.getsenha().equals(senha))
					Saida = usuario.getId();
			}
    	}
    	
        return Saida;
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id).orElse(null);
        
        if (usuarioExistente != null) {
            // Atualize os campos necessários
            usuarioExistente.setNome(usuarioAtualizado.getNome());
            usuarioExistente.setEmail(usuarioAtualizado.getEmail());
            usuarioExistente.setfoto(usuarioAtualizado.getfoto());
            if(!usuarioExistente.getsenha().equals("")) {
        		// Atualize os campos necessários
                usuarioExistente.setsenha(usuarioAtualizado.getsenha());
        	}      
            // ...

            return usuarioRepository.save(usuarioExistente);
        }

        return null;
    }
    
    @PutMapping("AlterarSenha/{id}")
    public Usuario atualizarSenha(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id).orElse(null);
        
        if (usuarioExistente != null) {
        	if(!usuarioExistente.getsenha().equals("")) {
        		// Atualize os campos necessários
                usuarioExistente.setsenha(usuarioAtualizado.getsenha());
        	}           
            return usuarioRepository.save(usuarioExistente);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }
    
    public String RetornoSenha(String email)
    {
    	List<Usuario> usuarios = usuarioRepository.findByEmail(email);      
        if (usuarios != null) {
            for (Usuario usuario : usuarios) {                
            	return usuario.getsenha();                    
            }
        }
        return "";
    }
    
    public boolean NaoExisteEmail(String email)
    {
    	List<Usuario> usuarios = usuarioRepository.findByEmail(email);      
    	if (usuarios != null && !usuarios.isEmpty()) {
    	    return false; // Se a lista não está vazia, significa que o usuário existe
    	}
    	return true; // Se a lista está vazia (ou nula), significa que o usuário não existe
    }
}