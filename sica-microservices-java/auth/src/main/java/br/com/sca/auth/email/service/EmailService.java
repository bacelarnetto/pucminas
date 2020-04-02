package br.com.sca.auth.email.service;

import org.springframework.mail.SimpleMailMessage;

import br.com.sca.auth.model.Usuario;

public interface EmailService {
	
	void sendEmail(SimpleMailMessage msg);
	
	void sendNewPasswordEmail(Usuario user, String newPass);
}