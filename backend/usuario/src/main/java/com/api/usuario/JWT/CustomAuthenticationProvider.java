package com.api.usuario.JWT;


import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.io.DecodingException;


@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    
    private final String expectedUser = "f6546317";
    private final String expectedPassword = "f9e29a8";

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        
      

        try {
            if (expectedUser.equals(username) && expectedPassword.equals(password)) {
                
                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                
                return new UsernamePasswordAuthenticationToken(username, password, authorities);
            } else {
                throw new BadCredentialsException("External system authentication failed");
            }
        } catch (DecodingException e) {
            // Lidar com a exceção de DecodingException
            throw new BadCredentialsException("Erro de decodificação do token JWT", e);
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
    	return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
