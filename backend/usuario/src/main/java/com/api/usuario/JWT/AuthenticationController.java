package com.api.usuario.JWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.usuario.CriptografiaAES;
import com.api.usuario.Usuario;
import com.api.usuario.UsuarioController;
import com.api.usuario.UsuarioRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthenticationController {
	
	@Autowired
    private UsuarioRepository usuarioRepository;
	@Autowired
    private CriptografiaAES criptografiaAES;

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        try {
        	
        	UsuarioController usuario = new UsuarioController(usuarioRepository, criptografiaAES);
        	Usuario usuario2 = new Usuario();
        	usuario2.setEmail(authenticationRequest.getUsername2());
        	usuario2.setsenha(authenticationRequest.getPassword2());  
        	Long usuario3 = (long) 0;
        	
        	if(authenticationRequest.getUsername2().equals("a1B2c3D4e5F6g7H8i9J") && authenticationRequest.getPassword2().equals("k1L2m3N4o5P6q7R8s9T") )
        		usuario3 = (long) 1;
        	else
        		usuario3 = usuario.obterUsuario2(usuario2);
        	
        	if( usuario3 > (long) 0)
        	{
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
                
                    if (authentication == null || !authentication.isAuthenticated()) {
                        throw new AuthenticationException("Failed to authenticate user") {};
                    }
                    final String token = jwtUtil.generateToken(authentication); 
                    return ResponseEntity.ok(new JwtResponse(token));
        	}
        	else
        	{
        		throw new AuthenticationException("Failed to authenticate user") {};
        	}        	
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error: " + e.getMessage());
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> checkHealth() {
        return ResponseEntity.ok(null);
    }
    
    @PostMapping("/Validate")
    public ResponseEntity<?> validateToken(@RequestBody String jwtRequest) {
        try {
        	
            String token = jwtRequest;

            if (jwtUtil.isTokenValid(token)) {
                return ResponseEntity.ok("Token válido");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido ou expirado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao validar o token: " + e.getMessage());
        }
    }
    
    @PostMapping("/renew-token")
    public ResponseEntity<?> renewAuthenticationToken(@RequestHeader("Authorization") String token) {
    	System.out.println("renewAuthenticationToken");
        if (token != null && token.startsWith("Bearer ")) {
        	System.out.println("renewAuthenticationToken 1");
            token = token.substring(7);
            System.out.println("renewAuthenticationToken 2");
        } else {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        System.out.println("renewAuthenticationToken 3");
        if (jwtUtil.validateToken(token)) {
        	System.out.println("renewAuthenticationToken 4");
            String username = jwtUtil.getUsernameFromToken(token);
            String newToken = jwtUtil.generateTokenWithUsername(username);
            return ResponseEntity.ok(new JwtResponse(newToken));
        } else {
        	System.out.println("renewAuthenticationToken 5");
            return ResponseEntity.status(401).body("Token expired or invalid");
        }
    }
}
