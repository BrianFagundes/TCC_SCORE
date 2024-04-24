package com.api.usuario.equipe.evento.Nota;

import java.io.Serializable;
import javax.persistence.Embeddable;

@Embeddable
public class NotaId implements Serializable {
    
	private String dataHoraEvento;
    private Long idEvento;
    private Long idUsuarioOrigem;
    private Long idUsuarioDestino;

    // Construtor padrão necessário para JPA
    public NotaId() {
    }

    // Construtor com parâmetros para facilitar a criação de instâncias
    public NotaId(String dataHoraEvento, Long idEvento, Long idUsuario) {
        this.dataHoraEvento = dataHoraEvento;
        this.idEvento = idEvento;
        this.idUsuarioOrigem = idUsuarioOrigem;
        this.idUsuarioDestino = idUsuarioDestino;
    }

    // Getters e Setters
    public String getDataHoraEvento() {
        return dataHoraEvento;
    }

    public void setDataHoraEvento(String dataHoraEvento) {
        this.dataHoraEvento = dataHoraEvento;
    }

    public Long getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Long idEvento) {
        this.idEvento = idEvento;
    }

    public Long getidUsuarioOrigem() {
        return idUsuarioOrigem;
    }

    public void setidUsuarioOrigem(Long idUsuarioOrigem) {
        this.idUsuarioOrigem = idUsuarioOrigem;
    }
    
    public Long getidUsuarioDestino() {
        return idUsuarioDestino;
    }

    public void setidUsuarioDestino(Long idUsuarioDestino) {
        this.idUsuarioDestino = idUsuarioDestino;
    }

    // hashCode e equals devem ser implementados para garantir a unicidade da chave
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NotaId notaId = (NotaId) o;

        if (!dataHoraEvento.equals(notaId.dataHoraEvento)) return false;
        if (!idEvento.equals(notaId.idEvento)) return false;
        if (!idUsuarioDestino.equals(notaId.idUsuarioDestino)) return false;
        return idUsuarioOrigem.equals(notaId.idUsuarioOrigem);
    }

    @Override
    public int hashCode() {
        int result = dataHoraEvento.hashCode();
        result = 31 * result + idEvento.hashCode();
        result = 31 * result + idUsuarioOrigem.hashCode();
        result = 31 * result + idUsuarioDestino.hashCode();
        return result;
    }
}

