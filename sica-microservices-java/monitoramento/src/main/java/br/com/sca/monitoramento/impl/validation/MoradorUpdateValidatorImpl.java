package br.com.sca.monitoramento.impl.validation;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import br.com.sca.commons.lib.message.FieldMessage;
import br.com.sca.monitoramento.dto.MoradorDTO;
import br.com.sca.monitoramento.model.Morador;
import br.com.sca.monitoramento.repository.MoradorRepository;
import br.com.sca.monitoramento.validation.MoradorUpdateValidation;

public class MoradorUpdateValidatorImpl implements ConstraintValidator<MoradorUpdateValidation, MoradorDTO> {

	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private MoradorRepository repo;
	
	@Override
	public void initialize(MoradorUpdateValidation ann) {
	}

	@Override
	public boolean isValid(MoradorDTO objTO, ConstraintValidatorContext context) {
		
		@SuppressWarnings("unchecked")
		Map<String, String> map = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Integer uriId = Integer.parseInt(map.get("id"));
		
		List<FieldMessage> list = new ArrayList<>();
		
		Morador aux = repo.findByEmail(objTO.getEmail());
		if (aux != null && !aux.getId().equals(uriId)) {
			list.add(new FieldMessage("email", "Email já existente"));
		}

		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}