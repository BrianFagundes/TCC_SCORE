package com.api.usuario.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Modelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String esporte;
    private String parametro;
    private int peso;

    // Construtor
    public Modelo() {
    }

    public Modelo(String esporte, String parametro, int peso) {
        this.setEsporte(esporte);
        this.setParametro(parametro);
        this.setPeso(peso);
    }

	public String getEsporte() {
		return esporte;
	}

	public void setEsporte(String esporte) {
		this.esporte = esporte;
	}

	public String getParametro() {
		return parametro;
	}

	public void setParametro(String parametro) {
		this.parametro = parametro;
	}

	public int getPeso() {
		return peso;
	}

	public void setPeso(int peso) {
		this.peso = peso;
	}

    // Getters e setters
}


