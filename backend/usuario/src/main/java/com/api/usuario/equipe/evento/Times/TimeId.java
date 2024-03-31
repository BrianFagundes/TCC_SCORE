package com.api.usuario.equipe.evento.Times;

import java.io.Serializable;
import java.util.Objects;

public class TimeId implements Serializable {
    private Long evento;
    private Integer numerotime;
    private Long usuario;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TimeId timeId = (TimeId) o;
        return Objects.equals(evento, timeId.evento) &&
               Objects.equals(numerotime, timeId.numerotime) &&
               Objects.equals(usuario, timeId.usuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(evento, numerotime, usuario);
    }
}
