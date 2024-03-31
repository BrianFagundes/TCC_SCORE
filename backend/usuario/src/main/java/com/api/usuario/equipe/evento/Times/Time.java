package com.api.usuario.equipe.evento.Times;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;


@Entity
@IdClass(TimeId.class)
public class Time {

	@Id
    private Long evento;

	@Id
    private Integer numerotime;

	@Id
    private Long usuario;


	public Long getEvento() {
		return evento;
	}


	public void setEvento(Long evento) {
		this.evento = evento;
	}


	public Integer getNumerotime() {
		return numerotime;
	}


	public void setNumerotime(Integer numerotime) {
		this.numerotime = numerotime;
	}


	public Long getUsuario() {
		return usuario;
	}


	public void setUsuario(Long usuario) {
		this.usuario = usuario;
	}
    
   
    
    
}
