package br.com.sca.monitoramento.impl.validation;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.sca.commons.lib.message.FieldMessage;
import br.com.sca.monitoramento.dto.MoradorNewDTO;
import br.com.sca.monitoramento.model.Morador;
import br.com.sca.monitoramento.repository.MoradorRepository;
import br.com.sca.monitoramento.validation.MoradorInsertValidation;



public class MoradorInsertValidatorImpl implements ConstraintValidator<MoradorInsertValidation, MoradorNewDTO> {

	@Autowired
	private MoradorRepository repo;
	
	@Override
	public void initialize(MoradorInsertValidation ann) {
	}

	@Override
	public boolean isValid(MoradorNewDTO objDto, ConstraintValidatorContext context) {
		
		List<FieldMessage> list = new ArrayList<>();

		Morador aux = repo.findByEmail(objDto.getEmail());
		if (aux != null) {
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