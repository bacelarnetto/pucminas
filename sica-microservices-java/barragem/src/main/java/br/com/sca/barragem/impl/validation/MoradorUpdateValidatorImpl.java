package br.com.sca.barragem.impl.validation;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import br.com.sca.barragem.dto.MoradorDTO;
import br.com.sca.barragem.model.Morador;
import br.com.sca.barragem.repository.MoradorRepository;
import br.com.sca.barragem.validation.MoradorUpdateValidation;
import br.com.sca.commons.lib.message.FieldMessage;

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