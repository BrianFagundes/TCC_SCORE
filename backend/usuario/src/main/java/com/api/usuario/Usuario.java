package com.api.usuario;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Adicione os campos da sua tabela "usuario"
    private String nome;
    private String email;
    private String senha;
    private String identificador;
    private String foto;
    // ...
    
    public Long getId()
    {
    	return id;
    }
    
    // Adicione getters e setters conforme necessário
    public String getNome ()
    {
    	return nome;
    }
    
    public String getsenha ()
    {
    	return senha;
    }
    
    public String getEmail ()
    {
    	return email;
    }
    
    public String getIdentificador ()
    {
    	return identificador;
    }
    
    public String getfoto ()
    {
    	return foto;
    }
    
    
    public void setNome(String pNome)
    {
    	nome = pNome;
    }
    
    public void setEmail(String pEmail)
    {
    	email = pEmail;
    }
    
    public void setsenha(String psenha)
    {
    	senha = psenha;
    }
    
    public void setidentificador(String pidentificador)
    {
    	identificador = pidentificador;
    }
    
    public void setfoto(String pfoto)
    {
    	foto = pfoto;
    }
    
}