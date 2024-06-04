package com.api.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.api.usuario.equipe.EquipeRepository;
import com.api.usuario.equipe.custos.CustoRepository;
import com.api.usuario.equipe.evento.Evento;
import com.api.usuario.equipe.evento.EventoController;
import com.api.usuario.equipe.evento.EventoRepository;
import com.api.usuario.equipe.evento.Nota.NotaRepository;
import com.api.usuario.equipe.evento.Times.TimeRepository;
import com.api.usuario.equipe.participante.ParticipanteRepository;

@Component
@EnableAsync
public class TarefaPeriodica {

    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private EventoController eventocontroller;
    @Autowired
    private ParticipanteRepository participanteRepository;
    @Autowired
    private CustoRepository custorepository;
    @Autowired
    private TimeRepository timerepository;
    @Autowired
    private NotaRepository notaRepository;
    @Autowired
    private EquipeRepository equipeRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmailController emailController;

    @Scheduled(fixedRate = 60000)
    public void executarTarefa() {
        this.InicioEvento();
        this.FimEvento();
        
    }
    
    @Async
    private void InicioEvento() {
    	Map<DayOfWeek, String> diaDaSemanaMap = new HashMap<>();
        diaDaSemanaMap.put(DayOfWeek.MONDAY, "seg");
        diaDaSemanaMap.put(DayOfWeek.TUESDAY, "ter");
        diaDaSemanaMap.put(DayOfWeek.WEDNESDAY, "qua");
        diaDaSemanaMap.put(DayOfWeek.THURSDAY, "qui");
        diaDaSemanaMap.put(DayOfWeek.FRIDAY, "sex");
        diaDaSemanaMap.put(DayOfWeek.SATURDAY, "sab");
        diaDaSemanaMap.put(DayOfWeek.SUNDAY, "dom");
    	
    	ZoneId zonaDeBrasilia = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime agoraEmBrasilia = ZonedDateTime.now(zonaDeBrasilia);
        DateTimeFormatter formatadorData = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter formatadorHoraMinuto = DateTimeFormatter.ofPattern("HH:mm");        
        
        String dataAtual = agoraEmBrasilia.format(formatadorData);
        String HoraAtual = agoraEmBrasilia.format(formatadorHoraMinuto);
        DayOfWeek diaDaSemana = agoraEmBrasilia.getDayOfWeek();
        String abreviaturaAtual = diaDaSemanaMap.get(diaDaSemana);
        
        System.out.println("Dia da semana: " + abreviaturaAtual);
        System.out.println("Levantando os eventos que começam neste minuto em Brasília: " + dataAtual + " " + HoraAtual);
        
        List<Evento> eventos = eventoRepository.findEventosPorDataHora(dataAtual, HoraAtual);
        
        for (Evento evento1 : eventoRepository.findEventosPorDataSemanaHora(abreviaturaAtual, HoraAtual))
        {
        	eventos.add(evento1);
        } 
        
        eventocontroller = new EventoController( eventoRepository, 
				participanteRepository,
				custorepository,
				timerepository,
				notaRepository,
				equipeRepository,
				usuarioRepository,
				emailController
				);  
        
        if (!eventos.isEmpty()) {
        	System.out.println(eventos.getFirst().getDia());
        	for (Evento evento : eventos) {
        		evento.setStatus("I");
        		evento.setDataultimoevento(dataAtual);
        		eventocontroller.alterarStatus(evento);
            }
        	
        }
    }
    
    @Async
    private void FimEvento() {
    	
    	Map<DayOfWeek, String> diaDaSemanaMap = new HashMap<>();
        diaDaSemanaMap.put(DayOfWeek.MONDAY, "seg");
        diaDaSemanaMap.put(DayOfWeek.TUESDAY, "ter");
        diaDaSemanaMap.put(DayOfWeek.WEDNESDAY, "qua");
        diaDaSemanaMap.put(DayOfWeek.THURSDAY, "qui");
        diaDaSemanaMap.put(DayOfWeek.FRIDAY, "sex");
        diaDaSemanaMap.put(DayOfWeek.SATURDAY, "sab");
        diaDaSemanaMap.put(DayOfWeek.SUNDAY, "dom");
    	
    	ZoneId zonaDeBrasilia = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime agoraEmBrasilia = ZonedDateTime.now(zonaDeBrasilia);
        DateTimeFormatter formatadorData = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter formatadorHoraMinuto = DateTimeFormatter.ofPattern("HH:mm");        
        
        String dataAtual = agoraEmBrasilia.format(formatadorData);
        String HoraAtual = agoraEmBrasilia.format(formatadorHoraMinuto);
        DayOfWeek diaDaSemana = agoraEmBrasilia.getDayOfWeek();
        String abreviaturaAtual = diaDaSemanaMap.get(diaDaSemana);
        

        System.out.println("Dia da semana: " + abreviaturaAtual);
        System.out.println("Levantando os eventos que Terminam neste minuto em Brasília: " + dataAtual + " " + HoraAtual);
        
        List<Evento> eventos = eventoRepository.findEventosPorDataHorafim(dataAtual, HoraAtual);
        
        for (Evento evento1 : eventoRepository.findEventosPorDataSemanaHorafim(abreviaturaAtual, HoraAtual))
        {
        	eventos.add(evento1);
        }        
        
        
        eventocontroller = new EventoController( eventoRepository, 
				participanteRepository,
				custorepository,
				timerepository,
				notaRepository,
				equipeRepository,
				usuarioRepository,
				emailController
				);  
        
        if (!eventos.isEmpty()) {
        	System.out.println(eventos.getFirst().getDia());
        	for (Evento evento : eventos) {
        		evento.setStatus("F");
        		evento.setDataultimoevento(dataAtual);
        		eventocontroller.alterarStatus(evento);
            }
        	
        }
    }
       
    
}
