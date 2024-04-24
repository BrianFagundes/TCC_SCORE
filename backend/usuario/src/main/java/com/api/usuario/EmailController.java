package com.api.usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.mail.MessagingException;


@RestController
@RequestMapping("/Email")
@CrossOrigin(origins = "*")
public class EmailController {
	@Autowired
    private UsuarioController usuarioController;
	
	@PostMapping("/enviar-email")
    public int enviarEmail(@RequestBody EmailRequest emailRequest) {
        try {
        	
            EmailSender emailSender = new EmailSender(usuarioController);            
            return emailSender.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
        } catch (MessagingException e) {
            return 2;
        }
    }
	
	@PostMapping("/enviar-email2")
    public int enviarEmail23(@RequestBody EmailRequest emailRequest) {
        try {
        	
            EmailSender emailSender = new EmailSender(usuarioController);            
            return emailSender.sendEmail2(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
        } catch (MessagingException e) {
            return 2;
        }
    }
	
	public int enviarEmail2(String to, String sub, String Body) {
        try {        	
            EmailSender emailSender = new EmailSender(usuarioController);            
            return emailSender.sendEmail(to, sub, Body);
        } catch (MessagingException e) {
            return 2;
        }
    }
}
