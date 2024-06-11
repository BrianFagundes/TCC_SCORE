package com.api.usuario.equipe.evento;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.usuario.equipe.evento.Times.TimeRepository;
import com.api.usuario.equipe.evento.Nota.*;
import com.api.usuario.equipe.participante.*;


import com.api.usuario.equipe.custos.*;
import com.api.usuario.equipe.*;
import com.api.usuario.*;



@RestController
@RequestMapping("/usuarios/equipe/evento")
@CrossOrigin(origins = "*")
public class EventoController {
	
	@Autowired
    private EventoRepository eventoRepository;
	@Autowired
    private CustoRepository custorepository;
	@Autowired
    private TimeRepository timerepository;
	@Autowired
	private NotaRepository notaRepository;
	@Autowired
	private ParticipanteRepository participanteRepository;	
	@Autowired
	private EquipeRepository equipeRepository;	
	@Autowired
	private EmailController emailController;
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	public EventoController(EventoRepository eventoRepository, 
							ParticipanteRepository participanteRepository,
							CustoRepository custorepository,
							TimeRepository timerepository,
							NotaRepository notaRepository,
							EquipeRepository equipeRepository,
							UsuarioRepository usuarioRepository,
							EmailController emailController
							) {
        this.eventoRepository = eventoRepository; 
        this.participanteRepository = participanteRepository;
        this.custorepository = custorepository;
        this.timerepository = timerepository;
        this.notaRepository = notaRepository;
        this.equipeRepository = equipeRepository;
        this.usuarioRepository = usuarioRepository;
        this.emailController = emailController;
        
    }
	
	
	@PostMapping("/criar")
    public int criarUsuario(@RequestBody Evento Evento) {	
		try {
			Evento.setStatus("C");
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
		notaRepository.deleteByEvento(id);
		
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
			Eventoalterar.setStatus("C");
			Eventoalterar.setChavepix(Evento.getChavepix());
			Eventoalterar.setDataultimoevento(null);
			Eventoalterar.setDuracao(Evento.getDuracao());
			
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		    LocalTime hora = LocalTime.parse(Evento.getHora(), formatter);
		    LocalTime Tempoduracao = LocalTime.parse(Evento.getDuracao(), formatter);
		    Duration duracao = Duration.ofHours(Tempoduracao.getHour()).plusMinutes(Tempoduracao.getMinute());
		    String horafim = hora.plus(duracao).toString();
		    
		    Eventoalterar.setHorafim(horafim);
		    
			
			eventoRepository.save(Eventoalterar);
			return 0;
		}catch (Exception e) {
            return 1;
        }
		
    }
	
	@PutMapping("/Alterar/Status")
	public int alterarStatus(@RequestBody Evento Evento) {
		System.out.println(Evento.getDia() + "testetestetse");
		System.out.println(Evento.getid());
		System.out.println(Evento.getStatus());
		System.out.println(Evento.getDataultimoevento());
		
		try {
			System.out.println("0");
			Evento Eventoalterar = eventoRepository.findById(Evento.getid()).orElse(null);
			System.out.println("1");
			Eventoalterar.setStatus(Evento.getStatus());
			System.out.println("2");
			Eventoalterar.setDataultimoevento(Evento.getDataultimoevento());
			System.out.println("3");
			System.out.println(Evento.getStatus());
			if (Evento.getStatus().equals("F")) {
				Equipe equipe = equipeRepository.findById(Evento.getEquipe()).orElse(null);
				equipe.setStatuseventos("F");
				equipeRepository.save(equipe);
				List<Participante> participantes = participanteRepository.findByEquipe(Eventoalterar.getEquipe());
				for (int i = 0; i < participantes.size(); i++) {
					boolean isValid = custorepository.existsByEventoAndUsuarioAndCusto(Eventoalterar.getid(),
							participantes.get(i).getUsuario(), true);
					if (isValid) {
						for (int j = 0; j < participantes.size(); j++) {
							if (i != j) {
								
								boolean isValid2 = custorepository.existsByEventoAndUsuarioAndCusto(Eventoalterar.getid(),
										participantes.get(j).getUsuario(), true);
								if (isValid2) {
									NotaId notaid = new NotaId();
									notaid.setDataHoraEvento(Eventoalterar.getDataultimoevento());
									notaid.setIdEvento(Eventoalterar.getid());
									notaid.setidUsuarioOrigem(participantes.get(i).getUsuario());
									notaid.setidUsuarioDestino(participantes.get(j).getUsuario());
									Nota nota = new Nota();
									nota.setNotaId(notaid);
									nota.setNotaparam1(6);
									nota.setNotaparam2(6);
									nota.setNotaparam3(6);
									nota.setNotaparam4(6);
									nota.setNotaparam5(6);
									nota.setNotaparam6(6);
									nota.setNotaparam7(6);
									nota.setNotaparam8(6);
									nota.setNotaparam9(6);
									nota.setNotaparam10(6);
									nota.setNotaparam11(6);
									nota.setNotaparam12(6);
									nota.setNotaparam13(6);
									nota.setNotaparam14(6);
									nota.setNotaparam15(6);
									nota.setNotaparam16(6);
									nota.setNotaparam17(6);
									nota.setNotaparam18(6);
									nota.setNotaparam19(6);
									nota.setNotaparam20(6);
									notaRepository.save(nota);
									
									
								}
							}
						}
					}
				}
				custorepository.updateCustoToFalseByEvento(Eventoalterar.getid());
				eventoRepository.save(Eventoalterar);
			}
			else {
				System.out.println(Evento.getStatus());
				List<Participante> participantes = participanteRepository.findByEquipe(Eventoalterar.getEquipe());
				for (int i = 0; i < participantes.size(); i++) {
					if(custorepository.countByEventoAndCusto(Eventoalterar.getid(), true) > 1) {
						boolean isValid = custorepository.existsByEventoAndUsuarioAndCusto(Eventoalterar.getid(),
								participantes.get(i).getUsuario(), true);
						if (isValid) {
							System.out.println(participantes.get(i).getUsuario());
							Usuario usuario = usuarioRepository.findById(participantes.get(i).getUsuario()).orElse(null);
							emailController.enviarEmail2(usuario.getEmail(), "Dados do Evento: " + Eventoalterar.getNome(), "O Evento " + Eventoalterar.getNome() + " foi iniciado, favor consultar os dados do Evento em sua tela de acesso!");
						}
					}
				}	
				if(custorepository.countByEventoAndCusto(Eventoalterar.getid(), true) > 1)
					eventoRepository.save(Eventoalterar);
			}
			
			
			
			return 0;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return 1;
		}

	}
	
	
}