package com.api.usuario.equipe.custos;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;


@Entity
@IdClass(CustoId.class)
public class Custo {

	@Id
    private Long evento;
	@Id
    private Long usuario;
	
    private Boolean custo;

	public Long getEvento() {
		return evento;
	}

	public void setEvento(Long evento) {
		this.evento = evento;
	}

	public Long getUsuario() {
		return usuario;
	}

	public void setUsuario(Long usuario) {
		this.usuario = usuario;
	}

	public Boolean getCusto() {
		return custo;
	}

	public void setCusto(Boolean custo) {
		this.custo = custo;
	}
}

