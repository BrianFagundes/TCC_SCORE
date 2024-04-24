package com.api.usuario;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailSender {

    private static final String SMTP_HOST = "smtp-mail.outlook.com";
    private static final int SMTP_PORT = 587;
    private static final String USERNAME = "tccscore@outlook.com";
    private static final String PASSWORD = "Tcc@Score#";   


    private UsuarioController usuarioController;
    
    public EmailSender(UsuarioController usuarioController) {
        this.usuarioController = usuarioController;
    }

    public int sendEmail(String to, String subject, String body) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", SMTP_PORT);

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(USERNAME));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

        
        if(usuarioController.NaoExisteEmail(to))
        {
        	return 1;        
        }
        if(subject.equals("Recuperação de senha")) {
        	body += usuarioController.RetornoSenha(to);
        }        
        
        message.setSubject(subject);
        message.setText(body);

        Transport.send(message);
        return 0;
    }
    
    public int sendEmail2(String to, String subject, String body) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", SMTP_PORT);

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(USERNAME));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));       
              
        
        message.setSubject(subject);
        message.setText(body);

        Transport.send(message);
        return 0;
    }
}
