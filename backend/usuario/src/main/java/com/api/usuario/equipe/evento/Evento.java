package com.api.usuario.equipe.evento;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Evento {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private Long equipe;
	
	private String nome;
	
	private String local;
	
	private String peridiocidade;
	
	private String dia;
	
	private String hora;
	
	private int quantidade_time;
	
	public Long getid() {
		return id;
	}

	public Long getEquipe() {
		return equipe;
	}

	public void setEquipe(Long equipe) {
		this.equipe = equipe;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public String getPeridiocidade() {
		return peridiocidade;
	}

	public void setPeridiocidade(String peridiocidade) {
		this.peridiocidade = peridiocidade;
	}

	public String getDia() {
		return dia;
	}

	public void setDia(String dia) {
		this.dia = dia;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public int getQuantidade_time() {
		return quantidade_time;
	}

	public void setQuantidade_time(int quantidade_time) {
		this.quantidade_time = quantidade_time;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
}
