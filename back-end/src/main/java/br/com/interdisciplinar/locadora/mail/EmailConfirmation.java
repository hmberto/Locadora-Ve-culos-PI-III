package br.com.interdisciplinar.locadora.mail;

import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import br.com.interdisciplinar.locadora.database.LoginUserFromDB;

public class EmailConfirmation {
	public static String NAME = LoginUserFromDB.class.getSimpleName();
	private static Logger LOG = Logger.getLogger(LoginUserFromDB.class.getName());
	
	public void confirmation(String destinatário, String messageSubject, String messageSend) {
		LOG.entering(NAME, "confirmation");
		
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");
		
		Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("locadoradeveiculosbh@gmail.com", "locadorabh");
			}
		});

		/** Ativa Debug para sessão */
		session.setDebug(true);

		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("locadoradeveiculosbh@gmail.com"));

			Address[] toUser = InternetAddress.parse(destinatário);
			
			message.setRecipients(Message.RecipientType.TO, toUser);
			message.setSubject(messageSubject);
			message.setContent(messageSend, "text/html");

			/** Método para enviar a mensagem criada */
			Transport.send(message);
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
		LOG.exiting(NAME, "confirmation");
	}
}