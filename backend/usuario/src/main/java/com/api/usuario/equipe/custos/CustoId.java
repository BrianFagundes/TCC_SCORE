package com.api.usuario.equipe.custos;

import java.io.Serializable;
import java.util.Objects;

public class CustoId implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long evento;
    private Long usuario;

    public CustoId() {
        // Construtor padrão
    }

    // Construtores adicionais podem ser definidos aqui, se necessário

    // Getters e setters para `evento` e `usuario`
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

    // Implementação de equals e hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CustoId)) return false;
        CustoId custoId = (CustoId) o;
        return Objects.equals(getEvento(), custoId.getEvento()) &&
               Objects.equals(getUsuario(), custoId.getUsuario());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEvento(), getUsuario());
    }
}
