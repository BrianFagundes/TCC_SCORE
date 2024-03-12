package com.api.usuario.JWT;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



@CrossOrigin(origins = "http://localhost:4200")
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JWTUtil jwtUtil;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
    	super();
        this.jwtUtil = jwtUtil;
        setFilterProcessesUrl("/usuarios/**");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
    	String token = extractTokenFromHeader(request);
        

        if (token == null) {
            return null;
        }

        String username = jwtUtil.extractUsername(token);
        

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            return new UsernamePasswordAuthenticationToken(username, "f9e29a8");
        }

        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
    	SecurityContextHolder.getContext().setAuthentication(authResult);
    	chain.doFilter(request, response);        
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
    	String header = request.getHeader("Authorization");
    	if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7); // Remove "Bearer " to extract only the token
        }
        return null;
    }
    
    
}
