package com.api.usuario.equipe;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Equipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    @Lob
    private String foto;
    private String sigla;
    private String informacoes;
    private String nomeparametro1;
    private String nomeparametro2;
    private String nomeparametro3;
    private String nomeparametro4;
    private String nomeparametro5;
    private String nomeparametro6;
    private String nomeparametro7;
    private String nomeparametro8;
    private String nomeparametro9;
    private String nomeparametro10;
    private String nomeparametro11;
    private String nomeparametro12;
    private String nomeparametro13;
    private String nomeparametro14;
    private String nomeparametro15;
    private String nomeparametro16;
    private String nomeparametro17;
    private String nomeparametro18;
    private String nomeparametro19;
    private String nomeparametro20;
    private Long moderador;
    private String statuseventos;
    
    
	
    
    public Long getid() {
		return id;
	}	
    public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getfoto ()
    {
    	return foto;
    }
	public void setfoto(String pfoto)
    {
    	foto = pfoto;
    }
	public String getSigla() {
		return sigla;
	}
	public void setSigla(String sigla) {
		this.sigla = sigla;
	}
	public String getInformacoes() {
		return informacoes;
	}
	public void setInformacoes(String informacoes) {
		this.informacoes = informacoes;
	}
	public String getNomeparametro1() {
		return nomeparametro1;
	}
	public void setNomeparametro1(String nomeparametro1) {
		this.nomeparametro1 = nomeparametro1;
	}
	
	
	public String getNomeparametro2() {
		return nomeparametro2;
	}
	public void setNomeparametro2(String nomeparametro2) {
		this.nomeparametro2 = nomeparametro2;
	}
	public String getNomeparametro3() {
		return nomeparametro3;
	}
	public void setNomeparametro3(String nomeparametro3) {
		this.nomeparametro3 = nomeparametro3;
	}
	public String getNomeparametro4() {
		return nomeparametro4;
	}
	public void setNomeparametro4(String nomeparametro4) {
		this.nomeparametro4 = nomeparametro4;
	}
	public String getNomeparametro5() {
		return nomeparametro5;
	}
	public void setNomeparametro5(String nomeparametro5) {
		this.nomeparametro5 = nomeparametro5;
	}
	public String getNomeparametro6() {
		return nomeparametro6;
	}
	public void setNomeparametro6(String nomeparametro6) {
		this.nomeparametro6 = nomeparametro6;
	}
	public String getNomeparametro7() {
		return nomeparametro7;
	}
	public void setNomeparametro7(String nomeparametro7) {
		this.nomeparametro7 = nomeparametro7;
	}
	public String getNomeparametro8() {
		return nomeparametro8;
	}
	public void setNomeparametro8(String nomeparametro8) {
		this.nomeparametro8 = nomeparametro8;
	}
	public String getNomeparametro9() {
		return nomeparametro9;
	}
	public void setNomeparametro9(String nomeparametro9) {
		this.nomeparametro9 = nomeparametro9;
	}
	public String getNomeparametro10() {
		return nomeparametro10;
	}
	public void setNomeparametro10(String nomeparametro10) {
		this.nomeparametro10 = nomeparametro10;
	}
	public String getNomeparametro11() {
		return nomeparametro11;
	}
	public void setNomeparametro11(String nomeparametro11) {
		this.nomeparametro11 = nomeparametro11;
	}
	public String getNomeparametro12() {
		return nomeparametro12;
	}
	public void setNomeparametro12(String nomeparametro12) {
		this.nomeparametro12 = nomeparametro12;
	}
	public String getNomeparametro13() {
		return nomeparametro13;
	}
	public void setNomeparametro13(String nomeparametro13) {
		this.nomeparametro13 = nomeparametro13;
	}
	public String getNomeparametro14() {
		return nomeparametro14;
	}
	public void setNomeparametro14(String nomeparametro14) {
		this.nomeparametro14 = nomeparametro14;
	}
	public String getNomeparametro15() {
		return nomeparametro15;
	}
	public void setNomeparametro15(String nomeparametro15) {
		this.nomeparametro15 = nomeparametro15;
	}
	public String getNomeparametro16() {
		return nomeparametro16;
	}
	public void setNomeparametro16(String nomeparametro16) {
		this.nomeparametro16 = nomeparametro16;
	}
	public String getNomeparametro17() {
		return nomeparametro17;
	}
	public void setNomeparametro17(String nomeparametro17) {
		this.nomeparametro17 = nomeparametro17;
	}
	public String getNomeparametro18() {
		return nomeparametro18;
	}
	public void setNomeparametro18(String nomeparametro18) {
		this.nomeparametro18 = nomeparametro18;
	}
	public String getNomeparametro19() {
		return nomeparametro19;
	}
	public void setNomeparametro19(String nomeparametro19) {
		this.nomeparametro19 = nomeparametro19;
	}
	public String getNomeparametro20() {
		return nomeparametro20;
	}
	public void setNomeparametro20(String nomeparametro20) {
		this.nomeparametro20 = nomeparametro20;
	}
	public Long getModerador() {
		return moderador;
	}
	public void setModerador(Long moderador) {
		this.moderador = moderador;
	}
	public String getStatuseventos() {
		return statuseventos;
	}
	public void setStatuseventos(String statuseventos) {
		this.statuseventos = statuseventos;
	}
	
}
