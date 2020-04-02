package br.com.sca.auth.email.impl.service;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;

import br.com.sca.auth.email.service.EmailService;
import br.com.sca.auth.model.Usuario;

public abstract class AbstractEmailServiceImpl implements EmailService {
	
	@Value("${default.sender}")
	private String sender;
	

	@Override
	public void sendNewPasswordEmail(Usuario user, String newPass) {
		SimpleMailMessage sm = prepareNewPasswordEmail(user, newPass);
		sendEmail(sm);
	}
	
	protected SimpleMailMessage prepareNewPasswordEmail(Usuario user, String newPass) {
		SimpleMailMessage sm = new SimpleMailMessage();
		sm.setTo(user.getEmail());
		sm.setFrom(sender);
		sm.setSubject("Solicitação de nova senha");
		sm.setSentDate(new Date(System.currentTimeMillis()));
		sm.setText("Nova senha: " + newPass);
		return sm;
	}
	
}