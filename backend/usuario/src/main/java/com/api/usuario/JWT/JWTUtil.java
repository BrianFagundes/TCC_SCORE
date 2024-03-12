package com.api.usuario.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JWTUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(Authentication authentication) {
    	if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalArgumentException("Authentication object is null or not authenticated");
        }

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    
    public String extractUsername(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    
    public boolean isTokenValid(String token) {
        try {
        	Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

            // Verifica se o token está expirado
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            // Token inválido
            return false;
        }
    }
    
    // Método para validar o token, extrair o usuário, etc.
}
